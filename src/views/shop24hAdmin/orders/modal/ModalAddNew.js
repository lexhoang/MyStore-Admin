import {
    Grid,
    Alert,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Snackbar,
    Typography,
    MenuItem,
} from "@mui/material";

import { CFormInput, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';


import { useState, useEffect } from 'react';



function ModalAddNew({ openModalAdd, setOpenModalAdd, handleClose, fetchAPI, setVarRefeshPage, varRefeshPage }) {

    const [fullName, setFullName] = useState("");
    const [phone, setphone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");


    const [shippedDate, setShippedDate] = useState("");
    const [note, setNote] = useState("");
    const [orderDetail, setOrderDetail] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [cost, setCost] = useState(0);

    //Select Type
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchAPI('https://my-store-node-js.vercel.app/products')
            .then((data) => {
                setProducts(data.data)
                console.log(data.data)
            })
            .catch((error) => {
                console.error(error.message)
            })

    }, [])


    //Alert
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModal, setStatusModal] = useState("error");
    const [noidungAlertValid, setNoidungAlertValid] = useState("");


    //Thêm sản phẩm
    const addNewProduct = () => {
        let newOrder = {
            product: "",
            quantity: 1,
            price: 0
        }
        setOrderDetail([...orderDetail, newOrder])
        setQuantity(quantity + 1)
    }


    //BTN ADD NEW
    const onBtnInsertClick = () => {
        if (valiDate()) {
            const body = {
                method: 'POST',
                body: JSON.stringify({
                    fullName: fullName,
                    phone: phone,
                    email: email,
                    address: address,
                    city: city,
                    country: country,
                    shippedDate: shippedDate,
                    note: note,
                    orderDetail: orderDetail,
                    cost: cost,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            fetchAPI("https://my-store-node-js.vercel.app/customers/phone/", body)
                .then((data) => {
                    setOpenAlert(true);
                    setStatusModal("success")
                    setNoidungAlertValid("Dữ liệu thêm thành công!")
                    setOpenModalAdd(false)
                    setVarRefeshPage(varRefeshPage + 1);
                    console.log(data);
                    // window.location.reload();
                })
                .catch((error) => {
                    setOpenAlert(true);
                    setStatusModal("error")
                    setNoidungAlertValid("Dữ liệu thêm thất bại!");
                    console.log(error.message);
                })
        }

    }

    //Validate
    const valiDate = () => {
        if (fullName == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa nhập tên khách hàng")
            return false
        }
        if (phone === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa nhập số điện thoại")
            return false
        }

        const vREG = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!vREG.test(String(email))) {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Email khách hàng không hợp lệ")
            return false
        }

        if (address === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa nhập địa chỉ")
            return false
        }
        if (city === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa nhập thành phố")
            return false
        }
        if (country === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa nhập quốc gia")
            return false
        }

        if (shippedDate === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có ngày nhận hàng")
            return false
        }
        if (true) {
            let a = true
            orderDetail.map((e, i) => {
                if (e.id === "") {
                    setOpenAlert(true);
                    setStatusModal("error")
                    setNoidungAlertValid("Chưa sản phẩm")
                    a = false
                }
                if (e.count < 1) {
                    setOpenAlert(true);
                    setStatusModal("error")
                    setNoidungAlertValid("Số lượng không hợp lệ")
                    a = false
                }
            })
            return a
        }
        return true;
    }


    //Đóng Alert
    const handelCloseAlert = () => {
        setOpenAlert(false);
    }

    //Đóng Modal
    const onBtnCancelClick = () => {
        handleClose()
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    function sumTotal(arr) {
        const sum = arr.reduce((index, object) => {
            return index + object.price;
        }, 0);
        return sum
    }

    function getPrice(paramId) {
        var a = [{
            promotionPrice: 0
        }];
        if (paramId) {
            a = products.filter((product, index) => {
                return product._id === paramId
            })
        }
        return a[0].promotionPrice
    }

    useEffect(() => {
        setCost(sumTotal(orderDetail))
    }, [orderDetail])


    return (
        <>
            <CModal
                visible={openModalAdd}
                onClose={handleClose}
                backdrop="static" size='lg'
            >
                <CModalHeader onClose={handleClose}>
                    <Grid container align="center">
                        <Grid item xs={12}>
                            <Typography id="modal-modal-title" variant="h4" align="center" style={{ color: "#00695c" }}>
                                <strong>Thêm Sản Phẩm</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </CModalHeader>

                <CModalBody>
                    <Grid container style={{ marginTop: "50px" }}>
                        {/* CUSTOMER  */}
                        <Grid item xs={6} p={2}>
                            {/* Full Name */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Tên:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth placeholder="Full Name"
                                                value={fullName} onChange={(event) => setFullName(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Phone */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Số điện thoại:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth placeholder="Phone" className="bg-white"
                                                value={phone} size="small" onChange={(event) => setphone(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Email */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Email:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth value={email} Placeholder="Email" className="bg-white"
                                                size="small" onChange={(event) => setEmail(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Address */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Địa chỉ:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth value={address} Placeholder="Address" className="bg-white"
                                                size="small" onChange={(event) => setAddress(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* City */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Thành phố:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth value={city} Placeholder="City" className="bg-white"
                                                size="small" onChange={(event) => setCity(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Country */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Quốc Gia:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth value={country} Placeholder="Country" className="bg-white"
                                                size="small" onChange={(event) => setCountry(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* ORDER */}
                        <Grid item xs={6} p={2}>
                            <Grid container align="center">
                                <Grid item xs={12} mb={2}>
                                    <Button variant="contained" onClick={addNewProduct} color="success">Chọn sản phẩm</Button>
                                </Grid>
                            </Grid>
                            {
                                Array.from(Array(quantity), (e, i) => {
                                    return (
                                        <>
                                            <Grid container mt={2}>
                                                <Grid item sm={12}>
                                                    <Grid container>
                                                        <Grid item sm={4}>
                                                            <label>Sản phẩm:</label>
                                                        </Grid>
                                                        <Grid item sm={8}>
                                                            <FormControl fullWidth size="small">
                                                                <InputLabel id="demo-simple-select-label">Chọn Sản Phẩm</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    value={orderDetail[i].product}
                                                                    label="Product"
                                                                    onChange={(event) => {
                                                                        orderDetail[i].product = event.target.value
                                                                        orderDetail[i].price = getPrice(orderDetail[i].product) * parseInt(orderDetail[i].quantity)
                                                                        setOrderDetail([...orderDetail])
                                                                    }}>
                                                                    <MenuItem value={"NOT"}>Chọn Sản Phẩm</MenuItem>
                                                                    {products.map((type, index) => {
                                                                        return (
                                                                            <MenuItem key={index} value={type._id}>{type.name}</MenuItem>
                                                                        )
                                                                    })}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid container mt={2} mb={5}>
                                                <Grid item sm={12}>
                                                    <Grid container>
                                                        <Grid item xs={4}>Số lượng</Grid>
                                                        <Grid item xs={2}>
                                                            <CFormInput type="number" value={orderDetail[i].quantity}
                                                                className="bg-white" size="small"
                                                                onChange={(event) => {
                                                                    orderDetail[i].quantity = event.target.value;
                                                                    orderDetail[i].price = getPrice(orderDetail[i].product) * parseInt(orderDetail[i].quantity)
                                                                    setOrderDetail([...orderDetail])
                                                                    console.log(orderDetail)
                                                                }} />
                                                        </Grid>

                                                        <Grid item xs={1}></Grid>

                                                        <Grid item xs={5} mt={1}>
                                                            <TextField disabled variant="standard" value={"$" + (numberWithCommas(orderDetail[i].price))}
                                                                className="bg-white" size="small"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <hr></hr>
                                        </>
                                    )
                                })
                            }
                            {/* Shipped Date */}
                            <Grid container mt={4}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Ngày ship:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput type="date" fullWidth value={shippedDate} className="bg-white"
                                                size="small" onChange={(event) => setShippedDate(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Note */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Ghi chú:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput fullWidth value={note} Placeholder="Note" className="bg-white"
                                                size="small" onChange={(event) => setNote(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Tổng tiền */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <label>Tổng tiền:</label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <CFormInput readOnly fullWidth value={numberWithCommas(cost) + " VNĐ"} Placeholder="cost" className="bg-white"
                                                size="small" onChange={(event) => setCost(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </CModalBody>

                <CModalFooter>
                    <Grid container className="mt-4 text-center">
                        <Grid item sm={12}>
                            <Grid container className="mt-4">
                                <Grid item sm={6}>
                                    <Button onClick={onBtnInsertClick} className="bg-success w-75 text-white">Tạo đơn hàng</Button>
                                </Grid>
                                <Grid item sm={6}>
                                    <Button onClick={onBtnCancelClick} className="bg-secondary w-75 text-white">Hủy Bỏ</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CModalFooter>
            </CModal >

            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handelCloseAlert}>
                <Alert onClose={handelCloseAlert} severity={statusModal} sx={{ width: '100%' }}>
                    {noidungAlertValid}
                </Alert>
            </Snackbar>
        </>
    )
}
export default ModalAddNew;
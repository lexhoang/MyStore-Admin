import {
    Grid,
    Alert,
    Button,
    TextField,
    FormControl,
    Select,
    Snackbar,
    Typography,
    MenuItem,
} from "@mui/material";

import { CFormInput, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

import { useState, useEffect } from 'react';

function ModalEdit({ openModalEdit, handleCloseEdit, orderDetailEdit, idEdit, shippedDateEdit, fetchAPI, setVarRefeshPage, varRefeshPage, rowClicked }) {
    const [shippedDate, setShippedDate] = useState("");
    const [note, setNote] = useState("");

    const [quantity, setQuantity] = useState(0);
    const [cost, setCost] = useState(0);

    //Alert
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModal, setStatusModal] = useState("error");
    const [noidungAlertValid, setNoidungAlertValid] = useState("");

    const [orderDetail, setOrderDetail] = useState([]);

    //Select Type
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchAPI('https://my-store-nodejs-999.herokuapp.com/products')
            .then((data) => {
                setProducts(data.data)
                console.log(data.data)
            })
            .catch((error) => {
                console.error(error.message)
            })

    }, [])

    const onBtnUpdateClick = () => {
        console.log("Update được click!")
        var vCheckData = valiDate()
        if (vCheckData) {
            const body = {
                method: 'PUT',
                body: JSON.stringify({
                    shippedDate: shippedDate,
                    orderDetail: orderDetail,
                    note: note,
                    cost: cost
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            fetchAPI('https://my-store-nodejs-999.herokuapp.com/orders/' + idEdit, body)
                .then((data) => {
                    console.log(data);
                    setOpenAlert(true);
                    setNoidungAlertValid("Sửa thông tin đơn hàng thành công!")
                    setStatusModal("success")
                    setVarRefeshPage(varRefeshPage + 1)
                    handleCloseEdit()
                })
                .catch((error) => {
                    console.log(error);
                    setOpenAlert(true);
                    setNoidungAlertValid("Sửa thông tin đơn hàng thất bại!")
                    setStatusModal("error")
                    handleCloseEdit()
                })
        }
    }

    const valiDate = () => {
        if (shippedDate === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có ngày nhận hàng")
            return false
        }
        return true;
    }

    //Đóng Alert
    const handelCloseAlert = () => {
        setOpenAlert(false);
    }
    //Đóng Modal
    const onBtnCancelClick = () => {
        handleCloseEdit()
    }


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

    const getEditOrderDetail = () => {
        const editOrders = orderDetailEdit;
        let orderDetails = [];
        editOrders.forEach(order => {
            let orderId = order.product;
            let orderQuantity = order.quantity;
            let orderPrice = order.price;
            orderDetails = [...orderDetails,
            {
                product: orderId,
                quantity: orderQuantity,
                price: orderPrice
            }
            ]
        });
        return orderDetails;
    }


    function sumTotal(arr) {
        const sum = arr.reduce((index, object) => {
            return index + object.price;
        }, 0);
        return sum
    }

    const onBtnDeleteClick = (index) => {
        orderDetail.splice(index, 1);
        setQuantity(quantity - 1);
        setOrderDetail([...orderDetail]);
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
        setOrderDetail(getEditOrderDetail());
        setQuantity(orderDetailEdit.length);
        setShippedDate(shippedDateEdit);
        setNote(rowClicked.note);
        setCost(rowClicked.cost)
    }, [openModalEdit])

    useEffect(() => {
        setCost(sumTotal(orderDetail))
    }, [orderDetail])

    return (
        <>
            <CModal
                visible={openModalEdit}
                onClose={handleCloseEdit}
                backdrop="static" size='lg'
            >
                <CModalHeader onClose={handleCloseEdit}>
                    <Grid container align="center">
                        <Grid item xs={12}>
                            <Typography variant="h4" style={{ color: "#00695c" }}>
                                <strong>Sửa danh sách đơn hàng</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </CModalHeader>

                <CModalBody>
                    <Grid container style={{ marginTop: "30px" }}>
                        <Grid item xs={5} p={1}>
                            {/* ID */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={3}>
                                            <Typography variant="h6"><b>ID</b></Typography>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <Typography variant="h6" sx={{ color: "red" }}><b>{idEdit}</b></Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Shipped Date */}
                            <Grid container mt={4}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={3}>
                                            <label>Ngày Ship:</label>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <CFormInput fullWidth className="bg-white"
                                                size="small" value={shippedDate} onChange={(event) => setShippedDate(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Note */}
                            <Grid container mt={4}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={3}>
                                            <label>Ghi chú:</label>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <CFormInput fullWidth value={note} className="bg-white"
                                                size="small" onChange={(event) => setNote(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Tổng tiền */}
                            <Grid container mt={4}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <label>Tổng tiền:</label>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <CFormInput readOnly fullWidth value={"$" + cost} Placeholder="cost" className="bg-white"
                                                size="small" onChange={(event) => setCost(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={1}></Grid>

                        {/* ORDER */}
                        <Grid item xs={6} p={2} >
                            {
                                Array.from(Array(quantity), (e, i) => {
                                    return (
                                        <>
                                            <Grid container mb={5}>
                                                <Grid item xs={10}>
                                                    <Grid container mt={3}>
                                                        <Grid item sm={12}>
                                                            <Grid container>
                                                                <Grid item sm={4}>
                                                                    <label>Sản phẩm:</label>
                                                                </Grid>
                                                                <Grid item sm={8}>
                                                                    <FormControl fullWidth size="small">
                                                                        <Select
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

                                                    <Grid container mt={3}>
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

                                                                <Grid item xs={4} mt={1}>
                                                                    <TextField readOnly variant="standard" value={"$" + (orderDetail[i].price)}
                                                                        className="bg-white" size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={1} ml={3}>
                                                    <button className="bg-danger">
                                                        <CIcon icon={cilTrash} onClick={() => onBtnDeleteClick(i)} />
                                                    </button>
                                                </Grid>
                                            </Grid>
                                            <hr></hr>
                                        </>
                                    )
                                })
                            }

                            <Grid container align="center">
                                <Grid item xs={12} mb={1}>
                                    <Button variant="contained" onClick={addNewProduct} color="success">Thêm sản phẩm</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </CModalBody>

                <CModalFooter>
                    <Grid container className="text-center">
                        <Grid item sm={12}>
                            <Grid container className="mt-4">
                                <Grid item sm={6}>
                                    <Button onClick={onBtnUpdateClick} className="bg-success w-75 text-white">Sửa đơn hàng</Button>
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

export default ModalEdit;
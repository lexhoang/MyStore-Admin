import {
    Grid,
    Alert,
    Button,
    FormControl,
    InputLabel,
    Select,
    Snackbar,
    Typography,
    MenuItem
} from "@mui/material";

import { CFormInput, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

import { useState, useEffect } from 'react';

function ModalAddNew({ openModalAdd, setOpenModalAdd, handleClose, fetchAPI, setVarRefeshPage, varRefeshPage }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("NOT");
    const [imageUrl, setImageUrl] = useState("");
    const [buyPrice, setBuyPrice] = useState("");
    const [promotionPrice, setPromotionPrice] = useState("");
    const [amount, setAmount] = useState("");

    //Alert
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModal, setStatusModal] = useState("error");
    const [noidungAlertValid, setNoidungAlertValid] = useState("");

    //Select Type
    const [productTypes, setProductTypes] = useState([])

    useEffect(() => {
        fetchAPI('https://my-store-nodejs-999.herokuapp.com/producttypes')
            .then((data) => {
                setProductTypes(data.data)
                console.log(data.data)
            })
            .catch((error) => {
                console.error(error.message)
            })
    }, [])


    //BTN ADD NEW
    const onBtnInsertClick = () => {
        if (valiDate()) {
            const body = {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    description: description,
                    type: type,
                    imageUrl: imageUrl,
                    buyPrice: buyPrice,
                    promotionPrice: promotionPrice,
                    amount: amount
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            fetchAPI('https://my-store-nodejs-999.herokuapp.com/products', body)
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
        if (name == "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa đặt tên cho sản phẩm")
            return false
        }
        if (description === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có mô tả cho sản phẩm")
            return false
        }
        if (type === "NOT") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa chọn loại sản phẩm")
            return false
        }
        if (imageUrl.indexOf(".") === -1) {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("ImageUrl không hợp lệ")
            return false
        }
        if (buyPrice === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có giá sản phẩm")
            return false
        }
        if (promotionPrice === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có giá mới sản phẩm")
            return false
        }
        if (amount === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có số lượng sản phẩm")
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
        handleClose()
    }

    return (
        <>
            <CModal
                visible={openModalAdd}
                onClose={handleClose}
                backdrop="static" size='md'
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
                        {/* Name */}
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Tên:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput fullWidth placeholder="Name" className="bg-white"
                                            size="small" value={name} onChange={(event) => setName(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Description */}
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Mô tả:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput fullWidth value={description} placeholder="Description" className="bg-white"
                                            size="small" onChange={(event) => setDescription(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Type */}
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Loại:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-simple-select-label">Chọn Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={type}
                                                label="Age"
                                                onChange={(event) => setType(event.target.value)}
                                            >
                                                <MenuItem value={"NOT"}>Type</MenuItem>
                                                {productTypes.map((type, index) => {
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
                        {/* ImageUrl */}
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Ảnh:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput fullWidth value={imageUrl} Placeholder="ImageUrl" className="bg-white"
                                            size="small" onChange={(event) => setImageUrl(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* BuyPrice */}
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Giá cũ:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput type="number" fullWidth value={buyPrice} Placeholder="BuyPrice" className="bg-white"
                                            size="small" onChange={(event) => setBuyPrice(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* PromotionPrice */}
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Giá mới:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput type="number" fullWidth value={promotionPrice} Placeholder="PromotionPrice" className="bg-white"
                                            size="small" onChange={(event) => setPromotionPrice(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Amount */}
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Số lượng:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput type="number" fullWidth value={amount} Placeholder="Amount" className="bg-white"
                                            size="small" onChange={(event) => setAmount(event.target.value)} />
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
                                    <Button onClick={onBtnInsertClick} className="bg-success w-75 text-white">Tạo sản phẩm</Button>
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
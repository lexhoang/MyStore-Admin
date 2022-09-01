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

function ModalEdit({ openModalEdit, typeEdit, handleCloseEdit, idEdit, fetchAPI, setVarRefeshPage, varRefeshPage, rowClicked }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
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


    const onBtnUpdateClick = () => {
        console.log("Update được click!")
        var vCheckData = valiDate()
        if (vCheckData) {
            const body = {
                method: 'PUT',
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

            fetchAPI('https://my-store-nodejs-999.herokuapp.com/products/' + idEdit, body)
                .then((data) => {
                    console.log(data);
                    setOpenAlert(true);
                    setNoidungAlertValid("Sửa thông tin sản phẩm thành công!")
                    setStatusModal("success")
                    setVarRefeshPage(varRefeshPage + 1)
                    handleCloseEdit()
                })
                .catch((error) => {
                    console.log(error);
                    setOpenAlert(true);
                    setNoidungAlertValid("Sửa thông tin sản phẩm thất bại!")
                    setStatusModal("error")
                    handleCloseEdit()
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
        handleCloseEdit()
    }

    useEffect(() => {
        setName(rowClicked.name)
        setDescription(rowClicked.description)
        setType(typeEdit)
        setImageUrl(rowClicked.imageUrl)
        setBuyPrice(rowClicked.buyPrice)
        setPromotionPrice(rowClicked.promotionPrice)
        setAmount(rowClicked.amount)
    }, [openModalEdit])

    return (
        <>
            <CModal
                visible={openModalEdit}
                onClose={handleCloseEdit}
                backdrop="static" size='md'
            >
                <CModalHeader onClose={handleCloseEdit}>
                    <Grid container align="center">
                        <Grid item xs={12}>
                            <Typography id="modal-modal-title" variant="h4" align="center" style={{ color: "#00695c" }}>
                                <strong>Sửa Loại Sản Phẩm</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </CModalHeader>

                <CModalBody>
                    <Grid container style={{ marginTop: "30px" }}>
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
                                                label="Product"
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
                                        <CFormInput fullWidth value={buyPrice} Placeholder="BuyPrice" className="bg-white"
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
                                    <Button onClick={onBtnUpdateClick} className="bg-success w-75 text-white">Sửa sản phẩm</Button>
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
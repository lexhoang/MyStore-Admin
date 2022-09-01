import {
    Grid,
    Alert,
    Button,
    Snackbar,
    Typography,
} from "@mui/material";

import { CFormInput, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

import { useState, useEffect } from 'react';

function ModalEdit({ openModalEdit, handleCloseEdit, idEdit, fetchAPI, setVarRefeshPage, varRefeshPage, rowClicked }) {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    //Alert
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModal, setStatusModal] = useState("error");
    const [noidungAlertValid, setNoidungAlertValid] = useState("");


    const onBtnUpdateClick = () => {
        console.log("Update được click!")
        var vCheckData = valiDate()
        if (vCheckData) {
            const body = {
                method: 'PUT',
                body: JSON.stringify({
                    fullName: fullName,
                    phone: phone,
                    email: email,
                    address: address,
                    city: city,
                    country: country
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }

            fetchAPI('https://my-store-nodejs-999.herokuapp.com/customers/' + idEdit, body)
                .then((data) => {
                    console.log(data);
                    setOpenAlert(true);
                    setNoidungAlertValid("Sửa thông tin khách hàng thành công!")
                    setStatusModal("success")
                    setVarRefeshPage(varRefeshPage + 1)
                    handleCloseEdit()
                })
                .catch((error) => {
                    console.log(error);
                    setOpenAlert(true);
                    setNoidungAlertValid("Sửa thông tin khách hàng thất bại!")
                    setStatusModal("error")
                    handleCloseEdit()
                })
        }
    }

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
        setFullName(rowClicked.fullName)
        setPhone(rowClicked.phone)
        setEmail(rowClicked.email)
        setAddress(rowClicked.address)
        setCity(rowClicked.city)
        setCountry(rowClicked.country)
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
                                <strong>Sửa khách hàng</strong>
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
                        {/* FullName */}
                        <Grid container mt={3}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Tên:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput fullWidth Placeholder="Full Name" className="bg-white"
                                            size="small" value={fullName} onChange={(event) => setFullName(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Phone */}
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Số điện thoại:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput type="number" fullWidth value={phone} Placeholder="phone" className="bg-white"
                                            size="small" onChange={(event) => setPhone(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Email */}
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Email:</label>
                                    </Grid>
                                    <Grid item sm={9}>
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
                                    <Grid item sm={3}>
                                        <label>Địa chỉ:</label>
                                    </Grid>
                                    <Grid item sm={9}>
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
                                    <Grid item sm={3}>
                                        <label>Thành phố:</label>
                                    </Grid>
                                    <Grid item sm={9}>
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
                                    <Grid item sm={3}>
                                        <label>Quốc gia:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput fullWidth value={country} Placeholder="Country" className="bg-white"
                                            size="small" onChange={(event) => setCountry(event.target.value)} />
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
                                    <Button onClick={onBtnUpdateClick} className="bg-success w-75 text-white">Sửa khách hàng</Button>
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
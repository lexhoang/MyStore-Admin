import {
    Grid,
    Alert,
    Button,
    Snackbar,
    Typography,
} from "@mui/material";

import { CFormInput, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

import { useState } from 'react';

function ModalAddNew({ openModalAdd, setOpenModalAdd, handleClose, fetchAPI, setVarRefeshPage, varRefeshPage }) {

    const [fullName, setFullName] = useState("");
    const [phone, setphone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    //Alert
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModal, setStatusModal] = useState("error");
    const [noidungAlertValid, setNoidungAlertValid] = useState("");


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
                    country: country
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            fetchAPI('https://my-store-node-js.vercel.app/customers/', body)
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
                            <Typography variant="h4" align="center" style={{ color: "#00695c" }}>
                                <strong>Thêm Khách Hàng</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </CModalHeader>

                <CModalBody>
                    <Grid container style={{ marginTop: "50px" }}>
                        {/* FullName */}
                        <Grid container mt={2}>
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
                                            size="small" onChange={(event) => setphone(event.target.value)} />
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
                                    <Button onClick={onBtnInsertClick} className="bg-success w-75 text-white">Tạo khách hàng</Button>
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
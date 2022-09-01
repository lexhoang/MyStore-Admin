import {
    Grid,
    Alert,
    Button,
    Snackbar,
    Typography,
} from "@mui/material";

import { CFormInput, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

import { useState, useEffect } from 'react';

function ModalAddNew({ openModalAdd, setOpenModalAdd, handleClose, fetchAPI, setVarRefeshPage, varRefeshPage }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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
                    name: name,
                    description: description,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            fetchAPI('https://my-store-nodejs-999.herokuapp.com/producttypes', body)
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
            setNoidungAlertValid("Chưa đặt tên cho loại sản phẩm")
            return false
        }
        if (description === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có mô tả loại sản phẩm")
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
                                <strong>Thêm Loại Sản Phẩm</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </CModalHeader>

                <CModalBody>
                    <Grid container style={{ marginTop: "50px" }}>
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Tên:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput fullWidth Placeholder="Name" className="bg-white"
                                            size="small" value={name} onChange={(event) => setName(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Mô tả:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput fullWidth value={description} Placeholder="Description" className="bg-white"
                                            size="small" onChange={(event) => setDescription(event.target.value)} />
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
                                    <Button onClick={onBtnInsertClick} className="bg-success w-75 text-white">Tạo loại sản phẩm</Button>
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
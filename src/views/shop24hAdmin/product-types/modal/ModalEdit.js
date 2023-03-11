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
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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
                    name: name,
                    description: description,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }

            fetchAPI('https://my-store-node-js.vercel.app/producttypes/' + idEdit, body)
                .then((data) => {
                    console.log(data);
                    setOpenAlert(true);
                    setNoidungAlertValid("Sửa thông tin loại sản phẩm thành công!")
                    setStatusModal("success")
                    setVarRefeshPage(varRefeshPage + 1)
                    handleCloseEdit()
                })
                .catch((error) => {
                    console.log(error);
                    setOpenAlert(true);
                    setNoidungAlertValid("Sửa thông tin loại sản phẩm thất bại!")
                    setStatusModal("error")
                    handleCloseEdit()
                })
        }
    }

    const valiDate = () => {
        if (name === "") {
            setOpenAlert(true);
            setNoidungAlertValid("Name chưa được điền!")
            setStatusModal("error")
            return false
        }
        if (description === "") {
            setOpenAlert(true);
            setNoidungAlertValid("Description chưa được điền!")
            setStatusModal("error")
            return false
        }
        return true
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
                        <Grid container mt={3}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Tên:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput fullWidth className="bg-white"
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
                                        <CFormInput fullWidth value={description} className="bg-white"
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
                                    <Button onClick={onBtnUpdateClick} className="bg-success w-75 text-white">Sửa loại sản phẩm</Button>
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
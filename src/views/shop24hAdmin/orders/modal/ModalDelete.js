import { Alert, Button, Snackbar, Typography, Grid } from "@mui/material"
import { CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

import { useState } from "react";

function ModalDelete({ openModalDelete, idDelete, idCustomer, handleCloseDelete, setVarRefeshPage, varRefeshPage }) {
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModalDelete, setStatusModalEdit] = useState("error")
    const [noidungAlert, setNoidungAlert] = useState("")



    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const onBtnCancelClick = () => {
        handleCloseDelete()
    }

    const onBtnConfirmDeleteClick = () => {
        console.log("%cXác nhận xóa được click!", "color:red");

        fetch("https://my-store-node-js.vercel.app/customers/" + idCustomer + "/orders/" + idDelete, { method: 'DELETE' })
            .then((data) => {
                console.log('Delete successful');
                setOpenAlert(true)
                setStatusModalEdit("success")
                setNoidungAlert("Xóa Order" + idDelete + " thành công!")
                setVarRefeshPage(varRefeshPage + 1)
                handleCloseDelete()
            })
            .catch(error => {
                console.error('There was an error!', error);
                setOpenAlert(true)
                setStatusModalEdit("error")
                setNoidungAlert("Xóa Order" + { idDelete } + " thất bại!")
                handleCloseDelete()
            });
    }

    console.log(idCustomer)
    return (
        <>
            <CModal
                visible={openModalDelete}
                onClose={handleCloseDelete}
                backdrop="static" size='lg'
            >
                <CModalHeader onClose={handleCloseDelete}>
                    <Grid container align="center">
                        <Grid item xs={12}>
                            <Typography id="modal-modal-title" variant="h4" align="center" style={{ color: "#00695c" }}>
                                <strong>Xóa đơn hàng</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </CModalHeader>

                <CModalBody>
                    <Grid container className="mt-2">
                        <Grid item xs={12} align="center">
                            <Typography mb={2} variant="h5">
                                Bạn có thật sự muốn xóa Đơn hàng có ID:
                                <Typography mb={2} variant="h5" style={{ color: "red", marginTop: "20px" }}>
                                    {idDelete} ?
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </CModalBody>

                <CModalFooter>
                    <Grid container className="mt-4 text-center">
                        <Grid item sm="12">
                            <Grid container className="mt-4">
                                <Grid item sm="6">
                                    <Button onClick={onBtnConfirmDeleteClick} className="bg-danger w-100 text-white">Xác nhận</Button>
                                </Grid>
                                <Grid item sm="6">
                                    <Button onClick={onBtnCancelClick} className="bg-secondary w-75 text-white">Hủy Bỏ</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CModalFooter>

            </CModal>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={statusModalDelete} sx={{ width: '100%' }}>
                    {noidungAlert}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalDelete
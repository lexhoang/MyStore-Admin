import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CTable, CTableHead, CTableHeaderCell, CTableRow, CTableBody, CTableDataCell } from '@coreui/react';
import { useEffect } from 'react';
import React from 'react';

function ModalDetail({ openModalDetail, handleCloseDetail, rowDetail }) {

    useEffect(() => {

    }, [openModalDetail])

    return (
        <>
            <CModal visible={openModalDetail} onClose={handleCloseDetail} backdrop="static">
                <CModalHeader onClose={handleCloseDetail}>
                    <CModalTitle style={{ color: "blue" }}>Số điện thoại của khách hàng: {rowDetail ? rowDetail.phone : null} </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col" style={{ color: "red" }}>ID đơn hàng: </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {
                                rowDetail ?
                                    rowDetail.orders.map((order, index) => {
                                        return (
                                            <CTableRow key={index}>
                                                <CTableDataCell>{order}</CTableDataCell>
                                            </CTableRow>
                                        )
                                    }) : null
                            }
                        </CTableBody>
                    </CTable>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseDetail}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )

}
export default ModalDetail;
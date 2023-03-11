import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import { Grid, TextField, Pagination, InputLabel, Select, MenuItem, Button, ButtonGroup } from '@mui/material'

import ModalDetail from "./modal/ModalDetail"
import ModalAddNew from "./modal/ModalAddNew"
import ModalEdit from "./modal/ModalEdit"
import ModalDelete from "./modal/ModalDelete"


const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [customerPhone, setCustomerPhone] = useState("")
  const [orders, setOrders] = useState([]);

  //PANIGATION
  //Limit: số lượng bản ghi trên 1 trang
  const [limit, setLimit] = useState(10);
  //số trang: tổng số lượng sản phẩm / limit - Số lớn hơn gần nhất
  const [noPage, setNoPage] = useState(0);
  //Trang hiện tại
  const [page, setPage] = useState(1);
  //Load trang
  const [varRefeshPage, setVarRefeshPage] = useState(0);

  //PANIGATION
  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
  };
  const onChangePagination = (event, value) => {
    setPage(value);
  }

  //MODAL
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  //Đóng Modal
  const handleCloseDetail = () => setOpenModalDetail(false);
  const handleClose = () => setOpenModalAdd(false);
  const handleCloseEdit = () => setOpenModalEdit(false);
  const handleCloseDelete = () => setOpenModalDelete(false);

  const [rowDetail, setRowDetail] = useState()

  //Modal Order Detail
  const onBtnDetailOrderClick = (detail) => {
    setRowDetail(detail);
    setOpenModalDetail(true)
  }

  //Modal Add New
  const onBtnAddOrderClick = () => {
    console.log("Nút thêm được click")
    setOpenModalAdd(true)
  }

  //Modal Edit
  const [rowClicked, setRowClicked] = useState([]);
  const [idEdit, setIdEdit] = useState("");

  const onBtnEditClick = (row) => {
    console.log("Nút sửa được click")
    console.log("ID: " + row._id)
    setOpenModalEdit(true)
    setRowClicked(row)
    setIdEdit(row._id)
  }

  //Modal Delete
  //ID
  const [idDelete, setIdDelete] = useState("");
  const [nameDelete, setNameDelete] = useState("");

  const onBtnDeleteClick = (row) => {
    console.log("Nút xóa được click")
    console.log("ID: " + row._id)
    setOpenModalDelete(true)
    setIdDelete(row._id)
    setNameDelete(row.fullName)
  }


  //LOAD  API
  const fetchAPI = async (url, body) => {
    const response = await fetch(url, body)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    if (customerPhone == "") {
      fetchAPI('https://my-store-node-js.vercel.app/customers')
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setCustomers(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.log(error.message)
        })
    } else {
      fetchAPI(`https://my-store-node-js.vercel.app/customers?phone=${customerPhone}`)
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setCustomers(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.error(error.message)
        });
    }
  }, [customerPhone, page, limit, varRefeshPage])

  useEffect(() => {
    fetchAPI('https://my-store-node-js.vercel.app/orders')
      .then((data) => {
        setOrders(data.data)
        console.log(data)
      })
      .catch((error) => {
        console.error(error.message)
      });
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customers</strong> <small>(Khách hàng)</small>
          </CCardHeader>
          <CCardBody>
            <h3 className="text-medium-emphasis" align="center">
              Danh sách khách hàng
            </h3>

            <Grid container sx={{ minWidth: 100 }} justifyContent="flex-end">
              <Grid item marginY={"auto"} mr={1}>
                <InputLabel>Show</InputLabel>
              </Grid>
              <Grid item>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={limit}
                  size="small"
                  onChange={handleChangeLimit}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </Grid>
              <Grid item marginY={"auto"} ml={1}>
                <InputLabel>customers</InputLabel>
              </Grid>
            </Grid>

            <Grid container mt={5} mb={1}>
              <Grid item xs={3}>
                <Button variant="contained" color="success" onClick={onBtnAddOrderClick}>Add new</Button>
              </Grid>
              <Grid item xs={9} align="right">
                <Grid item xs={9} align="right">
                  <TextField
                    size="small"
                    label="Search Phone"
                    variant="outlined"
                    onChange={(event) => { setCustomerPhone(event.target.value) }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <CTable striped hover>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fullname</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">City</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Detail</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {customers.map((customer, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{customer._id}</CTableDataCell>
                      <CTableDataCell>{customer.fullName}</CTableDataCell>
                      <CTableDataCell>{customer.phone}</CTableDataCell>
                      <CTableDataCell>{customer.email}</CTableDataCell>
                      <CTableDataCell>{customer.address}</CTableDataCell>
                      <CTableDataCell>{customer.city}</CTableDataCell>
                      <CTableDataCell>{customer.country}</CTableDataCell>
                      <CTableDataCell>
                        <Button variant="contained" size="small" color="success" className="text-white" value={index} onClick={() => { onBtnDetailOrderClick(customer) }}>Chi tiết</Button>
                      </CTableDataCell>
                      <CTableDataCell>
                        <ButtonGroup variant="contained">
                          <Button color="info" className="text-white" value={index} onClick={() => { onBtnEditClick(customer) }}>EDIT</Button>
                          <Button className="bg-danger" value={index * index} onClick={() => { onBtnDeleteClick(customer) }}>delete</Button>
                        </ButtonGroup>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>

            <Grid container mt={3} mb={2} justifyContent="flex-end">
              <Grid item >
                <Pagination count={noPage} color="primary" defaultPage={1} onChange={onChangePagination} />
              </Grid>
            </Grid>
          </CCardBody>

          <ModalDetail rowDetail={rowDetail} openModalDetail={openModalDetail} handleCloseDetail={handleCloseDetail} />

          <ModalAddNew varRefeshPage={varRefeshPage} setOpenModalAdd={setOpenModalAdd} openModalAdd={openModalAdd} handleClose={handleClose} fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} />

          <ModalEdit idEdit={idEdit} varRefeshPage={varRefeshPage} openModalEdit={openModalEdit} handleCloseEdit={handleCloseEdit}
            fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} rowClicked={rowClicked}
          />

          <ModalDelete varRefeshPage={varRefeshPage} setVarRefeshPage={setVarRefeshPage} openModalDelete={openModalDelete} idDelete={idDelete} nameDelete={nameDelete} handleCloseDelete={handleCloseDelete} />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Customers

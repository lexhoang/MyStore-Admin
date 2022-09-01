import React, { useState, useEffect } from 'react'

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
} from '@coreui/react'
import { Grid, TextField, Pagination, InputLabel, Select, MenuItem, Button, ButtonGroup } from '@mui/material'


import ModalAddNew from "./modal/ModalAddNew"
import ModalEdit from "./modal/ModalEdit"
import ModalDelete from "./modal/ModalDelete"

const ProductTypes = () => {
  const [productTypes, setProductTypes] = useState([])
  const [typeName, setTypeName] = useState("");


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
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  //Đóng Modal
  const handleClose = () => setOpenModalAdd(false);
  const handleCloseEdit = () => setOpenModalEdit(false);
  const handleCloseDelete = () => setOpenModalDelete(false);


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
    setNameDelete(row.name)
  }


  //LOAD  API
  const fetchAPI = async (url, body) => {
    const response = await fetch(url, body)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    if (typeName == "") {
      fetchAPI('https://my-store-nodejs-999.herokuapp.com/producttypes')
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setProductTypes(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.error(error.message)
        });
    } else {
      fetchAPI(`https://my-store-nodejs-999.herokuapp.com/producttypes?name=${typeName}`)
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setProductTypes(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
  }, [typeName, page, limit, varRefeshPage])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Product Types</strong> <small>(Các loại sản phẩm được của shop)</small>
          </CCardHeader>
          <CCardBody>
            <h3 className="text-medium-emphasis" align="center">
              Danh sách loại sản phẩm
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
                <InputLabel>products</InputLabel>
              </Grid>
            </Grid>

            <Grid container mt={5} mb={1}>
              <Grid item xs={3}>
                <Button variant="contained" color="success" onClick={onBtnAddOrderClick}>Add new</Button>
              </Grid>
              <Grid item xs={9} align="right">
                <TextField onChange={(event) => setTypeName(event.target.value)}
                  size="small" label="Search Name" variant="outlined" />
              </Grid>
            </Grid>

            <CTable striped hover>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {productTypes.map((productTypes, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{productTypes._id}</CTableDataCell>
                      <CTableDataCell>{productTypes.name}</CTableDataCell>
                      <CTableDataCell>{productTypes.description}</CTableDataCell>
                      <CTableDataCell>
                        <ButtonGroup variant="contained">
                          <Button color="info" className="text-white" value={index} onClick={() => { onBtnEditClick(productTypes) }}>EDIT</Button>
                          <Button className="bg-danger" value={index * index} onClick={() => { onBtnDeleteClick(productTypes) }}>delete</Button>
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
          <ModalAddNew varRefeshPage={varRefeshPage} setOpenModalAdd={setOpenModalAdd} openModalAdd={openModalAdd}
            handleClose={handleClose} fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} />

          <ModalEdit idEdit={idEdit} varRefeshPage={varRefeshPage} openModalEdit={openModalEdit} handleCloseEdit={handleCloseEdit}
            fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} rowClicked={rowClicked}
          />

          <ModalDelete varRefeshPage={varRefeshPage} setVarRefeshPage={setVarRefeshPage} openModalDelete={openModalDelete} idDelete={idDelete} nameDelete={nameDelete} handleCloseDelete={handleCloseDelete} />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProductTypes

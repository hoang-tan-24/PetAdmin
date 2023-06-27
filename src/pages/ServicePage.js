import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// @mui
import {
  InputAdornment,
  Grid,
  TextField,
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import useServiceListByShopId from '../components/getAPI/getServiceListByShopId';
import { createService } from '../components/postAPI/createService';
import { updateService } from '../components/putAPI/updateService';
import { updateServiceStatus } from '../components/putAPI/updateServiceStatus';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Dịch vụ', alignRight: false },
  { id: 'categoryId', label: 'Phân loại', alignRight: false },
  { id: 'maxSlot', label: 'Số slot', alignRight: false },
  { id: 'duration', label: 'Thời lượng', alignRight: false },
  { id: 'price', label: 'Giá (VND)', alignRight: false },
  { id: 'petTypeId', label: 'Loại thú cưng', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openPopup, setOpenPopup] = useState(false);

  const [editPopup, setEditPopup] = useState(false);

  // create
  const [serviceName, setServiceName] = useState('');
  const [categoryId, setCategory] = useState(0);
  const [servicePrice, setServicePrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [serviceDescription, setServiceDescription] = useState('');
  const [petTypeId, setPetTypeId] = useState(5);
  const [serviceShopId, setServiceShopId] = useState(-1);
  const [maxSlot, setMaxSlot] = useState(0);
  const [serviceImage, setServiceImage] = useState('');
  const [status, setStatus] = useState(0);
  // edit
  const [editedId, setEditedId] = useState(1);
  const [editedName, setEditedName] = useState('name');
  const [editedCategoryId, setEditedCategory] = useState(0);
  const [editedPrice, setEditedPrice] = useState(0);
  const [editedDuration, setEditedDuration] = useState(0);
  const [editedDescription, setEditedDescription] = useState('description');
  const [editedPetTypeId, setEditedPetTypeId] = useState(0);
  const [editedSlot, setEditedSlot] = useState(0);
  const [editedImage, setEditedImage] = useState('image');
  const [updatedStatus, setUpdatedStatus] = useState(0);
  const [editedStatus, setEditedStatus] = useState(0);

  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);

  const employee = JSON.parse(localStorage.getItem('employee'));
  if (employee && employee.shopId !== serviceShopId) {
    console.log("employee co shop id la : ", employee.shopId)
    setServiceShopId(employee.shopId)
  }


  const [openReturn, setOpenReturn] = useState(false);
  const [serviceListGetByShopId, setServiceListGetByShopId] = useState([]);
  const [isFailFromAPI, setIsFailFromAPI] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://petuni-api.azurewebsites.net/api/Service?shopId=${serviceShopId}`);
        const data = response.data;
        setServiceListGetByShopId(data);
        setOpenReturn(true)
        console.log('get ok from ', response.config.url);
        console.log("data : ", data)
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response.status !== 200) {
          setIsFailFromAPI(true)
          setOpenReturn(true)
        }
      }
    };
    if (serviceShopId !== -1)
      fetchData();
  }, [serviceShopId]);

  const handleCreateService = async (event) => {
    // event.preventDefault();

    const serviceData = {
      Name: serviceName,
      CategoryId: categoryId,
      Description: serviceDescription,
      Price: servicePrice,
      Duration: duration,
      PetTypeId: petTypeId,
      ShopId: serviceShopId,
      MaxSlot: maxSlot,
      Image: serviceImage,
      Status: status
    };

    const res = createService(serviceData);
    console.log(res)
    setTimeout(() => {
      window.location.reload(); // Reload the page after 1 second
    }, 2000);
  };

  const handleServiceNameChange = (event) => {
    setServiceName(event.target.value);
  };


  const handleServiceDescriptionChange = (event) => {
    setServiceDescription(event.target.value);
  };

  const handleServicePriceChange = (event) => {
    setServicePrice(event.target.value);
  };

  const handlePetTypeIdChange = (event) => {
    setPetTypeId(event.target.value);
  };

  const handleServiceImageChange = (event) => {
    setServiceImage(event.target.value);
  };

  const handleEditPopup = () => {
    setEditPopup(true);

  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleOpenMenu = (event, id, image, maxSlot, categoryId, name, description, petTypeId, price, duration, status) => {
    setOpen(event.currentTarget);
    setEditedName(name);
    setEditedCategory(categoryId);
    setEditedSlot(maxSlot);
    setEditedPrice(price);
    setEditedPetTypeId(petTypeId);
    setEditedStatus(status);
    setEditedId(id)
    setEditedDescription(description)
    setEditedImage(image)
    setEditedDuration(duration)

    if (status !== 2)
      setOpenUpdateStatus(true)

    if (status === 0) {
      setUpdatedStatus(1);
    } else if (status === 1) {
      setUpdatedStatus(0);
    } else {
      setUpdatedStatus(status);
    }
  };

  const handleUpdateStatus = () => {
    updateServiceStatus(editedId, updatedStatus)
    setTimeout(() => {
      window.location.reload(); // Reload the page after 1 second
    }, 2000);
  }
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = serviceListGetByShopId.map((n) => n.id);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleSlotChange = (event) => {
    const value = event.target;
    setMaxSlot(value);
  };

  const handleIncreaseSlot = () => {
    setMaxSlot(maxSlot + 1);
  };

  const handleDecreaseSlot = () => {
    if (maxSlot > 1) {
      setMaxSlot(maxSlot - 1);
    }
  };

  const handleDurationChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!Number.isNaN(value)) {
      setDuration(value);
    }
  };

  const handleIncreaseDuration = () => {
    setDuration((prevDuration) => prevDuration + 1);
  };
  const handleDecreaseDuration = () => {
    if (duration > 0) {
      setDuration((prevDuration) => prevDuration - 1);
    }
  };

  // edit
  const handleEditService = () => {
    const serviceData = {
      Name: editedName,
      CategoryId: editedCategoryId,
      Description: editedDescription,
      Price: editedPrice,
      Duration: editedDuration,
      PetTypeId: editedPetTypeId,
      ShopId: serviceShopId,
      MaxSlot: editedSlot,
      Image: editedImage,
      Status: editedStatus
    };

    const res = updateService(editedId, serviceData);
    console.log(res)
    setTimeout(() => {
      window.location.reload(); // Reload the page after 1 second
    }, 2000);
  }

  console.log(window.onload)
  const handleEditIncreaseSlot = () => {
    setEditedSlot(editedSlot + 1);
  };

  const handleEditDecreaseSlot = () => {
    if (editedSlot > 1) {
      setEditedSlot(editedSlot - 1);
    }
  };

  const handleEditIncreaseDuration = () => {
    setEditedDuration(editedDuration + 1);
  };

  const handleEditDecreaseDuration = () => {
    if (editedDuration > 1) {
      setEditedDuration(editedDuration - 1);
    }
  };
  const handleEditCategoryChange = (event) => {
    setEditedCategory(event.target.value);
  };

  const handleEditStatusChange = (event) => {
    setEditedStatus(event.target.value);
  };

  const handleEditProductNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEditProductDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleEditProductPriceChange = (event) => {
    setEditedPrice(event.target.value);
  };

  const handleEditPetTypeIdChange = (event) => {
    setEditedPetTypeId(event.target.value);
  };

  const handleEditProductImageChange = (event) => {
    setEditedImage(event.target.value);
  };

  const handleEditSlotChange = (event) => {
    const value = event.target;
    setEditedSlot(value);
  };

  const handleEditDurationChange = (event) => {
    const value = event.target;
    setEditedDuration(value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - serviceListGetByShopId.length) : 0;

  const filteredUsers = applySortFilter(serviceListGetByShopId, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  if (!openReturn) {
    // Render loading or placeholder content while waiting for the data
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
          fontSize: '24px',
        }}
      >
        <div>Đang tải...</div>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Service</title>
      </Helmet>
      <ToastContainer />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Dịch vụ
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenPopup}>
            Thêm Dịch vụ
          </Button>
          <Popover
            open={openPopup}
            anchorEl={openPopup}
            onClose={() => setOpenPopup(false)}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Paper sx={{ p: 2, minWidth: 300, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Thêm dịch vụ
              </Typography>
              <TextField label="Tên dịch vụ"
                value={serviceName}
                onChange={handleServiceNameChange}
                fullWidth sx={{ mb: 2 }} />
              <TextField label="Link Hình Ảnh"
                value={serviceImage}
                onChange={handleServiceImageChange}
                fullWidth sx={{ mb: 2 }} />
              <TextField
                label="Phân loại dịch vụ"
                select
                fullWidth
                sx={{ mb: 2 }}
                value={petTypeId}
                onChange={handlePetTypeIdChange}>
                <MenuItem value="1">Chó</MenuItem>
                <MenuItem value="2">Mèo</MenuItem>
                <MenuItem value="3">Chim</MenuItem>
                <MenuItem value="4">Cá</MenuItem>
                <MenuItem value="5">Không phân loại</MenuItem>
              </TextField>
              <TextField
                label="Phân loại Danh mục"
                select
                fullWidth
                sx={{ mb: 2 }}
                value={categoryId}
                onChange={handleCategoryChange}>
                <MenuItem value="1">Chăm sóc và vệ sinh</MenuItem>
                <MenuItem value="2">Y tế và thú y</MenuItem>
                <MenuItem value="3">Nuôi dưỡng</MenuItem>
              </TextField>
              <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                  <IconButton onClick={handleDecreaseSlot}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <TextField
                    label="Slot"
                    type="number"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={maxSlot}
                    onChange={handleSlotChange}
                    InputProps={{
                      inputProps: {
                        min: 1, // Giá trị nhỏ nhất là 1
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={handleIncreaseSlot}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                  <IconButton onClick={handleDecreaseDuration}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <TextField
                    label="Thời lượng"
                    type="number"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={duration}
                    onChange={handleDurationChange}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={handleIncreaseDuration}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <TextField
                label="Giá"
                fullWidth
                sx={{ mb: 2 }}
                value={servicePrice}
                onChange={handleServicePriceChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                }}
              />
              <TextField label="Mô tả"
                value={serviceDescription}
                onChange={handleServiceDescriptionChange}
                fullWidth sx={{ mb: 2 }} />
              <TextField
                label="Trạng thái"
                select
                fullWidth
                sx={{ mb: 2 }}
                value={status}
                onChange={handleStatusChange}>
                <MenuItem value="0">Tạm ngừng</MenuItem>
                <MenuItem value="1">Đang bán</MenuItem>
              </TextField>

              <Button variant="contained" onClick={() => {
                handleCreateService();
                setOpenPopup(false);
              }}>
                Thêm sản phẩm
              </Button>
              <IconButton
                sx={{ position: 'absolute', top: 5, right: 5 }}
                onClick={() => setOpenPopup(null)}
              >
                <CloseIcon />
              </IconButton>
            </Paper>
          </Popover>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={serviceListGetByShopId.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                {(serviceListGetByShopId.length === 0 || isFailFromAPI === true) && (
                    <TableRow>
                      <TableCell colSpan={8} style={{ height: '30vh', fontSize: '24px', color: 'red' }}>
                        <div style={{ textAlign: 'center' }}>Không tìm thấy.. Vui lòng thử lại sau!</div>
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, image, name, categoryId, duration, price, maxSlot, petTypeId, status, description } = row;
                    const selectedService = selected.indexOf(id) !== -1;
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedService}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedService} onChange={(event) => handleClick(event, id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={image} src={image} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          {categoryId === 1 && <Label color="success">Chăm sóc và vệ sinh</Label>}
                          {categoryId === 2 && <Label color="error">Y tế và thú y</Label>}
                          {categoryId === 3 && <Label color="warning">Nuôi dưỡng</Label>}
                          {categoryId === 4 && <Label color="default">Dịch vụ</Label>}
                        </TableCell>
                        <TableCell align="left">{maxSlot}</TableCell>
                        <TableCell align="left">{duration}</TableCell>
                        <TableCell align="left">{price}</TableCell>
                        <TableCell align="left">
                          {petTypeId === 1 && <Label color="success">Chó </Label>}
                          {petTypeId === 2 && <Label color="error">Mèo </Label>}
                          {petTypeId === 3 && <Label color="warning">Chim </Label>}
                          {petTypeId === 4 && <Label color="info">Cá </Label>}
                          {petTypeId === 5 && <Label color="default">Thú cưng </Label>}
                        </TableCell>

                        <TableCell align="left">
                          {status === 0 && <Label color="error">Tạm ngừng </Label>}
                          {status === 1 && <Label color="success">Đang bán</Label>}
                          {status === 2 && <Label color="error">Ẩn </Label>}
                        </TableCell>



                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id, image, maxSlot, categoryId, name, description, petTypeId, price, duration, status)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Không tìm thấy
                          </Typography>

                          <Typography variant="body2">
                            Không có kết quả cho từ khoá &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Kiểm tra lại cú pháp hoặc thử tìm bằng từ khác.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={serviceListGetByShopId.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số dịch vụ theo trang :"
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleEditPopup}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>


        {editedStatus === 1 && openUpdateStatus !== false && (
          <MenuItem sx={{ color: 'error.main' }} onClick={handleUpdateStatus}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
            Xóa
          </MenuItem>
        )}

        {editedStatus === 0 && openUpdateStatus !== false && (
          <MenuItem sx={{ color: 'success.main' }} onClick={handleUpdateStatus}>
            <Iconify icon={'eva:checkmark-circle-outline'} sx={{ mr: 2 }} />
            Mở lại
          </MenuItem>
        )}

      </Popover>

      <Popover
        open={editPopup}
        anchorEl={editPopup}
        onClose={() => setEditPopup(false)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Paper sx={{ p: 2, minWidth: 300, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Sửa sản phẩm
          </Typography>
          <TextField label="Tên sản phẩm"
            value={editedName}
            onChange={handleEditProductNameChange}
            fullWidth sx={{ mb: 2 }} />
          <TextField label="Link Hình Ảnh"
            value={editedImage}
            onChange={handleEditProductImageChange}
            fullWidth sx={{ mb: 2 }} />
          <TextField
            label="Phân loại Thú cưng"
            select
            fullWidth
            sx={{ mb: 2 }}
            value={editedPetTypeId}
            onChange={handleEditPetTypeIdChange}>
            <MenuItem value="1">Chó</MenuItem>
            <MenuItem value="2">Mèo</MenuItem>
            <MenuItem value="3">Chim</MenuItem>
            <MenuItem value="4">Cá</MenuItem>
            <MenuItem value="5">Không phân loại</MenuItem>
          </TextField>
          <TextField
            label="Phân loại Danh mục"
            select
            fullWidth
            sx={{ mb: 2 }}
            value={editedCategoryId}
            onChange={handleEditCategoryChange}>
            <MenuItem value="1">Chăm sóc và vệ sinh</MenuItem>
            <MenuItem value="2">Y tế và thú y</MenuItem>
            <MenuItem value="3">Nuôi dưỡng</MenuItem>
          </TextField>
          <Grid container alignItems="center" justifyContent="center" spacing={2}>
            <Grid item>
              <IconButton onClick={handleEditDecreaseSlot}>
                <RemoveIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <TextField
                label="Số slot"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                value={editedSlot}
                onChange={handleEditSlotChange}
                InputProps={{
                  inputProps: {
                    min: 1, // Giá trị nhỏ nhất là 1
                  },
                }}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={handleEditIncreaseSlot}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="center" spacing={2}>
            <Grid item>
              <IconButton onClick={handleEditDecreaseDuration}>
                <RemoveIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <TextField
                label="Thời lượng"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                value={editedDuration}
                onChange={handleEditDurationChange}
                InputProps={{
                  inputProps: {
                    min: 1, // Giá trị nhỏ nhất là 1
                  },
                }}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={handleEditIncreaseDuration}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          <TextField
            label="Giá"
            fullWidth
            sx={{ mb: 2 }}
            value={editedPrice}
            onChange={handleEditProductPriceChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
            }}
          />
          <TextField label="Mô tả"
            value={editedDescription}
            onChange={handleEditProductDescriptionChange}
            fullWidth sx={{ mb: 2 }} />

          <Button variant="contained" onClick={() => {
            handleEditService();
            setEditPopup(false);
          }}>
            Sửa dịch vụ
          </Button>
          <IconButton
            sx={{ position: 'absolute', top: 5, right: 5 }}
            onClick={() => setEditPopup(null)}
          >
            <CloseIcon />
          </IconButton>

        </Paper>
      </Popover>

    </>
  );
}

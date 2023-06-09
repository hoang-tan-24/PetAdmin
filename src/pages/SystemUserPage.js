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
// mock
import USERLIST from '../_mock/user';
import useUserListAdmin from '../components/getAPI/getUserListAdmin';
import useServiceListByShopId from '../components/getAPI/getServiceListByShopId';
import { createService } from '../components/postAPI/createService';
import { updateService } from '../components/putAPI/updateService';
import { updateUserStatus } from '../components/putAPI/updateUserStatus';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Số điện thoại', alignRight: false },
  { id: 'address', label: 'Địa chỉ', alignRight: false },
  { id: 'googleId', label: 'Google Id', alignRight: false },
  { id: 'balance', label: 'Số dư (VND)', alignRight: false },
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
    return filter(array, (_user) => _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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
  const [serviceShopId, setServiceShopId] = useState(1);
  const [maxSlot, setMaxSlot] = useState(0);
  const [serviceImage, setServiceImage] = useState('');
  const [status, setStatus] = useState(0);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState('');
  const [googleId, setGoogleId] = useState(0);
  // edit
  const [editedId, setEditedId] = useState(1);
  const [editedName, setEditedName] = useState('name');
  const [editedCategoryId, setEditedCategory] = useState(0);
  const [editedBalance, setEditedBalance] = useState(0);
  const [editedDuration, setEditedDuration] = useState(0);
  const [editedDescription, setEditedDescription] = useState('description');
  const [editedPetTypeId, setEditedPetTypeId] = useState(0);
  const [editedSlot, setEditedSlot] = useState(0);
  const [editedImage, setEditedImage] = useState('image');
  const [updatedStatus, setUpdatedStatus] = useState(0);
  const [editedStatus, setEditedStatus] = useState(0);
  const [editedEmail, setEditedEmail] = useState('email');
  const [editedAddress, setEditedAddress] = useState('address');
  const [editedPhone, setEditedPhone] = useState(0);
  const [editedGoogleId, setEditedGoogleId] = useState(0);

  const [openReturn, setOpenReturn] = useState(false);
  const [userListAdmin, setUserListAdmin] = useState([]);
  const [isFailFromAPI, setIsFailFromAPI] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://petuni-api.azurewebsites.net/api/User`);
        const data = response.data;
        setUserListAdmin(data);
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
    window.location.reload(); // Refresh the page
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

  const handleOpenMenu = (event, id, email, phone, address, googleId, balance, status) => {
    setOpen(event.currentTarget);
    setEditedAddress(address);
    setEditedEmail(email);
    setEditedPhone(phone);
    setEditedBalance(balance);
    setEditedStatus(status);
    setEditedId(id);
    setEditedGoogleId(googleId);

    if (status === 0) {
      setUpdatedStatus(1);
    } else
      setUpdatedStatus(0);
  };

  const handleUpdateStatus = () => {
    updateUserStatus(editedId, updatedStatus)
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
      const newSelecteds = userListAdmin.map((n) => n.id);
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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    const value = event.target;
    setDuration(value);
  };

  const handleIncreaseDuration = () => {
    setDuration(duration + 1);
  };

  const handleDecreaseDuration = () => {
    if (duration > 1) {
      setDuration(duration - 1);
    }
  };
  // edit
  const handleEditService = () => {
    const serviceData = {
      Name: editedName,
      CategoryId: editedCategoryId,
      Description: editedDescription,
      Duration: editedDuration,
      PetTypeId: editedPetTypeId,
      ShopId: serviceShopId,
      MaxSlot: editedSlot,
      Image: editedImage,
      Status: editedStatus
    };

    const res = updateService(editedId, serviceData);
    console.log(res)

    window.location.reload(); // Refresh the page
  }

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userListAdmin.length) : 0;

  const filteredUsers = applySortFilter(userListAdmin, getComparator(order, orderBy), filterName);

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
        <title>User</title>
      </Helmet>
      <ToastContainer />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Người dùng
          </Typography>


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
                  rowCount={userListAdmin.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                {(userListAdmin.length === 0 || isFailFromAPI === true) && (
                    <TableRow>
                      <TableCell colSpan={8} style={{ height: '30vh', fontSize: '24px', color: 'red' }}>
                        <div style={{ textAlign: 'center' }}>Không tìm thấy.. Vui lòng thử lại sau!</div>
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, email, phone, address, googleId, balance, status } = row;
                    const selectedService = selected.indexOf(id) !== -1;
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedService}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedService} onChange={(event) => handleClick(event, id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {email}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{phone}</TableCell>
                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="left">{googleId}</TableCell>
                        <TableCell align="left">{balance}</TableCell>

                        <TableCell align="left">
                          {status === 0 && <Label color="error"> Đang khóa  </Label>}
                          {status === 1 && <Label color="success">Đang hoạt động</Label>}
                        </TableCell>



                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id, email, phone, address, googleId, balance, status)}>
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
            count={userListAdmin.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số người dùng theo trang :"
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
            width: 230,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >

        {editedStatus === 1 && (
          <MenuItem sx={{ color: 'error.main' }} onClick={handleUpdateStatus}>
            <Iconify icon={'eva:slash-outline'} sx={{ mr: 2 }} />
            Khóa tài khoản
          </MenuItem>
        )}

        {editedStatus === 0 && (
          <MenuItem sx={{ color: 'success.main' }} onClick={handleUpdateStatus}>
            <Iconify icon={'eva:checkmark-circle-2-outline'} sx={{ mr: 2 }} />
            Mở khóa tài khoản
          </MenuItem>
        )}

      </Popover>



    </>
  );
}

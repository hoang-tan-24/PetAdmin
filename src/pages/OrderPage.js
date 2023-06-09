import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
  TableHead
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

// mock
import ORDERLIST from '../_mock/user';
import useOrderListByShopId from '../components/getAPI/getOrderListByShopId';
import useUserById from '../components/getAPI/getUserById';
import OrderDetailsTable from './orderDetailsTable';
import { updateOrderStatus } from '../components/putAPI/updateOrderStatus';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id ', label: 'Id', alignRight: false },
  { id: 'totalPrice', label: 'Tổng tiền (VNĐ)', alignRight: false },
  { id: 'address', label: 'Địa chỉ', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'orderedDate', label: 'Ngày đặt hàng', alignRight: false },
  { id: 'status', label: 'Trạng Thái', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------
// sắp xếp theo thứ tự
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
// so sánh
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
// sort
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('nameOrders');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [userData, setUserData] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);
  // order
  const [id, setId] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [userId, setUserId] = useState(0);
  const [email, setEmail] = useState('');
  const [orderedDate, setOrderedDate] = useState(0);
  const [status, setStatus] = useState(1);
  const [shopId, setShopId] = useState(-1);
  // orderdetail

  const [orderDetail, setOrderDetail] = useState(false);

  const [orderDetailName, setOrderDetailName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(0);

  const [openReturn, setOpenReturn] = useState(false);
  const [isFailFromAPI, setIsFailFromAPI] = useState(false);
  const [getOrderListByShopId, setGetOrderListByShopId] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://petuni-api.azurewebsites.net/api/Order/search?shopId=${shopId}`);
        const data = response.data;
        setGetOrderListByShopId(data);
        setOpenReturn(true)
        console.log('get ok from ', response.config.url);
        console.log("data : ", data)
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log(error.response.status)
        if (error.response.status !== 200) {
          setIsFailFromAPI(true)
          setOpenReturn(true)
        }

      }
    };
    if (shopId !== -1)
      fetchData();
  }, [shopId]);


  console.log(getOrderListByShopId)
  const employee = JSON.parse(localStorage.getItem('employee'));
  if (employee && employee.shopId !== shopId) {
    console.log("employee co shop id la : ", employee.shopId)
    setShopId(employee.shopId)
  }
  const handleClickDetail = () => {
    setShowOrderDetail(true);
  };

  const handleOpenMenu = (event, orderDetail, id, status) => {
    setOrderDetail(orderDetail);
    setId(id)
    setStatus(status)
    setOpen(event.currentTarget);
  };

  const handleUpdateStatus = (editedStatus) => {
    updateOrderStatus(id, editedStatus);
    toast.success('Cập nhật thành công!');
    setTimeout(() => {
      window.location.reload(); // Reload the page after 1 second
    }, 2000); // 1000 milliseconds = 1 second
  }

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOrderDetailPopup = () => {
    setShowOrderDetail(true);
  };

  const handleUserPopup = (event, user) => {
    setUserData(user);
    setShowUser(true);
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ORDERLIST.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleClose = () => {
    setOpen(false);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getOrderListByShopId.length) : 0;

  const filteredUsers = applySortFilter(getOrderListByShopId, getComparator(order, orderBy), filterName);

  const users = applySortFilter(getOrderListByShopId, getComparator(order, orderBy), filterName);

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
        <title>Order</title>
      </Helmet>
      <ToastContainer />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Đơn hàng
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
                  rowCount={ORDERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {(getOrderListByShopId.length === 0 || isFailFromAPI === true) && (
                    <TableRow>
                      <TableCell colSpan={8} style={{ height: '30vh', fontSize: '24px', color: 'red' }}>
                        <div style={{ textAlign: 'center' }}>Không tìm thấy.. Vui lòng thử lại sau!</div>
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, totalPrice, address, userId, orderedDate, status, orderDetails, user } = row;
                    const selectedOrder = selected.indexOf(id) !== -1;
                    const existingDate = new Date(orderedDate);

                    const options = {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    };

                    const formattedDate = existingDate.toLocaleDateString('en-GB', options);
                    return (
                      <TableRow hover key={id} tabIndex={-1} quantity="checkbox" selected={selectedOrder}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedOrder} onChange={(event) => handleClick(event, id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {id}


                          </Stack>
                        </TableCell>

                        <TableCell align="left">{totalPrice}</TableCell>

                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="left" onClick={(event) => handleUserPopup(event, user)}>
                          <span style={{ textDecoration: 'underline' }}>{user.email}</span>
                        </TableCell>


                        <TableCell align='left'>{formattedDate}</TableCell>

                        <TableCell align="left">
                          {status === 0 && <Label color="error">Đã hủy</Label>}
                          {status === 1 && <Label color="info">Chờ thanh toán</Label>}
                          {status === 2 && <Label color="info">Chờ xác nhận</Label>}
                          {status === 3 && <Label color="info">Đang chuẩn bị</Label>}
                          {status === 4 && <Label color="info">Đang vận chuyển</Label>}
                          {status === 5 && <Label color="error">Giao không thành công</Label>}
                          {status === 6 && <Label color="success">Đã hoàn thành</Label>}
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, orderDetails, id, status)}>
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
            count={ORDERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số đơn hàng theo trang :"
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
            width: 270,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleOrderDetailPopup}>
          <Iconify icon={'ph:list-magnifying-glass-thin'} sx={{ mr: 2 }} />
          Xem chi tiết
        </MenuItem>

        {status === 2 && (
          <>
            <MenuItem sx={{ color: 'success.main' }} onClick={() => handleUpdateStatus(3)}>
              <Iconify icon={'eva:checkmark-circle-outline'} sx={{ mr: 2 }} />
              Xác nhận thanh toán
            </MenuItem>
            <MenuItem sx={{ color: 'error.main' }} onClick={() => handleUpdateStatus(0)}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Hủy
            </MenuItem>
          </>
        )}

        {status === 3 && (
          <MenuItem sx={{ color: 'success.main' }} onClick={() => handleUpdateStatus(4)}>
            <Iconify icon={'eva:checkmark-circle-outline'} sx={{ mr: 2 }} />
            Xác nhận giao đơn vị vận chuyển
          </MenuItem>
        )}

        {status === 4 && (
          <>
            <MenuItem sx={{ color: 'success.main' }} onClick={() => handleUpdateStatus(6)}>
              <Iconify icon={'eva:checkmark-circle-outline'} sx={{ mr: 2 }} />
              Xác nhận giao hàng thành công
            </MenuItem>
            <MenuItem sx={{ color: 'error.main' }} onClick={() => handleUpdateStatus(5)}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Xác nhận giao hàng thất bại
            </MenuItem>
          </>
        )}

        {status === 5 && (
          <MenuItem sx={{ color: 'success.main' }} onClick={() => handleUpdateStatus(6)}>
            <Iconify icon={'eva:checkmark-circle-outline'} sx={{ mr: 2 }} />
            Xác nhận giao hàng thành công
          </MenuItem>
        )}


      </Popover>
      <Popover
        open={showOrderDetail}
        anchorEl={showOrderDetail}
        onClose={() => setShowOrderDetail(false)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      ><OrderDetailsTable orderDetails={orderDetail} />
      </Popover>
      <Popover
        open={showUser}
        anchorEl={showUser}
        onClose={() => setShowUser(false)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      ><Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Địa chỉ Hiện tại</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{userData.id}</TableCell>
              <TableCell>{userData.email}</TableCell>
              <TableCell>{userData.address}</TableCell>
              <TableCell>{userData.phone}</TableCell>
              <TableCell align="left">
                {userData.status === 0 && <Label color="error"> Đang khóa  </Label>}
                {userData.status === 1 && <Label color="success">Đang hoạt động</Label>}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Popover>
    </>
  );
}

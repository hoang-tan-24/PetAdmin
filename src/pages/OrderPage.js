import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
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
    return filter(array, (_user) => _user.nameOrders.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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

  const [openPopup, setOpenPopup] = useState(false);
  // order
  const [id, setId] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [userId, setUserId] = useState(0);
  const [email, setEmail] = useState('');
  const [orderedDate, setOrderedDate] = useState(0);
  const [status, setStatus] = useState(1);
  const [shopId, setShopId] = useState(1);
  // orderdetail

  const [orderDetail, setOrderDetail] = useState(false);

  const [orderDetailName, setOrderDetailName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(0);

  const getOrderListByShopId = useOrderListByShopId(shopId);
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
    console.log("jsafglk", editedStatus)
    console.log("jsafglk", id)
    updateOrderStatus(id, editedStatus);
    window.location.reload(); // Refresh the page
  }

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOrderDetailPopup = () => {
    setShowOrderDetail(true);
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
  /* {showOrderDetail && (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{nameOrders}</DialogTitle>
        <DialogContent>
          <img src={image} alt="Product" />
          <DialogContentText>
            Tổng giá: {total}
          </DialogContentText>
          <DialogContentText>
            {detail}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )} */
  return (
    <>
      <Helmet>
        <title>Order</title>
      </Helmet>

      <Container>
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
                        <TableCell align="left">{user.email}</TableCell>



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
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
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
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
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
    </>
  );
}

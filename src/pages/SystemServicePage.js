import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
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
import useServiceListAdmin from '../components/getAPI/getServiceListAdmin';
import useShopById from '../components/getAPI/getShopById';
import useServiceListByShopId from '../components/getAPI/getServiceListByShopId';
import { createService } from '../components/postAPI/createService';
import { updateService } from '../components/putAPI/updateService';
import { updateServiceStatus } from '../components/putAPI/updateServiceStatus';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Dịch vụ', alignRight: false },
  { id: 'shopId', label: 'Cửa hàng', alignRight: false },
  { id: 'petTypeId', label: 'Loại dịch vụ', alignRight: false },
  { id: 'duration', label: 'Thời lượng', alignRight: false },
  { id: 'price', label: 'Giá (VND)', alignRight: false },
  { id: 'categoryId', label: 'Phân loại', alignRight: false },
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
  const [serviceShopId, setServiceShopId] = useState(1);
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

  const serviceListGetByShopId = useServiceListAdmin(serviceShopId);
  const getShopById = useShopById(serviceShopId);

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

    if (status === 0 || status === 1) {
        setUpdatedStatus(2);
    } else if (status === 2) {
        setUpdatedStatus(0);
    } else {
        setUpdatedStatus(status);
    }
  };

  const handleUpdateStatus = () => {
    updateServiceStatus(editedId, updatedStatus)
    window.location.reload(); // Refresh the page
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

  const shopById = applySortFilter(getShopById, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title>Service</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Dịch vụ
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
                  rowCount={serviceListGetByShopId.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, image, name, categoryId, duration, price, maxSlot, petTypeId, status, description, shopId } = row;
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
                        
                        {
                          shopById.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          const { id, name } = row;
                          if (id === shopId)return (
                            <TableCell align="left">{name}</TableCell>
                              );
                            return (
                              null
                              );
                            }
                          )
                        }
                        <TableCell align="left">
                          {categoryId === 1 && <Label color="success">Chăm sóc và vệ sinh</Label>}
                          {categoryId === 2 && <Label color="error">Y tế và thú y</Label>}
                          {categoryId === 3 && <Label color="warning">Nuôi dưỡng</Label>}
                          {categoryId === 4 && <Label color="default">Dịch vụ</Label>}
                        </TableCell>
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
            count={serviceListGetByShopId.length}
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
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
                {editedStatus === 2 && (
                    <MenuItem sx={{ color: 'success.main' }} onClick={handleUpdateStatus}>
                        <Iconify icon={'eva:checkmark-circle-2-outline'} sx={{ mr: 2 }} />
                        Unban
                    </MenuItem>
                )}

                {editedStatus === 1 && (
                    <MenuItem sx={{ color: 'error.main' }} onClick={handleUpdateStatus}>
                        <Iconify icon={'eva:slash-outline'} sx={{ mr: 2 }} />
                        Ban
                    </MenuItem>
                )}

                {editedStatus === 0 && (
                    <MenuItem sx={{ color: 'error.main' }} onClick={handleUpdateStatus}>
                        <Iconify icon={'eva:slash-outline'} sx={{ mr: 2 }} />
                        Ban
                    </MenuItem>
                )}

      </Popover>

      

    </>
  );
}

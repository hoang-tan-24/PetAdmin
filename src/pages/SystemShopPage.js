import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
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
import useShopListAdmin from '../components/getAPI/getShopListAdmin';
import { updateShopStatus } from '../components/putAPI/updateShopStatus';

import useProductListByShopId from '../components/getAPI/getProductListByShopId';
import { createProduct } from '../components/postAPI/createProduct';
import { updateProductStatus } from '../components/putAPI/updateProductStatus';
import { updateProduct } from '../components/putAPI/updateProduct';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Cửa hàng', alignRight: false },
    { id: 'address', label: 'Địa chỉ', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Số điện thoại', alignRight: false },
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
    const data = Array.from(array);
    const stabilizedThis = data.map((el, index) => [el, index]);
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
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [shopName, setShopName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [balance, setBalance] = useState(0);
    const [petTypeId, setPetTypeId] = useState(5);
    const [productImage, setProductImage] = useState('');
    const [productShopId, setProductShopId] = useState(1);
    const [email, setEmail] = useState('');
    const [shopImage, setShopImage] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState(0);

    // edit 
    const [editedId, setEditedId] = useState(1);

    const [updatedStatus, setUpdatedStatus] = useState(0);

    const [editedName, setEditedName] = useState('name');
    const [editedCategory, setEditedCategory] = useState('category');
    const [editedQuantity, setEditedQuantity] = useState(0);
    const [editedBalance, setEditedBalance] = useState(0);
    const [editedPetTypeId, setEditedPetTypeId] = useState(5);
    const [editedStatus, setEditedStatus] = useState(0);
    const [editedDescription, setEditedDescription] = useState('description');
    const [editedImage, setEditedImage] = useState('image');
    const [editedEmail, setEditedEmail] = useState('email');
    const [editedAddress, setEditedAddress] = useState('address');
    const [editedPhone, setEditedPhone] = useState(0);

    // lay duoc roi
    const PRODUCTLISTGETBYSHOPID = useShopListAdmin(productShopId);

    const handleCreateProduct = async (event) => {
        // event.preventDefault();

        const productData = {
            Name: shopName,
           
            Balance: balance,
            Quantity: quantity,
            PetTypeId: petTypeId,
            ShopId: productShopId,
            Image: productImage,
            Status: status
        };

        const res = createProduct(productData);
        console.log(res)
        window.location.reload(); // Refresh the page
    };

    const handleProductNameChange = (event) => {
        setShopName(event.target.value);
    };

    const handleProductDescriptionChange = (event) => {
        setProductDescription(event.target.value);
    };

    const handleBalanceChange = (event) => {
        setBalance(event.target.value);
    };

    const handlePetTypeIdChange = (event) => {
        setPetTypeId(event.target.value);
    };

    const handleProductImageChange = (event) => {
        setProductImage(event.target.value);
    };

    const handleEditPopup = () => {
        setEditPopup(true);

    };


    const handleOpenPopup = () => {
        setOpenPopup(true);
    };

    const handleOpenMenu = (event, id, name, address, email, phone, balance, image, status) => {
        setOpen(event.currentTarget);
        setEditedName(name);
        setEditedAddress(address);
        setEditedEmail(email);
        setEditedPhone(phone);
        setEditedBalance(balance);
        setEditedStatus(status);
        setEditedId(id)
        setEditedImage(image)

        if (status === 0 || status === 1) {
            setUpdatedStatus(2);
        } else if (status === 2) {
            setUpdatedStatus(0);
        } else {
            setUpdatedStatus(status);
        }
    };

    const handleUpdateStatus = () => {
        updateShopStatus(editedId, updatedStatus)
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
            const newSelecteds = PRODUCTLISTGETBYSHOPID.map((n) => n.id);
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

    const handleQuantityChange = (event) => {
        const value = event.target;
        setQuantity(value);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // edit

    const handleEditProduct = () => {
        const productData = {
            Name: editedName,
            Category: editedCategory,
            Description: editedDescription,
            balance: editedBalance,
            Quantity: editedQuantity,
            PetTypeId: editedPetTypeId,
            ShopId: productShopId,
            Image: editedImage,
            Status: editedStatus
        };

        const res = updateProduct(editedId, productData);
        console.log(res)

        window.location.reload(); // Refresh the page
    }

    const handleEditIncreaseQuantity = () => {
        setEditedQuantity(editedQuantity + 1);
    };

    const handleEditDecreaseQuantity = () => {
        if (editedQuantity > 1) {
            setEditedQuantity(editedQuantity - 1);
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

    const handleEditBalanceChange = (event) => {
        setEditedBalance(event.target.value);
    };

    const handleEditPetTypeIdChange = (event) => {
        setEditedPetTypeId(event.target.value);
    };

    const handleEditProductImageChange = (event) => {
        setEditedImage(event.target.value);
    };

    const handleEditQuantityChange = (event) => {
        const value = event.target;
        setEditedQuantity(value);
    };


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PRODUCTLISTGETBYSHOPID.length) : 0;

    const filteredUsers = applySortFilter(PRODUCTLISTGETBYSHOPID, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    return (
        <>
            <Helmet>
                <title>Shop</title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Sản phẩm
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
                                    rowCount={PRODUCTLISTGETBYSHOPID.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const {  id, name, address, email, phone, balance, image, status } = row;
                                        const selectedProduct = selected.indexOf(id) !== -1;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedProduct}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedProduct} onChange={(event) => handleClick(event, id)} />
                                                </TableCell>

                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar src={image} />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">{address}</TableCell>
                                                <TableCell align="left">{email}</TableCell>
                                                <TableCell align="left">{phone}</TableCell>
                                                <TableCell align="left">{balance}</TableCell>

                                                <TableCell align="left">
                                                    {status === 0 && <Label color="error">Tạm ngừng </Label>}
                                                    {status === 1 && <Label color="success">Đang bán</Label>}
                                                    {status === 2 && <Label color="error">Ẩn </Label>}
                                                </TableCell>


                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id, name, address, email, phone, balance, image, status)}>
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
                        count={PRODUCTLISTGETBYSHOPID.length}
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


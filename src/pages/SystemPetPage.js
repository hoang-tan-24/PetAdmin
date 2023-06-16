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
import usePetListAdmin from '../components/getAPI/getPetListAdmin';
import useShopById from '../components/getAPI/getShopById';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { createProduct } from '../components/postAPI/createProduct';

import usePetListByShopId from '../components/getAPI/getPetListByShopId';
import { updatePetStatus } from '../components/putAPI/updatePetStatus';
import { updatePet } from '../components/putAPI/updatePet';
import { createPet } from '../components/postAPI/createPet';




// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Thú cưng', alignRight: false },
    { id: 'shopId', label: 'Cửa hàng', alignRight: false },
    { id: 'image', label: 'Hình minh họa', alignRight: false },
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
    const [gender, setGender] = useState('Không phân loại');
    const [statuss, setStatus] = useState(0);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [petTypeId, setPetTypeId] = useState(5);
    const [productImage, setProductImage] = useState('');
    const [shopId, setShopId] = useState(1);
    const [address, setAddress] = useState('');
    const [shopName, setShopName] = useState('');
    const [Id, setId] = useState(1);

    // edit 
    const [editedId, setEditedId] = useState(1);

    const [updatedStatus, setUpdatedStatus] = useState(0);

    const [editedName, setEditedName] = useState('name');
    const [editedGender, setEditedGender] = useState('Không phân loại');
    const [editedPrice, setEditedPrice] = useState(0);
    const [editedPetTypeId, setEditedPetTypeId] = useState(5);
    const [editedStatus, setEditedStatus] = useState(0);
    const [editedDescription, setEditedDescription] = useState('description');
    const [editedImage, setEditedImage] = useState('image');
    const [editedAddress, setEditedAddress] = useState('');

    // lay duoc roi
    const PETLISTGETBYSHOPID = usePetListAdmin(shopId);

    const getShopById = useShopById(shopId);

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleProductDescriptionChange = (event) => {
        setProductDescription(event.target.value);
    };

    const handleProductPriceChange = (event) => {
        setProductPrice(event.target.value);
    };

    const handlePetTypeIdChange = (event) => {
        setPetTypeId(event.target.value);
    };

    const handleProductImageChange = (event) => {
        setProductImage(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleEditPopup = () => {
        setEditPopup(true);

    };


    const handleOpenPopup = () => {
        setOpenPopup(true);
    };
    const handleOpenMenu = (event, id, image, gender, name, description, petTypeId, price, status, address) => {
        setOpen(event.currentTarget);
        setEditedName(name);
        setEditedGender(gender);
        setEditedAddress(address)
        setEditedPrice(price);
        setEditedPetTypeId(petTypeId);
        setEditedStatus(status);
        setEditedId(id)
        setEditedDescription(description)
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
        updatePetStatus(editedId, updatedStatus)
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
            const newSelecteds = PETLISTGETBYSHOPID.map((n) => n.id);
            const selectShop = getShopById.map((n) => n.id);
            setSelected(newSelecteds, selectShop);
        } else {
            setSelected([]);
        }
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
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


    // edit
    const handleEditItem = () => {
        const itemData = {
            Name: editedName,
            Gender: editedGender,
            Description: editedDescription,
            Price: editedPrice,
            PetTypeId: editedPetTypeId,
            ShopId: shopId,
            Image: editedImage,
            Status: editedStatus,
            Address: editedAddress
        };

        const res = updatePet(editedId, itemData);
        console.log(res)

        window.location.reload(); // Refresh the page
    }

    const handleEditStatusChange = (event) => {
        setEditedStatus(event.target.value);
    };



    



    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PETLISTGETBYSHOPID.length) : 0;

    const filteredUsers = applySortFilter(PETLISTGETBYSHOPID, getComparator(order, orderBy), filterName);

    const shopById = applySortFilter(getShopById, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    return (
        <>
            <Helmet>
                <title>Product</title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Thú cưng
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
                                    rowCount={PETLISTGETBYSHOPID.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, name, gender, image, price, petTypeId, status, description, address, shopId } = row;
                                        const selectedProduct = selected.indexOf(id) !== -1;
                                        // const selectName = selected.indexOf(id) !== -1;
                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedProduct}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedProduct} onChange={(event) => handleClick(event, id)} />
                                                </TableCell>

                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Typography variant="subtitle1" noWrap>
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
                                                    <div style={{ width: '100px', height: '100px', overflow: 'hidden' }}>
                                                        <img
                                                            src={image}
                                                            alt=""
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                </TableCell>

                                                <TableCell align="left">{price}</TableCell>
                                                <TableCell align="left">
                                                    {petTypeId === 1 && <Label color="success">Chó </Label>}
                                                    {petTypeId === 2 && <Label color="error">Mèo </Label>}
                                                    {petTypeId === 3 && <Label color="warning">Chim </Label>}
                                                    {petTypeId === 4 && <Label color="info">Cá </Label>}
                                                    {petTypeId === 5 && <Label color="default">Không phân loại </Label>}
                                                </TableCell>

                                                <TableCell align="left">
                                                    {status === 0 && <Label color="error">Tạm ngừng </Label>}
                                                    {status === 1 && <Label color="success">Đang bán</Label>}
                                                    {status === 2 && <Label color="error">Ẩn </Label>}
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id, image, gender, name, description, petTypeId, price, status, address)}>
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
                        count={PETLISTGETBYSHOPID.length}
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


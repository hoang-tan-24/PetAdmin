import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
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
import { createProduct } from '../components/postAPI/createProduct';

import usePetListByShopId from '../components/getAPI/getPetListByShopId';
import { updatePetStatus } from '../components/putAPI/updatePetStatus';
import { updatePet } from '../components/putAPI/updatePet';
import { createPet } from '../components/postAPI/createPet';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Thú cưng', alignRight: false },
    { id: 'gender', label: 'Giới tính', alignRight: false },
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
    const [shopId, setShopId] = useState(0);
    const [address, setAddress] = useState('');

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


    const employee = JSON.parse(localStorage.getItem('employee'));
    if (employee && employee.shopId !== shopId) {
        console.log("employee co shop id la : ", employee.shopId)
        setShopId(employee.shopId)
    }

    // lay duoc roi
    // const PETLISTGETBYSHOPID = usePetListByShopId(shopId);

    const [openReturn, setOpenReturn] = useState(false);
    const [PETLISTGETBYSHOPID, setPETLISTGETBYSHOPID] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api20230626100239.azurewebsites.net/api/Pet?ShopId=${shopId}`);
                const data = response.data;
                setPETLISTGETBYSHOPID(data);
                setOpenReturn(true)
                console.log('get ok from ', response.config.url);
                console.log("data : ", data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (shopId !== -1)
            fetchData();
    }, [shopId]);


    const handleCreateItem = async (event) => {
        // event.preventDefault();

        const itemData = {
            Name: productName,
            Gender: gender,
            Description: productDescription,
            Price: productPrice,
            Image: productImage,
            PetTypeId: petTypeId,
            ShopId: shopId,
            Status: statuss,
            Address: address
        };

        const res = createPet(itemData);
        console.log(res)
        setTimeout(() => {
            window.location.reload(); // Reload the page after 1 second
        }, 2000);
    };

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

        if (status === 0) {
            setUpdatedStatus(1);
        } else if (status === 1) {
            setUpdatedStatus(0);
        } else {
            setUpdatedStatus(status);
        }
    };

    const handleUpdateStatus = () => {
        updatePetStatus(editedId, updatedStatus)
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
            const newSelecteds = PETLISTGETBYSHOPID.map((n) => n.id);
            setSelected(newSelecteds);
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

        setTimeout(() => {
            window.location.reload(); // Reload the page after 1 second
        }, 2000);
    }



    const handleEditGenderChange = (event) => {
        setEditedGender(event.target.value);
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
    const handleEditedAddressChange = (event) => {
        setEditedAddress(event.target.value);
    };



    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PETLISTGETBYSHOPID.length) : 0;

    const filteredUsers = applySortFilter(PETLISTGETBYSHOPID, getComparator(order, orderBy), filterName);

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
                <title>Product</title>
            </Helmet>
            <ToastContainer />
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Thú cưng
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenPopup}>
                        Thêm thú cưng
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
                        <Paper sx={{ p: 2, maxWidth: 800, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Thêm thú cưng
                            </Typography>
                            <TextField label="Tên thú cưng"
                                value={productName}
                                onChange={handleProductNameChange}
                                fullWidth sx={{ mb: 2 }} />
                            <TextField label="Link Hình Ảnh"
                                value={productImage}
                                onChange={handleProductImageChange}
                                fullWidth sx={{ mb: 2 }} />
                            <TextField
                                label="Phân loại Thú cưng"
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
                                label="Giới tính"
                                select
                                fullWidth
                                sx={{ mb: 2 }}
                                value={gender}
                                onChange={handleGenderChange}>
                                <MenuItem value="Nam (Đực)">Đực</MenuItem>
                                <MenuItem value="Nữ (Cái)">Cái</MenuItem>
                                <MenuItem value="Không phân loại">Không phân loại</MenuItem>
                            </TextField>
                            <TextField
                                label="Giá"
                                fullWidth
                                sx={{ mb: 2 }}
                                value={productPrice}
                                onChange={handleProductPriceChange}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                                }}
                            />
                            <TextField label="Mô tả"
                                value={productDescription}
                                onChange={handleProductDescriptionChange}
                                fullWidth sx={{ mb: 2 }} />
                            <TextField label="Địa chỉ"
                                value={address}
                                onChange={handleAddressChange}
                                fullWidth sx={{ mb: 2 }} />
                            <TextField
                                label="Trạng thái"
                                select
                                fullWidth
                                sx={{ mb: 2 }}
                                value={statuss}
                                onChange={handleStatusChange}>
                                <MenuItem value="0">Tạm ngừng</MenuItem>
                                <MenuItem value="1">Đang bán</MenuItem>
                            </TextField>

                            <Button variant="contained" onClick={() => {
                                handleCreateItem();
                                setOpenPopup(false);
                            }}>
                                Thêm thú cưng
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
                                    rowCount={PETLISTGETBYSHOPID.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, name, gender, image, price, petTypeId, status, description, address } = row;
                                        const selectedProduct = selected.indexOf(id) !== -1;

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
                                                <TableCell align="left">{gender}</TableCell>
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
                <MenuItem onClick={handleEditPopup}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Chỉnh sửa
                </MenuItem>


                {editedStatus === 1 && (
                    <MenuItem sx={{ color: 'error.main' }} onClick={handleUpdateStatus}>
                        <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                        Xóa
                    </MenuItem>
                )}

                {editedStatus === 0 && (
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
                <Paper sx={{ p: 2, maxWidth: 800, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Sửa thú cưng
                    </Typography>
                    <TextField label="Tên thú cưng"
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
                        label="Giới tính"
                        select
                        fullWidth
                        sx={{ mb: 2 }}
                        value={editedGender}
                        onChange={handleEditGenderChange}>
                        <MenuItem value="Nam (Đực)">Nam (Đực)</MenuItem>
                        <MenuItem value="Nữ (Cái)">Nữ (Cái)</MenuItem>
                        <MenuItem value="Không phân loại">Không phân loại</MenuItem>
                    </TextField>

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
                    <TextField label="Địa chỉ"
                        value={editedAddress}
                        onChange={handleEditedAddressChange}
                        fullWidth sx={{ mb: 2 }} />

                    <Button variant="contained" onClick={() => {
                        handleEditItem();
                        setEditPopup(false);
                    }}>
                        Sửa thú cưng
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


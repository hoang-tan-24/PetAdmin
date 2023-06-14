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
import useProductListByShopId from '../components/getAPI/getProductListByShopId';
import { createProduct } from '../components/postAPI/createProduct';
import { updateProductStatus } from '../components/putAPI/updateProductStatus';
import { updateProduct } from '../components/putAPI/updateProduct';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Sản phẩm', alignRight: false },
    { id: 'category', label: 'Phân loại', alignRight: false },
    { id: 'quantity', label: 'Số lượng', alignRight: false },
    { id: 'price', label: 'Giá', alignRight: false },
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
    const [category, setCategory] = useState('');
    const [statuss, setStatus] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [petTypeId, setPetTypeId] = useState(5);
    const [productImage, setProductImage] = useState('');
    const [productShopId, setProductShopId] = useState(1);

    // edit 
    const [editedId, setEditedId] = useState(1);

    const [updatedStatus, setUpdatedStatus] = useState(0);

    const [editedName, setEditedName] = useState('name');
    const [editedCategory, setEditedCategory] = useState('category');
    const [editedQuantity, setEditedQuantity] = useState(0);
    const [editedPrice, setEditedPrice] = useState(0);
    const [editedPetTypeId, setEditedPetTypeId] = useState(0);
    const [editedStatus, setEditedStatus] = useState(0);
    const [editedDescription, setEditedDescription] = useState('description');
    const [editedImage, setEditedImage] = useState('image');

    // lay duoc roi
    const PRODUCTLISTGETBYSHOPID = useProductListByShopId(productShopId);

    const handleCreateProduct = async (event) => {
        // event.preventDefault();

        const productData = {
            Name: productName,
            Category: category,
            Description: productDescription,
            Price: productPrice,
            Quantity: quantity,
            PetTypeId: petTypeId,
            ShopId: productShopId,
            Image: productImage,
            Status: statuss
        };

        const res = createProduct(productData);
        console.log(res)
        window.location.reload(); // Refresh the page
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

    const handleEditPopup = () => {
        setEditPopup(true);

    };


    const handleOpenPopup = () => {
        setOpenPopup(true);
    };

    const handleOpenMenu = (event, id, image, quantity, category, name, description, petTypeId, price, status) => {
        setOpen(event.currentTarget);
        setEditedName(name);
        setEditedCategory(category);
        setEditedQuantity(quantity);
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
        updateProductStatus(editedId, updatedStatus)
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
            Price: editedPrice,
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

    const handleEditProductPriceChange = (event) => {
        setEditedPrice(event.target.value);
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
                <title>Product</title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Sản phẩm
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenPopup}>
                        Thêm sản phẩm
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
                    >
                        <Paper sx={{ p: 2, minWidth: 300, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Thêm sản phẩm
                            </Typography>
                            <TextField label="Tên sản phẩm"
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
                                <MenuItem value="5 ">Không phân loại</MenuItem>
                            </TextField>
                            <TextField
                                label="Phân loại Danh mục"
                                select
                                fullWidth
                                sx={{ mb: 2 }}
                                value={category}
                                onChange={handleCategoryChange}>
                                <MenuItem value="Thức ăn">Thức ăn</MenuItem>
                                <MenuItem value="Đồ chơi">Đồ chơi</MenuItem>
                                <MenuItem value="Quần áo và phụ kiện">Quần áo và phụ kiện</MenuItem>
                                <MenuItem value="Nghỉ ngơi và thư giãn">Nghỉ ngơi và thư giãn</MenuItem>
                                <MenuItem value="Đào tạo và giáo dục">Đào tạo và giáo dục</MenuItem>
                                <MenuItem value="Sức khỏe và phòng ngừa">Sức khỏe và phòng ngừa</MenuItem>
                                <MenuItem value="Du lịch và di chuyển">Du lịch và di chuyển</MenuItem>
                            </TextField>
                            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item>
                                    <IconButton onClick={handleDecreaseQuantity}>
                                        <RemoveIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Số lượng"
                                        type="number"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        InputProps={{
                                            inputProps: {
                                                min: 1, // Giá trị nhỏ nhất là 1
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={handleIncreaseQuantity}>
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
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
                                handleCreateProduct();
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
                                    rowCount={PRODUCTLISTGETBYSHOPID.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, image, name, category, quantity, price, petTypeId, status, description } = row;
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
                                                            {id}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">{category}</TableCell>
                                                <TableCell align="left">{quantity}</TableCell>
                                                <TableCell align="left">{price}</TableCell>
                                                <TableCell align="left">
                                                    {petTypeId === 1 && <Label color="success">Chó </Label>}
                                                    {petTypeId === 2 && <Label color="error">Mèo </Label>}
                                                    {petTypeId === 3 && <Label color="warning">Chim </Label>}
                                                    {petTypeId === 4 && <Label color="info">Cá </Label>}
                                                    {petTypeId > 4 || petTypeId < 1 && <Label color="default">Thú cưng </Label>}
                                                </TableCell>

                                                <TableCell align="left">
                                                    {status === 0 && <Label color="error">Tạm ngừng </Label>}
                                                    {status === 1 && <Label color="success">Đang bán</Label>}
                                                    {status === 2 && <Label color="error">Ẩn </Label>}
                                                </TableCell>


                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id, image, quantity, category, name, description, petTypeId, price, status)}>
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
                <Paper sx={{ p: 2, minWidth: 300, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Thêm sản phẩm
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
                        <MenuItem value="5 ">Không phân loại</MenuItem>
                    </TextField>
                    <TextField
                        label="Phân loại Danh mục"
                        select
                        fullWidth
                        sx={{ mb: 2 }}
                        value={editedCategory}
                        onChange={handleEditCategoryChange}>
                        <MenuItem value="Thức ăn">Thức ăn</MenuItem>
                        <MenuItem value="Đồ chơi">Đồ chơi</MenuItem>
                        <MenuItem value="Quần áo và phụ kiện">Quần áo và phụ kiện</MenuItem>
                        <MenuItem value="Nghỉ ngơi và thư giãn">Nghỉ ngơi và thư giãn</MenuItem>
                        <MenuItem value="Đào tạo và giáo dục">Đào tạo và giáo dục</MenuItem>
                        <MenuItem value="Sức khỏe và phòng ngừa">Sức khỏe và phòng ngừa</MenuItem>
                        <MenuItem value="Du lịch và di chuyển">Du lịch và di chuyển</MenuItem>
                    </TextField>
                    <Grid container alignItems="center" justifyContent="center" spacing={2}>
                        <Grid item>
                            <IconButton onClick={handleEditDecreaseQuantity}>
                                <RemoveIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Số lượng"
                                type="number"
                                fullWidth
                                sx={{ mb: 2 }}
                                value={editedQuantity}
                                onChange={handleEditQuantityChange}
                                InputProps={{
                                    inputProps: {
                                        min: 1, // Giá trị nhỏ nhất là 1
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleEditIncreaseQuantity}>
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
                    <TextField
                        label="Trạng thái"
                        select
                        fullWidth
                        sx={{ mb: 2 }}
                        value={editedStatus}
                        onChange={handleEditStatusChange}>
                        <MenuItem value="0">Tạm ngừng</MenuItem>
                        <MenuItem value="1">Đang bán</MenuItem>
                    </TextField>

                    <Button variant="contained" onClick={() => {
                        handleEditProduct();
                        setEditPopup(false);
                    }}>
                        Sửa sản phẩm
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


import { useState } from 'react';
import { DialogTitle, DialogActions, Dialog, Stack, Box, Typography, Avatar, Grid, Button, Popover, TextField, Paper, Card, CardContent } from '@mui/material';

const ProfilePage = () => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const employee = JSON.parse(localStorage.getItem('employee'));

    const [open, setOpen] = useState(false);
    const [editedPhone, setEditedPhone] = useState(employee.shopPhone);
    const [editedNameShop, setEditedNameShop] = useState(employee.shopName);
    const [editedAddressShop, setEditedAddressShop] = useState(employee.shopAddress);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // Cập nhật thông tin đã chỉnh sửa vào localStorage hoặc gửi lên server
        // ...
        handleClose();
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#f2f2f2' }} >
            <Grid container spacing={3} sx={{ p: 5 }}>
                <Grid item xs={12} md={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar sx={{ width: 120, height: 120 }} src={profile.picture} alt="Avatar" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Paper sx={{ p: 2 }}>
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Thông tin hồ sơ
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    label="Tên tài khoản"
                                    value={profile.name}
                                    fullWidth
                                    margin="normal"
                                    disabled
                                />
                                <TextField
                                    label="Email"
                                    value={profile.email}
                                    fullWidth
                                    margin="normal"
                                    disabled
                                />
                                <TextField
                                    label="Số điện thoại"
                                    value={editedPhone}
                                    onChange={(e) => setEditedPhone(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Tên cửa hàng"
                                    value={editedNameShop}
                                    onChange={(e) => setEditedNameShop(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Địa chỉ cửa hàng"
                                    value={editedAddressShop}
                                    onChange={(e) => setEditedAddressShop(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                            </Stack>
                            <Box sx={{ marginTop: 2 }}>
                                <Button variant="contained" color="primary" onClick={handleClick}>
                                    Chỉnh sửa thông tin
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Popover
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Bạn muốn chỉnh sửa thông tin</DialogTitle>

                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Có
                        </Button>
                        <Button variant="contained" onClick={handleClose}>
                            Không
                        </Button>
                    </DialogActions>
                </Dialog>
            </Popover>
        </Box>
    );
};

export default ProfilePage;

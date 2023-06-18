import { useState } from 'react';
import { Box, Typography, Avatar, Grid, Button, Popover, TextField } from '@mui/material';

const profile = JSON.parse(localStorage.getItem('profile'));

const ProfilePage = () => {
    const [open, setOpen] = useState(false);
    const [editedDisplayName, setEditedDisplayName] = useState(profile.name);
    const [editedPhone, seteditedPhone] = useState(profile.phone);
    const [editedNameShop, setEditedNameShop] = useState(profile.nameShop);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        handleClose();
    };



    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar sx={{ width: 120, height: 120 }} src={profile.picture} alt="Avatar" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            {profile.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }} gutterBottom>
                            {profile.email}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }} gutterBottom>
                            {profile.phone}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }} gutterBottom>
                            {profile.nameShop}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleClick}>
                            Edit Profile
                        </Button>
                    </Box>
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
                <Box sx={{ p: 2 }}>
                    <TextField
                        label="Display Name"
                        value={editedDisplayName}
                        onChange={(e) => setEditedDisplayName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        value={profile.email}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone Number"
                        value={editedPhone}
                        onChange={(e) => seteditedPhone(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Name Shop"
                        value={editedNameShop}
                        onChange={(e) => setEditedNameShop(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
};

export default ProfilePage;

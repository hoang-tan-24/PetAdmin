import { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom
import useGgPf from '../../../components/getAPI/getGoogleLogin';


const MENU_OPTIONS = [
  // {
  //   label: 'Trang chủ',
  //   icon: 'eva:home-fill',
  // },
  {
    label: 'Thông tin cửa hàng',
    icon: 'eva:person-fill',
  },
  // {
  //   label: 'Cài đặt',
  //   icon: 'eva:settings-2-fill',
  // },
];

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate(); // Định nghĩa useNavigate

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logOut = () => {
    googleLogout();
    localStorage.setItem('user', JSON.stringify(null));
    localStorage.setItem('profile', JSON.stringify(null));
    localStorage.setItem('employee', JSON.stringify(null));
    localStorage.setItem('admin', JSON.stringify(null));
    window.location.href = '/login';
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const profile = useGgPf(user.access_token)
  localStorage.setItem('profile', JSON.stringify(profile));

  const handleMenuItemClick = (index) => {
    const menuItemLabel = MENU_OPTIONS[index].label;

    if (menuItemLabel === 'Home') {
      // Navigate to the Home page
      navigate('/');
    } else if (menuItemLabel === 'Profile') {
      // Navigate to the Profile page
      navigate('/dashboard/profile');
    } else if (menuItemLabel === 'Settings') {
      // Navigate to the Settings page
      navigate('/dashboard/settings');
    }

    handleClose();
  };
  const admin = JSON.parse(localStorage.getItem('admin'));
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={profile.picture} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {profile.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profile.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />


        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option, index) => (
            admin ? (
              <MenuItem key={option.label} sx={{ opacity: 0.5 }}>
                {option.label}
              </MenuItem>
            ) : (
              <MenuItem key={option.label} onClick={() => handleMenuItemClick(index)}>
                {option.label}
              </MenuItem>
            )
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logOut} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}


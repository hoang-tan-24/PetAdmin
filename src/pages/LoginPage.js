import { useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// hooks
import useResponsive from '../hooks/useResponsive';
// components

import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';




// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));




// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const [user, setUser] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log('Login Success:', codeResponse);
      setUser(codeResponse);
      console.log("lay duoc user")

      // localStorage.setItem('user', JSON.stringify(user));
      // console.log("user khac null")

      // if (user.access_token != null) {
      //   console.log("user khac null")
      //   window.location.href = '/dashboard/app';
      // }
      // toast.error('Login Failed! Wrong username or password.');
    },
    onError: (error) => console.log('Login Failed:', error)
  });
  useEffect(() => {
    if (user && user.access_token) {
      console.log('User is logged in:', user);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/dashboard/app';
    }

  }, [user]);
  const logOut = () => {
    googleLogout();
    localStorage.setItem('user', JSON.stringify(null));
    localStorage.setItem('profile', JSON.stringify(null));
    localStorage.setItem('employee', JSON.stringify(null));
    localStorage.setItem('admin', JSON.stringify(null));
  };
  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Login</title>
      </Helmet>

      <StyledRoot>
        <Logo
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Chào mừng quay trở lại PETUNI
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Đăng nhập đến trang cho nhà cung cấp
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              {''}
              {/* <Link variant="subtitle2">Tạo tài khoản</Link> */}
            </Typography>

            <Stack direction="row" spacing={2}>

              <Button fullWidth size="large " color="inherit" variant="outlined" onClick={() => login()}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                HOẶC QUẢN TRỊ HỆ THỐNG
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

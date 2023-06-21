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
import { shopLogin } from '../components/postAPI/shopLogin';
import useGgPf from '../components/getAPI/getGoogleLogin';
import { getGgPf } from '../components/getAPI/ggPfWithComponent';

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
  const [employee, setEmployee] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log('Login Success:', codeResponse);
      setUser(codeResponse);
      console.log("lay duoc user")
    },
    onError: (error) => console.log('Login Failed:', error)
  })



  useEffect(() => {



    if (user && user.access_token) {
      console.log('User is logged in:', user);
      localStorage.setItem('user', JSON.stringify(user));
      const call = getGgPf(user.access_token);
      console.log(call);
      setProfile(call);
    }

    if (profile && profile.email && employee == null) {
      console.log("profile", profile)
      const callSL = shopLogin(profile.email);
      console.log(callSL);
      setEmployee(callSL);
    }
    // if (profile == null) {
    //   const pf = JSON.parse(localStorage.getItem('profile'));
    //   setProfile(pf);
    //   console.log(pf);
    // }
    // if (employee == null && profile) {
    //   const emp = JSON.parse(localStorage.getItem('employee'));
    //   console.log("emp", emp)
    //   setEmployee(emp)
    // }
    if (employee && profile) {
      console.log(employee)
      setLoginSuccess(true)
      setEmployee(null);
      setUser(null);
      setProfile(null);
      // window.location.href = '/dashboard/app';
    }
    if (loginSuccess) {
      console.log("chuyen trang")
      // window.location.href = '/dashboard/app';
      setLoginSuccess(false)
    }
  }, [user, profile, employee, loginSuccess]);


  const logOut = () => {
    googleLogout();
    localStorage.setItem('user', JSON.stringify(null));
    localStorage.setItem('profile', JSON.stringify(null));
    localStorage.setItem('employee', JSON.stringify(null));
    localStorage.setItem('admin', JSON.stringify(null));
    console.log("logout");
    setEmployee(null);
    setUser(null);
    setProfile(null);
  };
  return (
    <>
      <ToastContainer />
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome PETUNI
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to PETUNI
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2}>

              <Button fullWidth size="large " color="inherit" variant="outlined" onClick={() => login()}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>
              <button onClick={logOut}>logout</button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

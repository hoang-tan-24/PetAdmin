import { useEffect, useState } from 'react';

import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import getGoogleProfile from '../components/getAPI/getGoogleLogin';



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
  const [profile, setProfile] = useState([]);


  // const getProfile = useGetGoogleProfile(user.access_token);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log('Login Success:', codeResponse);
      setUser(codeResponse);
      // const res = getProfile
      // console.log(res)
      // setProfile(res)
      // Storing user data
      // localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('user', JSON.stringify(user));
      // Retrieving user data
      // const profile = JSON.parse(localStorage.getItem('profile'));
      if (user.access_token != null)




        window.location.href = '/dashboard/app';
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile("null");
  };
  return (
    <>
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
              <button onClick={logOut}>Log out</button>
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

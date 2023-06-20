import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import {adminLogin} from '../../../components/postAPI/adminLogin';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState([]);

  const handleClick = () => {
    // navigate('/dashboard', { replace: true });
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value ;
    const loginAdmin = adminLogin(email, password);
    try{
      loginAdmin.then((value) => {
        if (value == null) window.alert("Login Failed\nWrong email or password."); 
        else {
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/system/dashboard';
        }
      });
    }catch (err) {
      window.alert("Login Failed\nWrong email or password."); 
      console.log(err);
  }
    
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField id="email" name="email" label="Email address" />

        <TextField
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}

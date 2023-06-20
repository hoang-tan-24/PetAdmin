import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Iconify from '../../../components/iconify';
import { adminLogin } from '../../../components/postAPI/adminLogin';



// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState([]);

  const handleClick = () => {
    // navigate('/dashboard', { replace: true });
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginAdmin = adminLogin(username, password);
    const admin = JSON.parse(localStorage.getItem('admin'));
    try {
      loginAdmin.then((value) => {
        if (value == null) {
          console.log("login fail");
        }
        else {
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/system/dashboard';
        }
      });
    } catch (err) {
      console.log(err);
    }
    toast.error('Login Failed! Wrong username or password.');
  };

  return (
    <>

      <Stack spacing={3}>
        <TextField id="username" name="username" label="username" />
        <ToastContainer />
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

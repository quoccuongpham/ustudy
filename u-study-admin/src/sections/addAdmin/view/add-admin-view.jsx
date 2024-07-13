import axios from 'axios';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';

export default function AddAdminView() {
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const name = data.get('name');
    if (!email || !password || !name) {
      console.error('Null pointer exception:', {
        email,
        password,
        name,
      });
      return;
    }

    axios
      .post('http://localhost:3001/auth/register', {
        email,
        name,
        password,
        role: 'ADMIN',
      })
      .then((res) => {
        console.log(res.data);
        alert('Admin created successfully!');
      })
      .catch((err) => {
        console.error('Unhandled exception:', err);
        console.error(err.stack);
      });
  };

  return (
    <>
      <Button
        onClick={() => router.back()}
        color="inherit"
        // variant="contained"
        startIcon={<Iconify icon="eva:arrow-ios-back-outline" />}
        sx={{ width: '100px' }}
      >
        Back
      </Button>
      <Box sx={{ width: '50%', mx: 'auto' }}>
        <Typography variant="h4">Add Admin</Typography>
        <form noValidate autoComplete="off" style={{ marginTop: 20 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            id="name"
            autoComplete="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Admin
          </Button>
        </form>
      </Box>
    </>
  );
}

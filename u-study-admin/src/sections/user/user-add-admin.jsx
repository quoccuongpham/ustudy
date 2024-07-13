import { useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Iconify from 'src/components/iconify';

export default function UserAddAdmin() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddAdmin = () => {
    fetch(`http://localhost:3001/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: 'ADMIN',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleClose();
      });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Add new admin
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="outlined-required"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              InputProps={{ sx: { mb: 1, fontSize: 20 } }}
              InputLabelProps={{
                sx: {
                  color: '#000',
                  '&.Mui-focused': {
                    color: '#000',
                  },
                },
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              InputProps={{ sx: { mb: 1, fontSize: 20 } }}
              InputLabelProps={{
                sx: {
                  color: '#000',
                  '&.Mui-focused': {
                    color: '#000',
                  },
                },
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              InputProps={{ sx: { mb: 1, fontSize: 20 } }}
              InputLabelProps={{
                sx: {
                  color: '#000',
                  '&.Mui-focused': {
                    color: '#000',
                  },
                },
              }}
            />
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value="ADMIN"
                label="Role"
                onChange={() => {}}
                variant="outlined"
                defaultValue="ADMIN"
                sx={{
                  color: '#000',
                  '&.Mui-focused': {
                    color: '#000',
                  },
                }}
              >
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handleAddAdmin}
              variant="contained"
              color="inherit"
              sx={{ display: 'block', mt: 2 }}
            >
              Add Admin
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

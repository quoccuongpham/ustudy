import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import axios from 'axios';

import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function UserTableRow({
  uuid,
  selected,
  name,
  avatarUrl,
  email,
  role,
  createdAt,
  status = 'active',
  handleClick,
  handleUpdateStatus,
}) {
  const router = useRouter();
  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover={true} tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={name}
              src={
                avatarUrl ?? `/assets/images/avatars/avatar_${Math.floor(Math.random() * 24)}.jpg`
              }
            />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(new Date(createdAt))}
        </TableCell>

        <TableCell>
          <Label color={(status === 'BANNED' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem
          onClick={async () => {
            const res = await axios.get('http://localhost:3001/admin/profile?uuid=' + uuid, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            });
            console.log(res.data);
            router.push('/user/' + uuid);

            handleCloseMenu();
          }}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleUpdateStatus(uuid, status === 'ACTIVE' ? 'BANNED' : 'ACTIVE');
            handleCloseMenu();
          }}
          sx={{ color: status == 'BANNED' ? 'success.main' : 'error.main' }}
        >
          {status === 'BANNED' ? (
            <Iconify icon="eva:unlock-outline" sx={{ mr: 2 }} />
          ) : (
            <Iconify icon="eva:lock-outline" sx={{ mr: 2 }} />
          )}
          {status === 'BANNED' ? 'Activate' : 'Banned'}
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  uuid: PropTypes.string,
  avatarUrl: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  createdAt: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  handleUpdateStatus: PropTypes.func,
};

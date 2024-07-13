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

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  name,
  avatarUrl,
  email,
  amount,
  createdAt,
  status,
  type,
  handleClick,
  handleAccept,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
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

        <TableCell>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
        </TableCell>

        <TableCell align="center">
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(new Date(createdAt))}
        </TableCell>

        <TableCell>
          <Label color="info">{type}</Label>
        </TableCell>
        <TableCell>
          <Label color={(status === 'PENDING' && 'warning') || 'success'}>{status}</Label>
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
          onClick={() => {
            handleAccept(id);
            handleCloseMenu();
          }}
          disabled={status === 'SUCCESS'}
          sx={{
            color: 'success.main',
          }}
        >
          <Iconify icon="mingcute:card-pay-fill" sx={{ mr: 2 }} />
          Accept
        </MenuItem>

        <MenuItem
          onClick={() => {
            // handleAccept(id);
            handleCloseMenu();
          }}
          disabled={status === 'SUCCESS'}
          sx={{
            color: 'error.main',
          }}
        >
          <Iconify icon="mingcute:card-pay-fill" sx={{ mr: 2 }} />
          Reject
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  avatarUrl: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  createdAt: PropTypes.any,
  name: PropTypes.any,
  amount: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  type: PropTypes.string,
  handleAccept: PropTypes.func,
};

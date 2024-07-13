import PropTypes from 'prop-types';

import Nav from './nav';
import Main from './main';
import Header from './header';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('access_token') || !localStorage.getItem('account')) {
      router.push('/login');
    }
  }, [router]);
  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material';

import axios from 'axios';

import AppWidgetSummary from '../app-widget-summary';
import AppWebsiteAnalyst from '../app-website-analyst';
import AppCurrentVisits from '../app-current-visit';

import {
  getLast12Months,
  getCountUsersPer12Months,
  getCountUsersPerLocations,
  // getCountCoursesSoldPer12Months,
} from '../utils';

const hoverStyled = {
  '&:hover': {
    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
    cursor: 'pointer',
  },
};

export default function AppView() {
  const [sale, setSale] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [totalCourse, setTotalCourse] = useState(0);
  const [itemOrders, setItemOrders] = useState(0);
  const [userPerLocation, setUserPerLocation] = useState({
    ASIA: 0,
    AMERICA: 0,
    EUROPE: 0,
    AFRICA: 0,
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/payment/admin', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }),
      axios.get('http://localhost:3001/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }),
      axios.get('http://localhost:3001/courses/total', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }),
    ])
      .then(([resPayment, resUser, resTotalCourse]) => {
        const totalSale = resPayment.data.reduce((total, item) => {
          return total + item.amount;
        }, 0);
        console.log(resPayment);
        setSale(totalSale);
        setPayments(resPayment.data);
        setItemOrders(resPayment.data.length);
        setTotalUser(resUser.data.length);
        setUsers(resUser.data);
        setTotalCourse(resTotalCourse.data._count.id);
        setUserPerLocation(getCountUsersPerLocations(resUser.data));
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(users);
  console.log(payments);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Monthly Sales"
            total={sale}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            sx={{
              ...hoverStyled,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={totalUser}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            sx={{
              ...hoverStyled,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Orders"
            total={itemOrders}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            sx={{
              ...hoverStyled,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Courses"
            total={totalCourse}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            sx={{
              ...hoverStyled,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppWebsiteAnalyst
            title="Website Analyst"
            subheader="Last month analytics report"
            chart={{
              labels: getLast12Months(),
              series: [
                {
                  name: 'Users',
                  // type: 'column',
                  type: 'area',
                  // fill: 'solid',
                  fill: 'gradient',
                  data: getCountUsersPer12Months(users),
                  // data: [...[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2]].sort(() => 0.5 - Math.random()),
                },
                {
                  name: 'Courses Created',
                  type: 'area',
                  fill: 'gradient',
                  data: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2],
                },
                {
                  name: 'Courses Sold',
                  type: 'line',
                  fill: 'solid',
                  // data: getCountCoursesSoldPer12Months(payments),
                  data: [4, 1, 1, 2, 5, 4, 2, 5, 3, 3, 2, 1],
                },
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Users Area"
            chart={{
              series: [
                { label: 'America', value: userPerLocation.AMERICA },
                { label: 'Asia', value: userPerLocation.ASIA },
                { label: 'Europe', value: userPerLocation.EUROPE },
                { label: 'Africa', value: userPerLocation.AFRICA },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

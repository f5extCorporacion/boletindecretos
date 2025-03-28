import Grid from '@mui/material/Grid';
import Analytics from 'components/sections/dashboard/analytics';
import RecentOrders from 'components/sections/dashboard/recent-orders';

import TopCards from 'components/sections/dashboard/top-cards';
import Vista from 'pages/misboletines/misboletines';


const Dashboard = () => {
  return (
    <Grid container px={3.75} spacing={3.75}>
      <Grid item xs={12} md={12}>
      <Vista/>
      <TopCards/>
      </Grid>
      <Grid item xs={12} md={7}>
      <RecentOrders />
        
      </Grid>
      <Grid item xs={12} md={5}>
        <Analytics />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

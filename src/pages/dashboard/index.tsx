import Grid from '@mui/material/Grid';
import Analytics from 'components/sections/dashboard/analytics';


import Vista from 'pages/misboletines/misboletines';


const Dashboard = () => {
  return (
    <Grid container px={3.75} spacing={3.75}>
      <Grid item xs={12} md={12}>
      <Vista/>
      
      </Grid>
      <Grid item xs={12} md={7}>
      
        
      </Grid>
      <Grid item xs={12} md={5}>
        <Analytics />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

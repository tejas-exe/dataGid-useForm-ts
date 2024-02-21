import { Box, Typography } from '@mui/material';
import DataGridUsers from '../Components/DataGridUsers';


function Dashboard() {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        p={'20px'}
        flexDirection='column'
      >
        <Typography variant='h4' mb={4}>
          Dashboard
        </Typography>
        
        <DataGridUsers />
      </Box>
    </>
  );
}

export default Dashboard;

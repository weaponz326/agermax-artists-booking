// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// ** Example Data and Options for Bar Chart
const barChartData = {
  labels: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'short' })),
  datasets: [
    {
      label: 'Total Bookings',
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 400)),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const barChartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

// ** Example Data and Options for Line Chart
const lineChartData = {
  labels: Array.from({ length: 10 }, (_, i) => i + 1),
  datasets: [
    {
      label: 'Income',
      data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
      fill: false,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      tension: 0.1,
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};


// ** Dashboard Component
const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      {/* Total Bookings Bar Chart */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total bookings
            </Typography>
            <Bar data={barChartData} options={barChartOptions} />
          </CardContent>
        </Card>
      </Grid>

      {/* Statistics Cards */}
      <Grid item xs={12} md={4}>
        <Grid container spacing={2}>
          {/* Total Artists */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Artists</Typography>
                <Typography variant="h4">24</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Pending Bookings */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Pending bookings</Typography>
                <Typography variant="h6">4</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Unpaid Invoices */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Unpaid invoices</Typography>
                <Typography variant="h6">1</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Total Organizers */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Organizers</Typography>
                <Typography variant="h4">13</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Unread Messages */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Unread messages</Typography>
                <Typography variant="h6">2</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Income Line Chart */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Income
            </Typography>
            <Line data={lineChartData} options={lineChartOptions} />
          </CardContent>
        </Card>
      </Grid>

      {/* Add more Grid items for other components like 'Recent bookings' and 'Recent users' */}
      {/* ... */}
    </Grid>
  );
};

export default Dashboard;

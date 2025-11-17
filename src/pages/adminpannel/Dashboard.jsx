import React from 'react';
import {
  Box, Grid, Typography, Button, Card, CardContent, Avatar, Table, TableHead,
  TableRow, TableCell, TableBody, Chip, CircularProgress
} from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { blue, green, orange } from '@mui/material/colors';

const Dashboard = () => {
  // Dummy data
  const metrics = [
    { title: "Total Clients", value: 26, percent: 4 },
    { title: "Employees", value: 9 },
    { title: "Appointments", value: 16 },
    { title: "Total Services", value: 10 }
  ];

  const employees = [
    { name: "Wade Warren", status: "Approve", job: "Master" },
    { name: "Guy Hawkins", status: "Approve", job: "Master" },
    { name: "Robert Fox", status: "Approve", job: "Master" },
    { name: "Wade Warren", status: "Approve", job: "Master" },
    { name: "Jane Cooper", status: "Approve", job: "Master" },
  ];

  const segmentationData = [
    { name: 'Haircut', value: 45 },
    { name: 'Beard trim', value: 35 },
    { name: 'Shaving', value: 20 }
  ];

  const COLORS = [blue[500], green[500], orange[500]];

  const growthData = [
    { month: 'Jan', bookings: 50000, cancellations: 20000 },
    { month: 'Feb', bookings: 60000, cancellations: 25000 },
    { month: 'Mar', bookings: 40000, cancellations: 30000 },
    { month: 'Apr', bookings: 70000, cancellations: 45000 },
    { month: 'May', bookings: 80000, cancellations: 60000 },
    { month: 'Jun', bookings: 50000, cancellations: 35000 },
  ];

  const barData = [
    { month: 'Jan', value: 60 },
    { month: 'Feb', value: 80 },
    { month: 'Mar', value: 50 },
    { month: 'Apr', value: 100 },
    { month: 'May', value: 60 },
    { month: 'Jun', value: 70 }
  ];

  return (
    <Box p={3} width={"80vw"} >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Hello, John</Typography>
        <Button variant="contained">Generate Report</Button>
      </Box>

      {/* Top Cards */}
      <Grid container spacing={2}>
        {metrics.map((metric, i) => (
          <Grid item xs={12} sm={6} md={3} key={i} width={"40%"}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">{metric.title}</Typography>
                <Typography variant="h5">{metric.value}</Typography>
                {metric.percent && (
                  <Typography color="textSecondary">{metric.percent}% this week</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Employee Table & Pie Chart */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6} width={"40%"}>
          <Card>
            <CardContent>
              <Typography variant="h6">Employees</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Job Title</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((emp, i) => (
                    <TableRow key={i}>
                      <TableCell>{emp.name}</TableCell>
                      <TableCell><Chip label={emp.status} color="success" /></TableCell>
                      <TableCell>{emp.job}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} width={"40%"}>
          <Card>
            <CardContent width="50%">
              <Typography variant="h6">Segmentation</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart width={"100%"}>
                  <Pie
                    data={segmentationData}
                    cx="50%" cy="50%" outerRadius={80}
                    dataKey="value" label
                  >
                    {segmentationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Line Chart & Bar Chart */}
      <Grid container spacing={2} mt={2} width={"100%"}>
        <Grid item xs={12} md={6} width={"40%"}>
          <Card>
            <CardContent>
              <Typography variant="h6">Customer Growth Rate</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={growthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke={blue[500]} />
                  <Line type="monotone" dataKey="cancellations" stroke={orange[500]} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} width={"40%"}>
          <Card>
            <CardContent>
              <Typography variant="h6">Services-wise Bookings</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={green[500]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

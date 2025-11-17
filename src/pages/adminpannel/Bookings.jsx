import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../../api/bookings';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Chip,
  Paper,
} from '@mui/material';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBookings()
      .then((data) => {
        console.log("✅ Bookings fetched from API:", data);
        const normalized = data.map(b => ({
          ...b,
          status: b.status || 'Pending', // You can assign a default status
        }));
        setBookings(normalized);
      })
      .catch((err) => {
        console.error('❌ Error fetching bookings:', err);
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === 'Completed').length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;

  const getStatusColor = (status) => {
    if (status === 'Completed') return 'success';
    if (status === 'Pending') return 'warning';
    return 'default';
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f9fafb' }}>
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary.main">
        Bookings Management
      </Typography>

      {/* Stats */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card><CardContent>
            <Typography color="text.secondary">Total Bookings</Typography>
            <Typography variant="h4" fontWeight={700}>{totalBookings}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card><CardContent>
            <Typography color="text.secondary">Pending Bookings</Typography>
            <Typography variant="h4" fontWeight={700} color="warning.main">{pendingBookings}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card><CardContent>
            <Typography color="text.secondary">Completed Bookings</Typography>
            <Typography variant="h4" fontWeight={700} color="success.main">{completedBookings}</Typography>
          </CardContent></Card>
        </Grid>
      </Grid>

      {/* Table */}
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h5" fontWeight={600} mb={2}>Booking List</Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : bookings.length === 0 ? (
            <Typography>No bookings available.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking, idx) => (
                  <TableRow key={booking._id || idx} hover>
                    <TableCell>{booking.name || 'N/A'}</TableCell>
                    <TableCell>{booking.service || 'N/A'}</TableCell>
                    <TableCell>{booking.date || 'N/A'}</TableCell>
                    <TableCell>{booking.time || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Bookings;

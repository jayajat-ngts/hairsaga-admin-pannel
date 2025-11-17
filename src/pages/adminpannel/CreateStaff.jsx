// ✅ Full Professional Create Staff Form with Advanced Fields
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
  Avatar,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { motion } from 'framer-motion';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const roles = ['Hair Stylist', 'Receptionist', 'Manager', 'Therapist'];
const statuses = ['Active', 'Inactive'];
const genders = ['Male', 'Female', 'Other'];

const CreateStaff = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    dob: '',
    joinDate: '',
    role: '',
    status: 'Active',
    experience: '',
    address: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCloseSnack = () => setSnack({ ...snack, open: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if (!emailRegex.test(form.email)) return setSnack({ open: true, message: 'Invalid email format', severity: 'warning' });
    if (!phoneRegex.test(form.phone)) return setSnack({ open: true, message: 'Phone must be 10 digits', severity: 'warning' });

    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    try {
      await axios.post('/api/admin/create-staff', data);
      setSnack({ open: true, message: 'Staff created successfully!', severity: 'success' });
      setForm({ name: '', email: '', phone: '', password: '', gender: '', dob: '', joinDate: '', role: '', status: 'Active', experience: '', address: '', image: null });
    } catch (err) {
      setSnack({ open: true, message: 'Error creating staff', severity: 'error' });
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 5 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>New Staff Member</Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}><TextField fullWidth name="name" label="Full Name" value={form.name} onChange={handleChange} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth name="email" label="Email" value={form.email} onChange={handleChange} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth name="phone" label="Phone" value={form.phone} onChange={handleChange} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth name="password" label="Password" type="password" value={form.password} onChange={handleChange} required /></Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth><InputLabel>Gender</InputLabel>
                  <Select name="gender" value={form.gender} label="Gender" onChange={handleChange}>
                    {genders.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth name="dob" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} value={form.dob} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth name="joinDate" label="Joining Date" type="date" InputLabelProps={{ shrink: true }} value={form.joinDate} onChange={handleChange} required /></Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth><InputLabel>Role</InputLabel>
                  <Select name="role" value={form.role} label="Role" onChange={handleChange} required>
                    {roles.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth><InputLabel>Status</InputLabel>
                  <Select name="status" value={form.status} label="Status" onChange={handleChange}>
                    {statuses.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth name="experience" label="Experience (Years)" type="number" value={form.experience} onChange={handleChange} /></Grid>
              <Grid item xs={12}><TextField fullWidth name="address" label="Address" multiline rows={3} value={form.address} onChange={handleChange} /></Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={form.image ? URL.createObjectURL(form.image) : ''} sx={{ width: 56, height: 56 }} />
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: 'none' }}
                      id="upload-photo"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <Typography variant="body2">Upload Profile Picture</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.5, fontWeight: 600 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Create Staff'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </motion.div>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateStaff;
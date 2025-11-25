import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { devLogin } from "../api/auth";
import { loginSuccess } from "../store/Features/authSlice";

const Login = () => {
  const [role, setRole] = useState("admin"); // "admin" or "staff"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
     const res = await devLogin(email, password, role);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      dispatch(loginSuccess(res.data));

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.data.user.role === "staff") {
        navigate("/staff/dashboard");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed, please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "98vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: 400, borderRadius: 3, boxShadow: 10 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary.main" mb={2}>
            Silverclip Salon
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="role-label">Login Role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Login Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #7e22ce, #c084fc)",
                fontWeight: "bold",
                py: 1.5,
                fontSize: "1rem",
                ":hover": {
                  background: "linear-gradient(135deg, #6b21a8, #a855f7)",
                },
              }}
            >
              Login as {role === "admin" ? "Admin" : "Staff"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

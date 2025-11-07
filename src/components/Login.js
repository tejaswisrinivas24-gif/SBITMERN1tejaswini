import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, role } = formData;

    if (!role) {
      alert("Please select your role before logging in.");
      return;
    }

    // Here’s where you’d normally call your backend API for auth
    console.log("User Logged In:", formData);

    // Example: store user info in localStorage
    localStorage.setItem("user", JSON.stringify({ email, role }));

    // Redirect based on user role
    switch (role) {
      case "Faculty":
        navigate("/faculty");
        break;
      case "Staff":
        navigate("/staff");
        break;
      case "Management":
        navigate("/management");
        break;
      case "Student":
        navigate("/students");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #f8f9fa)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 60,
            height: 60,
            margin: "auto",
            mb: 2,
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            name="email"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          {/* 👇 User Role Selector */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value="Faculty">Faculty</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Management">Management</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
            sx={{ mt: 1 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2,
              backgroundColor: "primary.main",
            }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
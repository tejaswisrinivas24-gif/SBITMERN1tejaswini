import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Alert,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [qualification, setQualification] = useState("");
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await axios.get("https://sbitmern1tejaswini-server.onrender.com");
      setFaculty(res.data);
    } catch (err) {
      console.error("Error fetching faculty:", err);
      setError("Failed to fetch faculty data.");
    }
  };

  const handleAddFaculty = async (e) => {
    e.preventDefault();
    if (!name || !designation || !qualification || !salary) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const newFaculty = { name, designation, qualification, salary };
      await axios.post("http://localhost:5000/api/faculty", newFaculty);
      setName("");
      setDesignation("");
      setQualification("");
      setSalary("");
      await fetchFaculty();
      setError("");
    } catch (err) {
      console.error("Error adding faculty:", err);
      setError("Failed to add faculty.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this faculty?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/faculty/${id}`);
      await fetchFaculty();
    } catch (err) {
      console.error("Error deleting faculty:", err);
      setError("Failed to delete faculty.");
    }
  };

  const handleEditClick = (member) => {
    setSelectedFaculty(member);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/faculty/${selectedFaculty._id}`,
        selectedFaculty
      );
      setEditDialogOpen(false);
      setSelectedFaculty(null);
      await fetchFaculty();
    } catch (err) {
      console.error("Error updating faculty:", err);
      setError("Failed to update faculty.");
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 1000,
        margin: "auto",
        backgroundColor: "#fdf6f0",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: "bold", mb: 3, color: "#4b1d0d" }}
      >
        Faculty
      </Typography>

      {/* 🧾 Add Faculty Form */}
      <Box
        component="form"
        onSubmit={handleAddFaculty}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#fef2e6",
          borderRadius: 2,
          p: 3,
          mb: 4,
          boxShadow: 1,
        }}
      >
        <TextField
          label="Enter Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Enter Designation"
          variant="outlined"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <TextField
          label="Enter Qualification"
          variant="outlined"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />
        <TextField
          label="Enter Salary"
          variant="outlined"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#5a0b0b",
            "&:hover": { backgroundColor: "#791010" },
            alignSelf: "center",
            mt: 1,
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Faculty"}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* 👨‍🏫 Faculty Cards */}
      <Grid container spacing={3}>
        {faculty.length === 0 ? (
          <Typography textAlign="center" sx={{ width: "100%" }}>
            No faculty members found.
          </Typography>
        ) : (
          faculty.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member._id}>
              <Card sx={{ border: "1px solid #caa677", borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#4b1d0d", fontWeight: "bold" }}>
                    Name: {member.name}
                  </Typography>
                  <Typography>
                    <b>Designation:</b> {member.designation}
                  </Typography>
                  <Typography>
                    <b>Qualification:</b> {member.qualification}
                  </Typography>
                  <Typography>
                    <b>Salary:</b> ₹{member.salary}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(member._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleEditClick(member)}
                    sx={{ backgroundColor: "#c17b3e", "&:hover": { backgroundColor: "#a05d20" } }}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* 📝 Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Faculty</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={selectedFaculty?.name || ""}
            onChange={(e) =>
              setSelectedFaculty({ ...selectedFaculty, name: e.target.value })
            }
          />
          <TextField
            label="Designation"
            value={selectedFaculty?.designation || ""}
            onChange={(e) =>
              setSelectedFaculty({ ...selectedFaculty, designation: e.target.value })
            }
          />
          <TextField
            label="Qualification"
            value={selectedFaculty?.qualification || ""}
            onChange={(e) =>
              setSelectedFaculty({ ...selectedFaculty, qualification: e.target.value })
            }
          />
          <TextField
            label="Salary"
            type="number"
            value={selectedFaculty?.salary || ""}
            onChange={(e) =>
              setSelectedFaculty({ ...selectedFaculty, salary: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* 📱 QR Code */}
      {faculty.length > 0 && (
        <Box textAlign="center" sx={{ mt: 5 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "serif",
              color: "#2c3e50",
              fontWeight: "600",
              mb: 2,
            }}
          >
            Scan this QR code for Faculty Details
          </Typography>
          <QRCodeSVG
            value={JSON.stringify(faculty)}
            size={180}
            bgColor="#ffffff"
            fgColor="#000000"
            includeMargin={true}
          />
        </Box>
      )}
    </Box>
  );
};

export default Faculty;

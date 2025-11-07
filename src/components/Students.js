import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // ✅ Fetch all students from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      console.log("✅ Fetched Students:", response.data);
      setStudents(response.data);
    } catch (error) {
      console.error("❌ Error fetching students:", error);
      setError("Failed to fetch student list.");
    }
  };

  // ✅ Add student handler
  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (!name || !branch || !cgpa) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const newStudent = { name, Branch: branch, CGPA: Number(cgpa) };
      console.log("📤 Sending new student:", newStudent);

      const response = await axios.post(
        "http://localhost:5000/api/students",
        newStudent,
        {
          headers: { "Content-Type": "application/json" },
          validateStatus: () => true, // prevent auto-throw
        }
      );

      console.log("✅ Server response:", response.status, response.data);

      if (response.status === 201) {
        setName("");
        setBranch("");
        setCgpa("");
        await fetchStudents();
      } else {
        setError(`Failed to add student (status ${response.status})`);
      }
    } catch (error) {
      console.error("❌ Error adding student:", error);
      setError("Failed to add student.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      await fetchStudents();
    } catch (error) {
      console.error("❌ Error deleting student:", error);
      setError("Failed to delete student.");
    }
  };

  // ✅ Open edit dialog
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setEditDialogOpen(true);
  };

  // ✅ Save edited student
  const handleEditSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/students/${selectedStudent._id}`,
        selectedStudent
      );
      console.log("✅ Updated student:", response.data);
      setEditDialogOpen(false);
      setSelectedStudent(null);
      await fetchStudents();
    } catch (error) {
      console.error("❌ Error updating student:", error);
      setError("Failed to update student.");
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 900,
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Student List
      </Typography>

      {/* ➕ Add Student Form */}
      <Box
        component="form"
        onSubmit={handleAddStudent}
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
          justifyContent: "center",
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Branch"
          variant="outlined"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
        />
        <TextField
          label="CGPA"
          variant="outlined"
          type="number"
          step="0.01"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ minWidth: 150 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Student"}
        </Button>
      </Box>

      {/* ❗ Error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* 📋 Student Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Branch</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>CGPA</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student, index) => (
                <TableRow key={student._id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.Branch}</TableCell>
                  <TableCell>{student.CGPA}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(student)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(student._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✏ Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={selectedStudent?.name || ""}
            onChange={(e) =>
              setSelectedStudent({ ...selectedStudent, name: e.target.value })
            }
          />
          <TextField
            label="Branch"
            value={selectedStudent?.Branch || ""}
            onChange={(e) =>
              setSelectedStudent({ ...selectedStudent, Branch: e.target.value })
            }
          />
          <TextField
            label="CGPA"
            type="number"
            step="0.01"
            value={selectedStudent?.CGPA || ""}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                CGPA: Number(e.target.value),
              })
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
    </Box>
  );
}

export default StudentList;
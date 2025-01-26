import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, TextField, Typography, Box, Paper, AppBar, Toolbar } from '@mui/material';
import QRCode from 'react-qr-code';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [tokenNumber, setTokenNumber] = useState('');

  useEffect(() => {
    // Fetch all applications for the admin dashboard
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/admin/applications');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleShowModal = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTokenNumber('');
  };

  const handleAddToken = async () => {
    try {
      const response = await fetch(`/api/admin/add-token/${selectedApplication._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenNumber }),
      });

      if (response.ok) {
        const updatedApplication = await response.json();
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApplication._id ? updatedApplication : app
          )
        );
        setShowModal(false);
        setTokenNumber('');
      } else {
        console.error('Error adding token');
      }
    } catch (error) {
      console.error('Error adding token number:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <AppBar position="sticky" sx={{ marginBottom: 3 }}>
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Paper sx={{ marginTop: 3, boxShadow: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ backgroundColor: '#3f51b5', color: 'white', paddingBottom: 1 }}>
          Applications Management
        </Typography>

        <Table sx={{ minWidth: 650 }}>
          <thead>
            <tr>
              <th>Token Number</th>
              <th>Name</th>
              <th>Loan Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td>{application.tokenNumber || 'Not assigned'}</td>
                <td>{application.name}</td>
                <td>{application.loanCategory}</td>
                <td>{application.amount}</td>
                <td>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#3f51b5',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#303f9f',
                      },
                    }}
                    onClick={() => handleShowModal(application)}
                  >
                    Assign Token
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>

      {/* Modal for assigning token number */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={{ padding: 3, maxWidth: 400, margin: 'auto', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Assign Token to Application
          </Typography>
          <TextField
            label="Token Number"
            variant="outlined"
            fullWidth
            value={tokenNumber}
            onChange={(e) => setTokenNumber(e.target.value)}
            sx={{ marginBottom: 2, borderRadius: 1 }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white',
              '&:hover': {
                backgroundColor: '#303f9f',
              },
            }}
            onClick={handleAddToken}
          >
            Add Token
          </Button>
        </Box>
      </Modal>

      {/* QR Code Preview */}
      {selectedApplication && selectedApplication.tokenNumber && (
        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ marginBottom: 2, color: '#555' }}>
            Generated QR Code
          </Typography>
          <QRCode value={`Token: ${selectedApplication.tokenNumber}`} />
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Container,
  Tooltip,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (err) {
        // Implement Snackbar here if needed
        console.error("Error fetching history", err);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <HistoryIcon /> Meeting History
        </Typography>

        <Tooltip title="Go to Home">
          <IconButton onClick={() => navigate('/home')}>
            <HomeIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {meetings.length !== 0 ? (
        <Grid container spacing={3}>
          {meetings.map((meeting, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Meeting Code: <strong>{meeting.meetingCode || 'N/A'}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {formatDate(meeting.date)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" color="text.secondary">
            No meeting history found.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

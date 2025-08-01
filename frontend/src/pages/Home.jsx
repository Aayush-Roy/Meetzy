import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  TextField,
  Grid,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import RestoreIcon from '@mui/icons-material/Restore'
import LogoutIcon from '@mui/icons-material/Logout'
import VideoCallIcon from '@mui/icons-material/VideoCall'

function HomeComponent() {
  const navigate = useNavigate()
  const [meetingCode, setMeetingCode] = useState('')
  const { addToUserHistory } = useContext(AuthContext)

  const handleJoinVideoCall = async () => {
    if (meetingCode.trim() === '') return
    await addToUserHistory(meetingCode)
    navigate(`/${meetingCode}`)
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#1e1e2f' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <VideoCallIcon />
            <Typography variant="h6" component="div">
              Meetzy
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              onClick={() => navigate('/history')}
              sx={{ color: 'white' }}
              title="History"
            >
              <RestoreIcon />
            </IconButton>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/auth')
              }}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Grid
        container
        sx={{
          minHeight: 'calc(100vh - 64px)',
          background: '#f7f9fc',
          padding: 4,
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>
              Providing Quality Video Call Just Like Quality Education
            </Typography>

            <Box mt={3} display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2}>
              <TextField
                fullWidth
                label="Enter Meeting Code"
                variant="outlined"
                onChange={(e) => setMeetingCode(e.target.value)}
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleJoinVideoCall}
                sx={{ minWidth: isMobile ? '100%' : '150px' }}
              >
                Join
              </Button>
            </Box>
          </Paper>
        </Grid>

       
      </Grid>
    </>
  )
}

export default withAuth(HomeComponent)

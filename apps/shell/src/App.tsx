import { Suspense, lazy } from 'react'
import { ThemeProvider, Box, Typography, Container, CircularProgress } from 'ui-components'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Dynamically import the Auth App from the remote module federation
const AuthApp = lazy(() => import('auth_ui/AuthApp'))

function App() {
  return (
    <ThemeProvider>
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Container component="nav" maxWidth={false} sx={{ py: 2, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Password Manager Shell
          </Typography>
        </Container>

        {/* This represents the main routing area. For now, it just loads the auth app */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Suspense fallback={
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          }>
            <Routes>
              <Route path="/signup/*" element={<AuthApp />} />
              <Route path="/login/*" element={<AuthApp />} />
              <Route path="*" element={<Navigate to="/signup" replace />} />
            </Routes>
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App

import { Box } from 'ui-components'
import { Routes, Route } from 'react-router-dom'
import Signup from './Signup'
import './App.css'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<div>Login Page coming soon</div>} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Box>
  )
}

export default App

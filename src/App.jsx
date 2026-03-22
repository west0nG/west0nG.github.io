import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'
import Archive from './pages/Archive/Archive'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

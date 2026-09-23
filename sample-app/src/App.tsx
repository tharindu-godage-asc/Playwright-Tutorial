import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Todos from './pages/Todos'
import Table from './pages/Table'
import Forms from './pages/Forms'
import Dialogs from './pages/Dialogs'
import DragDrop from './pages/DragDrop'
import Tabs from './pages/Tabs'
import IframeDemo from './pages/IframeDemo'
import Widget from './pages/Widget'
import NewTab from './pages/NewTab'
import AsyncDemo from './pages/AsyncDemo'

export default function App() {
  return (
    <Routes>
      {/* Widget is embedded inside an <iframe> on the Iframe page, so it
          deliberately renders without the shared nav layout. */}
      <Route path="/widget" element={<Widget />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/table" element={<Table />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/dialogs" element={<Dialogs />} />
        <Route path="/drag-drop" element={<DragDrop />} />
        <Route path="/tabs" element={<Tabs />} />
        <Route path="/iframe" element={<IframeDemo />} />
        <Route path="/new-tab" element={<NewTab />} />
        <Route path="/async" element={<AsyncDemo />} />
      </Route>
    </Routes>
  )
}

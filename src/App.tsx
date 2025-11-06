import { BrowserRouter, Route, Routes } from "react-router"
import Alarms from "./components/alarms"
import Home from "./components/home"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/alarms' element={<Alarms />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Route, Routes } from "react-router"
import Alarms from "./components/alarms"
import Home from "./components/home"
import Layout from "./components/layout"
import Configurations from "./components/configurations"

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/alarms' element={<Alarms />} />
          <Route path='/configurations' element={<Configurations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'
import CatalogoHabitaciones from './components/CatalogoHabitaciones'
import { habitaciones } from './data/habitaciones'
import type { Habitacion, Reserva } from './types/types'
import FormularioReserva from './components/FormularioReserva'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PaginaCatalogo from './pages/PaginaCatalogo'
import PaginaDetalleHabitacion from './pages/PaginaDetalleHabitacion'
import PaginaMisReservas from './pages/PaginaMisReservas'
import Navbar from './components/Navbar'

function App() {

  //const [habitacionSeleccionada, setHabitacionSeleccionada] = useState<Habitacion | null>(null)
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [cargado, setCargado] = useState<boolean>(false)

  function agregarReserva(nuevaReserva: Reserva) {
    setReservas([...reservas, nuevaReserva])
  }

  function eliminarReserva(id: number) {
    setReservas(
      reservas.filter((r) => r.id !== id)
    )

  }

  useEffect(() => {
    const datosGuardados = localStorage.getItem("reservas")
    if (datosGuardados) {
      setReservas(JSON.parse(datosGuardados))
    }
    setCargado(true)
  }, [])

  useEffect(() => {
    if (cargado) {
      localStorage.setItem("reservas", JSON.stringify(reservas))
    }
  }, [reservas, cargado])

  return (

    <>
      {/*<CatalogoHabitaciones habitaciones={habitaciones} onSeleccionar={setHabitacionSeleccionada} />
      {habitacionSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <FormularioReserva
            habitacion={habitacionSeleccionada}
            onCerrar={() => setHabitacionSeleccionada(null)}
          />
        </div>
      )}*/}

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<PaginaCatalogo />} />
          <Route path='/habitacion/:id' element={<PaginaDetalleHabitacion agregarReserva={agregarReserva} />} />
          <Route path='/mis-reservas' element={<PaginaMisReservas reservas={reservas} eliminarReserva={eliminarReserva} />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

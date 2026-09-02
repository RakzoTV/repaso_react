import { useState } from 'react'
import './App.css'
import CatalogoHabitaciones from './components/CatalogoHabitaciones'
import { habitaciones } from './data/habitaciones'
import type { Habitacion } from './types/types'
import FormularioReserva from './components/FormularioReserva'

function App() {

  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState<Habitacion | null>(null)

  return (
    <>
      <CatalogoHabitaciones habitaciones={habitaciones} onSeleccionar={setHabitacionSeleccionada} />
      {habitacionSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <FormularioReserva
            habitacion={habitacionSeleccionada}
            onCerrar={() => setHabitacionSeleccionada(null)}
          />
        </div>
      )}
    </>
  )
}

export default App

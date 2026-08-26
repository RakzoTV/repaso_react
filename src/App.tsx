import './App.css'
import CatalogoHabitaciones from './components/CatalogoHabitaciones'
import { habitaciones } from './data/habitaciones'

function App() {

  return (
    <>
      <CatalogoHabitaciones habitaciones={habitaciones} />
    </>
  )
}

export default App

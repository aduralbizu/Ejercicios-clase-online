import './App.css'
import Productos from './Components/Productos';

function App() {

  const productos = [
    {
      nombre: '111',
      precio: 45.4,
      fecha: new Date(2023, 2, 6)
    },
    {
      nombre: '222',
      precio: 45.4,
      fecha: new Date(2023, 2, 12)
    },
    {
      nombre: '3333',
      precio: 45.4,
      fecha: new Date(2023,5,6)
    }
  ]
  return (
    <div>
      <Productos productos={productos}/>
    </div>

  );
}

export default App;
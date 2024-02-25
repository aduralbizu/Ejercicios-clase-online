import './App.css'
import Productos from './Components/Productos';
import Header from './UI/Header';
import Footer from './UI/Footer';

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
      <Header/>
      <Productos productos={productos}/>
      <Footer/>
    </div>

  );
}

export default App;
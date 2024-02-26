import './App.css'
import Productos from './Components/Productos/Productos';
import Header from './Components/UI/Header';
import Footer from  './Components/UI/Footer';
import NuevoProducto from './Components/NuevoProducto/NuevoProducto';
import { useState } from 'react';

function App() {

  const [productos,setProductos] = useState(
    [
      {
        id: Math.random().toString(),
        nombre: '111',
        precio: 45.4,
        fecha: new Date(2023, 2, 6)
      },
      {
        id: Math.random().toString(),
        nombre: '222',
        precio: 45.4,
        fecha: new Date(2023, 2, 12)
      },
      {
        id: Math.random().toString(),
        nombre: '3333',
        precio: 45.4,
        fecha: new Date(2023,5,6)
      },
      {
        id: Math.random().toString(),
        nombre: 'Ratón óptico 4',
        precio: 45.4,
        fecha: new Date(2023,5,6)
      }
    ]
  )
  const addProducto = (producto) =>{
    //setProductos(Productos.push(producto)) Lo que hace en realidad
      setProductos((prevproductos)=>{ //Funcion de actualización que recibe estado anterior
        return [producto, ...prevproductos] //Array que suma estado anterior más el nuevo producto
      });
  }
  return (
    <div>
      <Header/>
      <NuevoProducto addProducto = {addProducto}/> 
      {/* le paso la funcion */}
      <Productos productos={productos}/>
      <Footer/>
    </div>

  );
}

export default App;
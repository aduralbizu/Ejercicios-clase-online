import './App.css'
import Header from './Components/UI/Header';
import Footer from './Components/UI/Footer';
import { useState } from 'react';
import AutContext from './store/AutContext';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs'; 
import Contact from './Pages/Contact';
import Productos from './Components/Productos/Productos';
import NuevoProducto from './Components/NuevoProducto/NuevoProducto';
import ProductosContext from './store/ProductosContext';
import ErrorPage from './Pages/ErrorPage';
import DetalleProducto from './Components/Productos/DetalleProducto';
import EditarProducto from './Components/EditarProducto/EditarProducto';


function App() {

  const [login, setLogin] = useState(false);
  const [language, setLanguage] = useState('en-EN');

  const [productos, setProductos] = useState(
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
        fecha: new Date(2024, 2, 12)
      },
      {
        id: Math.random().toString(),
        nombre: '3333',
        precio: 45.4,
        fecha: new Date(2024, 5, 6)
      },
      {
        id: Math.random().toString(),
        nombre: 'Ratón óptico 4',
        precio: 45.4,
        fecha: new Date(2023, 5, 6)
      }
    ]
  )


  const addProducto = (producto) => {
    //setProductos(Productos.push(producto)) Lo que hace en realidad
    setProductos((prevproductos) => { //Funcion de actualización que recibe estado anterior. La función para actualizar el estado también puede recibir una función como argumento en lugar de un valor directo. Esta función recibirá el estado anterior como su primer argumento, y deberá devolver el nuevo estado basado en el estado anterior. Así es como funciona React
      return [producto, ...prevproductos] //Array que suma estado anterior más el nuevo producto
    });
  }

  const borraProducto = (id) => {
    // a=productos no, se crea el puntero a un nuevo Array
    let copiaProductos = [...productos]; //A shallow copy means constructing a new collection object and then populating it with references to the child objects found in the original. I
    copiaProductos = copiaProductos.filter((elemento) => { // Filter recorre todos los elementos, la función se ejecutará para todos. En aquellos elementos donde la comparación de la función sea verdadera, nos quedamos con el elemento
      return elemento.id !== id; //si es distinto, déjalo
    })
    setProductos(copiaProductos);
  }

  const contenidoProductos = <>
    <ProductosContext.Provider value={{ borraProducto: borraProducto }}>
      <Productos productos={productos} borraProducto={borraProducto} />
    </ProductosContext.Provider>
  </>;

  return (
    <div>
      <AutContext.Provider value={{ login: login, language: language }}>
        {/* Envolvemos toda la aplicación en el contexto. Enlazo el estado con el contexto que se va a extender en el resto de componentes*/}
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/products' element={contenidoProductos} />
          <Route path='/product/:id' element={<DetalleProducto/>} />
          <Route path='/product/edit/:id' element={<EditarProducto/>} />
          <Route path='/new-product' element={<NuevoProducto addProducto={addProducto} />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<ErrorPage />} />
          {/* Este elemento mostrará una cosa o la otra según a ruta */}
        </Routes>
        <Footer />
      </AutContext.Provider>
    </div>

  );
}

export default App;
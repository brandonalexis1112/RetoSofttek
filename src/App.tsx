import React from 'react';
import './App.css';
import imagenes from './App/ui/Assets/imagenes';
import FooterComponent from './App/ui/Components/Footer/FooterComponent';
import FormComponent from './App/ui/Components/Form/FormComponent';
import HeaderComponent from './App/ui/Components/Header/HeaderComponent';
import ImageComponent from './App/ui/Components/Image/ImageComponent';
const App: React.FC = () => {
  return (
   <div>
    <HeaderComponent />
    <ImageComponent />
    <FormComponent />
    <FooterComponent />
    <img className='fondo' src={imagenes.violet} alt="" />  
    <img className='fondo2' src={imagenes.green} alt="" />
   </div>
    );
}
 
export default App;

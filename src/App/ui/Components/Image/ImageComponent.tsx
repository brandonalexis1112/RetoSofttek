import React from 'react';
import imagenes from '../../Assets/imagenes';
import './ImageComponent.scss';

const ImageComponent: React.FC = () => {
  return (
    <div className="image-container">
      <img src = {imagenes.portada} alt="portada" className="image" />
    </div>
  );
};

export default ImageComponent;
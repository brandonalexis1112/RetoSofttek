import React from 'react';
import imagenes from '../../Assets/imagenes';
import './FooterComponent.scss';

const FooterComponent: React.FC = () => {
  return (
    <footer className="footer">
      <img className="footer__logo" src={imagenes.logo2} alt="Logo" />
      <p className="footer__right">© 2024 RIMAC Seguros y Reaseguros.</p>
    </footer>
  );
};


export default FooterComponent;
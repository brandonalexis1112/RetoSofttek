import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormComponent.scss';


const FormComponent: React.FC = () => {
  const [documento, setDocumento] = useState<string>('');
  const [celular, setCelular] = useState<string>('');
  const [identificacion, setIdentificacion] = useState<string>('');
  const [polPrivacidad, setPolPrivacidad] = useState<boolean>(false);
  const [polComerciales, setPolComerciales] = useState<boolean>(false);
  const [documentoError, setDocumentoError] = useState<string>('');
  const [celularError, setCelularError] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleCotizarClick = () => {
    let formIsValid = true;

    if (!documento || !celular || !identificacion) {
      formIsValid = false;
      setDocumentoError('Campo requerido');
      setCelularError('Campo requerido');
    }

    if (identificacion === 'DNI' && documento !== '7689405') {
      formIsValid = false;
      setDocumentoError('Dato incorrecto');
    }

    if (celular !== '959423428') {
      formIsValid = false;
      setCelularError('Dato incorrecto');
    }

    if (!polPrivacidad || !polComerciales) {
      formIsValid = false;
    }

    if (formIsValid) {
      localStorage.setItem('documento', documento);
      localStorage.setItem('celular', celular);

      navigate('/RetoSofttek/plans');
    }
    if (!polPrivacidad || !polComerciales) {
      setShowError(true);
      return;
    }
  };

  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 8) {
      setDocumentoError('Máximo 8 dígitos');
    } else {
      setDocumentoError('');
    }
    setDocumento(value);
  };

  const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 9) {
      setCelularError('Máximo 9 dígitos');
    } else {
      setCelularError('');
    }
    setCelular(value);
  };
  return (
    <form className="form">
      <div className="form-group__tittle">
        <div className='form-group__tittle sub'>Seguro de salud flexible</div>
        <div className='form-group__tittle principal'>Creado para ti y tu familia</div>
      </div>
      <div className='form-login'>
      <div className="line"></div>
      <div className="form-login text1">
        <label htmlFor="text1">Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría, 100% online.</label>
      </div>
      <div className="form-login text2">  
        <select
          className="identificacion"
          id=""
          onChange={(e) => setIdentificacion(e.target.value)}
        >
          <option value="">Tipo de identificación</option>
          <option value="DNI">DNI</option>
          <option value="RUC">RUC</option>
        </select>
        <input
          type="text"
          id="text1"
          value={documento}
          onChange={handleDocumentoChange}
          maxLength={8}
        />
        <label className='label__1' htmlFor="text1">Nro. de documento</label>
        {documentoError && <p className="error">{documentoError}</p>}
      </div>
      <div className="form-login text3">
        <input
          type="text"
          id="text2"
          value={celular}
          onChange={handleCelularChange}
          maxLength={9}
        />
        <label htmlFor="text2">Celular</label>
        {celularError && <p className="error">{celularError}</p>}
      </div>
      <div className="checkboxes">
        <div className="checkboxes checkbox1">
          <input
            type="checkbox"
            id="check1"
            checked={polPrivacidad}
            onChange={(e) => setPolPrivacidad(e.target.checked)}
          />
          <label htmlFor="check1">Acepto la Política de Privacidad
            {showError && !polPrivacidad && <p className="error">Campo requerido</p>}
          </label>
        </div>
        <div className="checkboxes checkbox2">
          <input
            type="checkbox"
            id="check2"
            checked={polComerciales}
            onChange={(e) => setPolComerciales(e.target.checked)}
          />
          <label htmlFor="check2">Acepto la Política Comunicaciones Comerciales
            {showError && !polComerciales && <p className="error">Campo requerido</p>}
          </label>
        </div>
        <div className="checkboxes terminos">
          <a href="https://www.rimac.com/politica-privacidad" target="_blank" rel="noreferrer">
            Aplican Términos y Condiciones.
          </a>
        </div>

        <button type="submit" className="button" onClick={handleCotizarClick}>
          <label>Cotiza aquí</label>
        </button>
      </div>
      </div>
    </form>
  );
};

export default FormComponent;
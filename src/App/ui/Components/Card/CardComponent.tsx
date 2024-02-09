import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imagenes from '../../Assets/imagenes';
import Plan from "../../models/Plan";
import User from '../../models/User';
import './CardComponent.scss';

interface CardProps {
    selectedPlan: Plan | null;
   
} 

const CardComponent: React.FC<CardProps> = ({ selectedPlan }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        fetch("https://rimac-front-end-challenge.netlify.app/api/user.json")
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user data:", error));
    };
    const handleBackClick = () => {
        navigate('/RetoSofttek/plans');
    };
    return (
        
        <form className='card'>
            <div className="steps">
                <div className="steps container">
                    <div className="steps container__1 mt-trans">1</div>
                    <p className="steps plans mt-gray">Planes y coberturas</p>
                    <img src={imagenes.line} alt="" />
                </div>
                <div className="steps container">
                    <div className="steps containerR__2 mt-blue">2</div>
                    <p className="steps resumen mt-black "> Resumen </p>
                </div>
            </div>
            <div className='content'>
                <div className='resume'>
                    <div className="back__resumen" onClick={handleBackClick}>
                        <div className="back fetch">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg></div>
                        <label className="back text"  >
                            Volver
                        </label>
                    </div>
                    <h2 className='h2-tittle'>Resumen del seguro</h2>
                </div>
                <div className='box'>
                    <p className='box__cost'> PRECIOS CALCULADOS PARA:</p>
                    <div className='box__tittle'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg>
                        <div className='box__tittle'>
                        {user && <h3>{user.name}</h3>}
                    </div>
                    </div>
                    <div className="line"></div>
                    <div className='box__pay'>
                        <h4>Responsable de pago</h4>
                        <p className='text'>DNI: 77689405</p>
                        <p className='text'>Celular: 959423428 </p>
                    </div>
                    <div className='box_plan'>
                        <h3> Plan elegido</h3>
                        <p className='text'>{selectedPlan ? selectedPlan.name : 'Ninguno seleccionado'}</p>
                    <p className='text'>Costo del Plan: {selectedPlan ? `$ ${selectedPlan.price.toFixed(2)}` : 'Ninguno seleccionado'}</p>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CardComponent;
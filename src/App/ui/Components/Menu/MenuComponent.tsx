import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imagenes from "../../Assets/imagenes";
import Plan from "../../models/Plan";
import User from "../../models/User";
import './MenuComponent.scss';

const MenuComponent: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showPlans, setShowPlans] = useState<boolean>(false);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [appliedDiscount, setAppliedDiscount] = useState(false);
    const navigate = useNavigate();
    const [originalPrices, setOriginalPrices] = useState<Record<string, number>>({});
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const handleBackClick = () => {
        navigate('/RetoSofttek/');
    };

    const redirectToSummary = (plan: Plan) => {
        navigate("/RetoSofttek/resumen", { state: { selectedPlan: plan } })
    };

    useEffect(() => {
        fetchUser();
        fetchPlans();
    }, []);

    const fetchUser = () => {
        fetch("https://rimac-front-end-challenge.netlify.app/api/user.json")
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user data:", error));
    };

    const fetchPlans = () => {
        fetch("https://rimac-front-end-challenge.netlify.app/api/plans.json")
            .then((response) => response.json())
            .then((data) => {
                setPlans(data.list);
                const selectedPlan = data.list.find((plan: Plan) => plan.name === "Plan en Casa y Clínica");
                if (selectedPlan) {
                    setSelectedPlan(selectedPlan.name);
                }
            })
            .catch((error) => console.error("Error fetching plans:", error));
    };

    const handleSelection = (option: string) => {
        setShowPlans(option === "forMe" || option === "forOther");
        if (option === "forOther" && !appliedDiscount) {
            applyDiscount();
        } else if (option === "forMe" && appliedDiscount) {
            revertDiscount();
        }
        updateCheckClasses(option);
    };

    const applyDiscount = () => {
        const updatedPlans = plans.map((plan) => ({
            ...plan,
            price: plan.price * 0.95,
        }));
        setAppliedDiscount(true);
        setOriginalPrices(Object.fromEntries(plans.map(plan => [plan.name, plan.price])));
        setPlans(updatedPlans);
    };

    const revertDiscount = () => {
        const updatedPlans = plans.map((plan) => ({
            ...plan,
            price: originalPrices[plan.name],
        }));
        setAppliedDiscount(false);
        setPlans(updatedPlans);
    };

    const updateCheckClasses = (option: string) => {
        const check1 = document.querySelector(".check1");
        const check2 = document.querySelector(".check2");
        if (option === "forMe") {
            check1?.classList.add("selected");
            check2?.classList.remove("selected");
        } else if (option === "forOther") {
            check1?.classList.remove("selected");
            check2?.classList.add("selected");
        }
    };

    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birthDateArr = birthDate.split("-");
        const birthYear = parseInt(birthDateArr[2]);
        const age = today.getFullYear() - birthYear;
        const birthMonth = parseInt(birthDateArr[1]);
        const birthDay = parseInt(birthDateArr[0]);
        if (
            today.getMonth() < birthMonth ||
            (today.getMonth() === birthMonth && today.getDate() < birthDay)
        ) {
            return age - 1;
        }
        return age;
    };

    const filteredPlans = plans.filter(
        (plan) => user && calculateAge(user.birthDay) <= plan.age
    );

    const selectPlanAndRedirect = (plan: Plan) => {
        setSelectedPlan(plan);
        redirectToSummary(plan);
    };

    return (
        <div className="Plan">
            <div className="steps">
                <div className="steps container">
                    <div className="steps container__1">1</div>
                    <p className="steps plans">Planes y coberturas</p>
                    <img src={imagenes.line} alt="..." />
                    </div>
                <div className="steps container">
                    <div className="steps containerR__2">2</div>
                    <p className="steps resumen "> Resumen </p>
                </div>
            </div>
            <div className="step-mobile">
            <div className="back_m" onClick={handleBackClick}>
                <div className="back_m fetch">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg></div>
            </div>
            <div className="back_m-text">
                <label >Paso 1 de 2</label>
            </div>
            <div className="back_m-line">
                <div className="back_m-line mt-blue"></div>
            </div>
            </div>
            <div className="line"></div>
            <div className="back_p" onClick={handleBackClick}>
                <div className="back_p fetch">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg></div>
                <label className="back_p text"  >
                    Volver
                </label>
            </div>
            <div className="tittle">
                <h2 className=" tittle__principal">
                    Rocío ¿Para quién deseas cotizar?
                </h2>
                <p className="tittle__sub">Selecciona la opción que se ajuste más a tus necesidades.
                </p>
            </div>
            <div className="for">
                <div className="for-me" onClick={() => handleSelection("forMe")}>
                    <div className="check check1">
                        <p className="check check1 __p" >✓</p>
                    </div>
                    <img src={imagenes.img1} alt="for me" />
                    <p className="for-me__tittle">Para mí</p>
                    <p className="for-me__sub">
                        Cotiza tu seguro de salud y agrega familiares si así lo deseas.
                    </p>
                </div>
                <div className="for-other" onClick={() => handleSelection("forOther")}>
                    <div className="check check2">
                        <p className="check check1 __p" >✓</p>
                    </div>
                    <img src={imagenes.img2} alt="for me" />
                    <p className="for-other__tittle">Para alguien más</p>
                    <p className="for-other__sub">
                        Realiza una cotización para uno de tus familiares o cualquier
                        persona.
                    </p>
                </div>
            </div>
            {showPlans && (
                <div className="plans">
                    {filteredPlans.length > 0 ? (
                        filteredPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`plan${selectedPlan && selectedPlan.name === plan.name ? ' selected-plan' : ''}`}
                                onClick={() => selectPlanAndRedirect(plan)}
                            >
                                {plan.name === "Plan en Casa y Clínica" && (
                                    <div className="recommend">Plan Recomendado</div>
                                )}
                                <div>
                                    <div className="name">
                                        <h2>{plan.name}</h2>
                                        {plan.name === "Plan en Casa y Clínica" ? (
                                            <img src={imagenes.hospital} alt="" />
                                        ) : (
                                            <img src={imagenes.home} alt="" />
                                        )}
                                    </div>
                                    <p className="Price tittle">COSTO DEL PLAN</p>
                                    {appliedDiscount && (
                                        <p className="Price initial"> $ {originalPrices[plan.name].toFixed(2)}</p>
                                    )}
                                    <h3>
                                        $ {plan.price.toFixed(2)} al mes
                                    </h3>
                                </div>
                                <div className="line"></div>
                                <ul>
                                    {plan.description.map((item, index) => (
                                        <li key={index} >. {item}</li>
                                    ))}
                                </ul>
                                <button type="button" className="btn red-button">Selecionar Plan</button>
                            </div>
                        ))
                    ) : (
                        <p>No hay planes disponibles para tu edad.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MenuComponent;
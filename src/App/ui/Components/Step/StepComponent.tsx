import React from "react";
import imagenes from "../../Assets/imagenes";

const StepComponent: React.FC = () => {
    return (
        <div className="steps">
            <div className="steps container">
                <div className="steps container__1">1</div>
                <p className="steps plans">Planes y coberturas</p>
                <img src={imagenes.line} alt="---" />
            </div>
            <div className="steps container">
                <div className="steps containerR__2">2</div>
                <p className="steps resumen "> Resumen </p>
            </div>
        </div>
    )
}

export default StepComponent;
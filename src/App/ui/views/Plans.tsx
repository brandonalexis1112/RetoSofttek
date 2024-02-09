import React from "react";
import HeaderComponent from "../Components/Header/HeaderComponent";
import MenuComponent from "../Components/Menu/MenuComponent";

const Plans: React.FC = () => {
    return (
        <div className="PlansMenu">
          <HeaderComponent />  
          <MenuComponent />
        </div>
    )
}

export default Plans; 
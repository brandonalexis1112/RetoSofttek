import { useLocation } from "react-router-dom";
import CardComponent from "../../Components/Card/CardComponent";
import HeaderComponent from "../../Components/Header/HeaderComponent";
import Plan from "../../models/Plan";
function Resumen() {
  const location = useLocation();
  const selectedPlan: Plan = location.state?.selectedPlan || null;
  return (
    <div>
      <HeaderComponent />
      <CardComponent selectedPlan={selectedPlan} />
    </div>
  );
}
export default Resumen; 
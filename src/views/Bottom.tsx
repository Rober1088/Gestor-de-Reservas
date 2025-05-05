import { Button } from "antd";
import supabase from "../utils/supabase";

const Botton = () => {

    async function cerrarsesion(){await supabase.auth.signOut();}
    
    return (
        <button className="logout-button" onClick={cerrarsesion}> Cerrar Sesion </button>

      
    );
  };
  
  export default Botton;
  
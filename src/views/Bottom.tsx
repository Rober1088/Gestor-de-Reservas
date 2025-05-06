import supabase from "../utils/supabase";

const Botton = () => {
    async function logOut() {
        await supabase.auth.signOut();
    }
    
    return <button className="logout-button" onClick={logOut}> Cerrar Sesion </button>
  };
  
  export default Botton;
  
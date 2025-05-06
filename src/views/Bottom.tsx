import supabase from "../utils/supabase";

export default function Bottom() {
    async function logOut() {
        await supabase.auth.signOut();
    }

    return <button className="logout-button" onClick={logOut}>Cerrar Sesion</button>
};
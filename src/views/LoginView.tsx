import { useState } from "react";
import supabase from "../utils/supabase";


function Login() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (email === "") {
      console.log("correo vacío");
    }

    try {
      const result = await supabase.auth.signInWithOtp({
        email: email,
        options: { shouldCreateUser: true },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-area">
      <form onSubmit={handleSubmit}>
        <h1>FileCastle</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="E-mail"
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "../components/UserContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        // Guarda en localStorage
        localStorage.setItem("user", JSON.stringify(data.usuario));

        // Guarda en contexto
        setUser(data.usuario);

        window.dispatchEvent(new Event("userUpdated"));

        navigate("/");
      } else {
        alert(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.log(err);
      alert("No se pudo conectar al servidor");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="mt-20 text-2xl font-semibold text-center mb-8">
          Inicio de Sesión
        </h1>

        <div className="bg-white p-6 md:p-8 border border-gray-300 shadow-md rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* CORREO */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* CONTRASEÑA */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>

              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* BOTÓN */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          {/* REGISTRO */}
          <div className="mt-4 text-center">
            <NavLink to="/register">Regístrate</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

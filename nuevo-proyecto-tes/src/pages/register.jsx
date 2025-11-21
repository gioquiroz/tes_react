import React, { useState } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";

const Register = () => {

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVendor, setIsVendor] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: username,
          nombre: name,
          password: password,
          esVendedor: isVendor
        })
      });

      const data = await res.json();

      if (data.ok) {
        alert("Usuario registrado con éxito");
        navigate("/login");
      } else {
        alert("Error al registrar usuario");
      }

    } catch (err) {
      console.log(err);
      alert("No se pudo conectar al servidor");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center py-16">
      
      <div className="w-full max-w-[45rem] p-4">

        <h1 className="text-2xl font-semibold text-center mb-8">
          Registro de Usuario
        </h1>

        <div className="bg-white p-6 md:p-8 border border-gray-300 shadow-md rounded-lg">
          
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">

              {/* CORREO */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Usuario (Correo Electrónico)
                </label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* NOMBRE */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

              </div>

              {/* CONFIRMAR CONTRASEÑA */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña
                </label>

                <div className="mt-1 relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {password !== confirmPassword && confirmPassword.length > 0 && (
                  <p className="mt-2 text-sm text-red-600">
                    Las contraseñas deben coincidir.
                  </p>
                )}
              </div>

            </div>

            {/* CHECKBOX */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isVendor}
                onChange={(e) => setIsVendor(e.target.checked)}
                className="h-4 w-4 text-gray-600 border-gray-300"
              />
              <label className="ml-2 text-sm text-gray-700">
                ¿Quieres convertirte en vendedor / proveedor?
              </label>
            </div>

            {/* BOTÓN */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Registrarse
              </button>
            </div>

          </form>

          <div className="mt-4 text-center">
            <NavLink to="/login">
              Iniciar Sesión
            </NavLink>
          </div>
          
        </div>
      </div> 
    </div>
  );
};

export default Register;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validationFormObject from "../validation";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({ name: "", email: "", password: "" });


    const nameValidation = validationFormObject.validateName(name);
    const emailValidation = validationFormObject.validateEmail(email);
    const passwordValidation = validationFormObject.validatePass(password);


    const newErrors = {
      name: nameValidation !== true ? nameValidation : "",
      email: emailValidation !== true ? emailValidation : "",
      password: passwordValidation !== true ? passwordValidation : "",
    };
    
    setErrors(newErrors);


    if (newErrors.name || newErrors.email || newErrors.password) {
      return;
    }

    const newUser = { name, email, password };

    try {
      const response = await axios.post("http://localhost:8080/user-router", newUser);
      if (response.status === 201) {
        navigate("/users");
      }
    } catch (error) {
      setError("Error adding user");
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="p-6 font-sans bg-gradient-to-b from-blue-950 via-blue-800 to-blue-500 min-h-screen">
      <h1 className="text-4xl font-bold text-purple-300 mb-6 text-center text-shadow">Add New User</h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-lg font-medium text-blue-800 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white text-black"
          />
          {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-blue-800 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white text-black"
          />
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-blue-800 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white text-black"
          />
          {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 transition duration-200"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;

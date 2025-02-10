import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import validationFormObject from '../validation';

function UpdateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user-router/user/${id}`);
      const { name, email } = response.data;
      setUser({ name, email, password: "" });
      console.log(response);
    } catch (error) {
      setError("Error fetching user data");
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, password } = user;
    const nameValidation = validationFormObject.validateName(name);
    const emailValidation = validationFormObject.validateEmail(email);
    const passwordValidation = validationFormObject.validatePass(password);

    if (nameValidation !== true) {
      setError(nameValidation);
      return;
    }
    if (emailValidation !== true) {
      setError(emailValidation);
      return;
    }
    if (password && passwordValidation !== true) {
      setError(passwordValidation);
      return;
    }

    setError(null);

    const { _id, ...userData } = user;

    try {
      await axios.put(`http://localhost:8080/user-router/${id}`, userData);
      navigate("/users");
    } catch (error) {
      setError("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="p-6 font-sans bg-gradient-to-b from-blue-950 via-blue-800 to-blue-500 min-h-screen">
      <h1 className="text-4xl font-bold text-purple-300 mb-6 text-center text-shadow">
        Edit User
      </h1>
      {error && <div className="text-red-500 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto bg-blue-800 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          className="mb-4 p-3 bg-blue-600 text-white rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-4 p-3 bg-blue-600 text-white rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="New Password (Leave blank to keep current)"
          className="mb-4 p-3 bg-blue-600 text-white rounded-lg"
        />
        <button type="submit" className="bg-teal-500 text-white p-3 rounded-lg">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUser;

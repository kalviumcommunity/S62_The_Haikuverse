import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !userId) {
      setError("All fields are required.");
      return;
    }

    const newUser = { name, email, userId };

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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-blue-800 mb-2" htmlFor="userId">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
//   console.log("User:",id)
  const navigate = useNavigate();


  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user-router/user/${id}`);
      setUser(response.data);
      console.log(response)
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
    console.log(user); 
    
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
          type="text"
          name="userId"
          value={user.userId}
          onChange={handleChange}
          placeholder="User ID"
          className="mb-4 p-3 bg-blue-600 text-white rounded-lg"
          required
        />
        <button type="submit" className="bg-teal-500 text-white p-3 rounded-lg">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUser;

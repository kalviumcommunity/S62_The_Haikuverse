import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user-router/user");
      setUsers(response.data);
    } catch (error) {
      setError("Error fetching users");
      console.error("Error fetching data:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user-router/${id}`);
      setUsers(users.filter(user => user._id !== id)); 
    } catch (error) {
      setError("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 font-sans bg-gradient-to-b from-blue-950 via-blue-800 to-blue-500 min-h-screen">
      <h1 className="text-4xl font-bold text-purple-300 mb-6 text-center text-shadow">
        User Entities
      </h1>
      {error && <div className="text-red-500 text-center">{error}</div>}
      
      <Link to="/add-user">
        <button className="bg-teal-500 text-white p-3 rounded-lg mb-6">Add New User</button>
      </Link>
      
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="flex flex-col p-6 bg-opacity-80 bg-blue-800 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl font-semibold mb-2 text-purple-400">{user.name}</h3>
              <p className="text-lg mb-1">
                <span className="font-medium text-teal-200">Email:</span> {user.email}
              </p>
              <div className="flex justify-between mt-4">
                <Link to={`/update-user/${user._id}`}>
                  <button className="bg-teal-500 text-white p-2 rounded-lg">Edit</button>
                </Link>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No users found</div>
        )}
      </div>
    </div>
  );
}

export default Users;

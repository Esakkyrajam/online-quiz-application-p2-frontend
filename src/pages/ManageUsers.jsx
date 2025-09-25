// import React, { useEffect, useState } from "react";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // TODO: Replace with API call to fetch users
//     setUsers([
//       {
//         id: "1",
//         username: "Alice",
//         email: "alice@company.com",
//         roles: ["ADMIN"],
//       },
//       {
//         id: "2",
//         username: "Bob",
//         email: "bob@example.com",
//         roles: ["PARTICIPANT"],
//       },
//     ]);
//   }, []);

//   return (
//     <div className="p-8 max-w-5xl mx-auto">
//       <h1 className="text-4xl font-bold mb-6">Manage Users</h1>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="border border-gray-300 px-4 py-2">Username</th>
//             <th className="border border-gray-300 px-4 py-2">Email</th>
//             <th className="border border-gray-300 px-4 py-2">Roles</th>
//             <th className="border border-gray-300 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className="hover:bg-gray-50">
//               <td className="border border-gray-300 px-4 py-2">
//                 {user.username}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {user.roles.join(", ")}
//               </td>
//               <td className="border border-gray-300 px-4 py-2 space-x-2">
//                 <button className="text-blue-600 hover:underline">Edit</button>
//                 <button className="text-red-600 hover:underline">Delete</button>
//               </td>
//             </tr>
//           ))}
//           {users.length === 0 && (
//             <tr>
//               <td colSpan={4} className="text-center py-6">
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageUsers;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/admin/users", {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"), // Your JWT token
//         },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       });
//       setUsers(users.filter((user) => user.id !== id));
//       alert("User deleted successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete user");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-8 max-w-6xl mx-auto">
//       <h1 className="text-4xl font-bold mb-6">Manage Users</h1>

//       {loading ? (
//         <div className="text-center py-6">Loading users...</div>
//       ) : (
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="border border-gray-300 px-4 py-2">Username</th>
//               <th className="border border-gray-300 px-4 py-2">Email</th>
//               <th className="border border-gray-300 px-4 py-2">Roles</th>
//               <th className="border border-gray-300 px-4 py-2">Results</th>
//               <th className="border border-gray-300 px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-6">
//                   No users found.
//                 </td>
//               </tr>
//             ) : (
//               users.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-50">
//                   <td className="border border-gray-300 px-4 py-2">
//                     {user.username}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {user.email}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {user.roles.join(", ")}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {user.resultsCount || 0}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 space-x-2">
//                     <button
//                       onClick={() => navigate(`/admin/user-edit/${user.id}`)}
//                       className="text-blue-600 hover:underline"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="text-red-600 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ManageUsers = () => {
//   const [adminUsers, setAdminUsers] = useState([]);
//   const [participantUsers, setParticipantUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/admin/users", {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       });

//       // Separate users by role
//       const admins = res.data.filter((user) => user.roles.includes("ADMIN"));
//       const participants = res.data.filter((user) =>
//         user.roles.includes("PARTICIPANT")
//       );

//       setAdminUsers(admins);
//       setParticipantUsers(participants);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       });

//       setAdminUsers(adminUsers.filter((user) => user.id !== id));
//       setParticipantUsers(participantUsers.filter((user) => user.id !== id));
//       alert("User deleted successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete user");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const renderTable = (users, title) => (
//     <div className="w-1/2 p-4">
//       <h2 className="text-2xl font-bold mb-4">{title}</h2>
//       {users.length === 0 ? (
//         <div className="text-center py-6">No users found.</div>
//       ) : (
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="border border-gray-300 px-4 py-2">Username</th>
//               <th className="border border-gray-300 px-4 py-2">Email</th>
//               <th className="border border-gray-300 px-4 py-2">Roles</th>
//               <th className="border border-gray-300 px-4 py-2">Results</th>
//               <th className="border border-gray-300 px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-4 py-2">
//                   {user.username}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {user.email}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {user.roles.join(", ")}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {user.resultsCount || 0}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 space-x-2">
//                   <button
//                     onClick={() => navigate(`/admin/user-edit/${user.id}`)}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(user.id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       <h1 className="text-4xl font-bold mb-6 text-center">Manage Users</h1>
//       {loading ? (
//         <div className="text-center py-6">Loading users...</div>
//       ) : (
//         <div className="flex space-x-4">
//           {renderTable(adminUsers, "Admins")}
//           {renderTable(participantUsers, "Participants")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [participantUsers, setParticipantUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      // Separate users by role
      const admins = res.data.filter((user) => user.roles.includes("ADMIN"));
      const participants = res.data.filter((user) =>
        user.roles.includes("PARTICIPANT")
      );

      setAdminUsers(admins);
      setParticipantUsers(participants);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setAdminUsers(adminUsers.filter((user) => user.id !== id));
      setParticipantUsers(participantUsers.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };
  useEffect(() => {
    fetchUsers();
  });
  const renderAdminTable = (users) => (
    <div className="w-1/2 p-4">
      <h2 className="text-2xl font-bold mb-4">Admins</h2>
      {users.length === 0 ? (
        <div className="text-center py-6">No admin users found.</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Roles</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.roles.join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    onClick={() => navigate(`/admin/user-edit/${user.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderParticipantTable = (users) => (
    <div className="w-1/2 p-4">
      <h2 className="text-2xl font-bold mb-4">Participants</h2>
      {users.length === 0 ? (
        <div className="text-center py-6">No participants found.</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Roles</th>
              <th className="border border-gray-300 px-4 py-2">Results</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.roles.join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.resultsCount || 0}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    onClick={() => navigate(`/admin/user-edit/${user.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Manage Users</h1>
      {loading ? (
        <div className="text-center py-6">Loading users...</div>
      ) : (
        <div className="flex space-x-4">
          {renderAdminTable(adminUsers)}
          {renderParticipantTable(participantUsers)}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

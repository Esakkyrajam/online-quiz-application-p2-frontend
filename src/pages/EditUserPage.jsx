import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    roles: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch user by ID
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/admin/users/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUser(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRolesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setUser({ ...user, roles: [...user.roles, value] });
    } else {
      setUser({ ...user, roles: user.roles.filter((r) => r !== value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`http://localhost:8080/api/admin/users/${userId}`, user, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert("User updated successfully!");
      navigate("/admin/manage-users");
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">
            Password (leave blank to keep)
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Roles */}
        {/* <div>
          <label className="block font-medium mb-1">Roles</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                value="ADMIN"
                checked={user.roles.includes("ADMIN")}
                onChange={handleRolesChange}
              />
              <span>ADMIN</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                value="PARTICIPANT"
                checked={user.roles.includes("PARTICIPANT")}
                onChange={handleRolesChange}
              />
              <span>PARTICIPANT</span>
            </label>
          </div>
        </div> */}

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditUserPage;

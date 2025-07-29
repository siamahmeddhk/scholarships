import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthContext";

const ManageUsers = () => {
  const { user } = useAuthContext();

  // Fetch all users
  const {
    data: users = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://s-server-two.vercel.app/users");
      return res.data;
    },
  });

  // Change user role handler
  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.patch(`https://s-server-two.vercel.app/users/${id}`, { role: newRole });
      Swal.fire("Updated!", "User role updated.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to update role.", "error");
    }
  };

  // Delete user handler
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://s-server-two.vercel.app/users/${id}`);
          Swal.fire("Deleted!", "User has been removed.", "success");
          refetch();
        } catch (err) {
          Swal.fire("Error", "Failed to delete user.", "error");
        }
      }
    });
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users. Please try again later.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border">
              <td className="p-2 border">{u.name || "N/A"}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">
                <select
                  value={u.role || "user"}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                  className="border rounded p-1"
                  disabled={u.email === user.email} // prevent changing own role
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-2 border">
                {u.email !== user.email && (
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
                {u.email === user.email && <em>(You)</em>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;

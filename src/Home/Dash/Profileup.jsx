import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";


const Profileup = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updating:", { name, photo });
    // Here you might call updateProfile() from Firebase or backend
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Display Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profileup;

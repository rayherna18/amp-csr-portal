import React, { use, useEffect, useState } from "react";
import axios from "axios";

interface VehicleSubscription {
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  subscriptionType: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "inactive" | "expired";
  paymentStatus: "paid" | "unpaid" | "pending";
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  VehicleSubscriptions: VehicleSubscription[];
}

const ViewUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetching all users from backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        // Ensure the response is an array before setting the state
        if (Array.isArray(response.data)) {
          setUsers(response.data);
          setFilteredUsers(response.data); // Initially show all users
        } else {
          console.error("Expected an array of users, but got:", response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const handleEdit = (userId: string) => {
    // Redirect to edit user page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }
  return (
    <div className="p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-gray-800">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">
              Phone: {user.phone || "N/A"}
            </p>

            <div className="mt-4">
              <h4 className="font-semibold text-lg">Vehicle Subscriptions</h4>
              {user.VehicleSubscriptions &&
              user.VehicleSubscriptions.length > 0 ? (
                user.VehicleSubscriptions.map((sub, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg mt-2">
                    <p>
                      <strong>Make:</strong> {sub.make}
                    </p>
                    <p>
                      <strong>Model:</strong> {sub.model}
                    </p>
                    <p>
                      <strong>Year:</strong> {sub.year}
                    </p>
                    <p>
                      <strong>Subscription Type:</strong> {sub.subscriptionType}
                    </p>
                    <p>
                      <strong>Status:</strong> {sub.status}
                    </p>
                    <p>
                      <strong>Payment Status:</strong> {sub.paymentStatus}
                    </p>
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {new Date(sub.startDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>End Date:</strong>{" "}
                      {new Date(sub.endDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>No subscriptions available.</p>
              )}
              {/* Edit Button */}
              <button
                onClick={() => handleEdit(user._id)}
                className="mt-4 text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewUsers;

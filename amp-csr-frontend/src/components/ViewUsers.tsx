import { useEffect, useState } from "react";
import axios from "axios";
import { FaMagnifyingGlass, FaPenToSquare, FaSquarePlus } from "react-icons/fa6";
import EditUserModal from "./EditUserModal";
import EditSubscriptionModal from "./EditSubscriptionModal";
import { updateUser, updateUserSubscriptions } from "../api/userApi";

export interface VehicleSubscription {
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

export interface User {
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

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<VehicleSubscription[] | null>(null);

  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleEditSubscription = (user: User, subscriptions: VehicleSubscription[]) => {
    setSelectedSubscriptions(subscriptions);
    //console.log("Selected Subscriptions:", subscriptions);
    setSelectedUser(user);
    setSubscriptionModalOpen(true);
  };

  const handleSave = async (updatedUser: {
    name: string;
    email: string;
    phone: string;
  }) => {
    if (!selectedUser) return;

    console.log("User ID:", selectedUser._id);

    try {
      const updatedData = await updateUser(selectedUser._id, updatedUser);
      console.log("User updated:", updatedData);

      // Update the users state with the updated user data
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, ...updatedData } : user
        )
      );

      // Updates the filtered users if search is active
      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, ...updatedData } : user
        )
      );

      // Ideally, update the user list in state here
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSubscriptionSave = async (updatedSubscriptions: { VehicleSubscriptions: VehicleSubscription[] }) => {
    if (!selectedUser){
        console.log("No user selected");
        return;
    }

    console.log("Updated subs",updatedSubscriptions);
  
    try {
      const subscriptionsArray = updatedSubscriptions.VehicleSubscriptions;
      console.log("Sending to API:", subscriptionsArray);
      const updatedData = await updateUserSubscriptions(selectedUser._id, subscriptionsArray);
  
      console.log("User subscriptions updated:", updatedData);
  
      // Update the users state with the updated subscriptions
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, ...updatedData } : user
        )
      );
  
      // Updates the filtered users if search is active
      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, ...updatedData } : user
        )
      );
    } catch (error) {
      console.error("Error updating subscriptions:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }
  return (
    <div className="p-8">
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-3 border border-gray-100 bg-white rounded-l-lg w-full focus:outline-none"
        />
        <button
          title="Update User Info"
          className="bg-blue-200 border border-l-0 border-blue-300 px-4 py-3 rounded-r-lg hover:bg-gray-100"
        >
          <FaMagnifyingGlass size={20} color="blue" />
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-col-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-2xl shadow-md w-[340px] min-h-[360px] md:w-[440px] md:min-h-[460px] flex flex-col"
          >
            <div className="flex space-x-4 items-center">
              <h3 className="text-lg">User Information</h3>
              <button
                title="Update Account Info"
                onClick={() => handleEditUser(user)}
                className="text-blue-900 hover:text-blue-800"
              >
                <FaPenToSquare size={20} />
              </button>
            </div>
            <p className="font-bold text-gray-700">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">
              Phone: {user.phone || "N/A"}
            </p>

            <div className="mt-4">
              <div className="flex space-x-4 items-center">
                <h4 className="text-lg">Vehicle Subscriptions</h4>
                <div className="flex space-x-4 items-center">
                <button title="Edit Subscription" onClick={() => handleEditSubscription(user,user.VehicleSubscriptions)} className="text-blue-900 hover:text-blue-800">
                  <FaPenToSquare size={20} />
                </button>
                <button title="Add Subscription to User" onClick={() => handleEditSubscription(user,user.VehicleSubscriptions)} className="text-blue-900 hover:text-blue-800">
                  <FaSquarePlus size={20} />
                </button>
                </div>
              </div>
              {user.VehicleSubscriptions &&
              user.VehicleSubscriptions.length > 0 ? (
                user.VehicleSubscriptions.map((sub, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-xl mt-2 space-y-3">
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
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {isSubscriptionModalOpen && selectedSubscriptions && (
        <EditSubscriptionModal
          subscriptions={selectedSubscriptions}
          isOpen={isSubscriptionModalOpen}
          onClose={() => setSubscriptionModalOpen(false)}
          onSave={handleSubscriptionSave}
        />
      )}
    </div>
  );
};

export default ViewUsers;

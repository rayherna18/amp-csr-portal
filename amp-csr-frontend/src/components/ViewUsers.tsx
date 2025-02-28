import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaChevronUp,
  FaMagnifyingGlass,
  FaPenToSquare,
  FaSquarePlus,
} from "react-icons/fa6";
import EditUserModal from "./EditUserModal";
import EditSubscriptionModal from "./EditSubscriptionModal";
import AddSubscriptionModal from "./AddSubscriptionModal";
import {updateUser, updateUserSubscriptions } from "../api/userApi";
import { FaChevronDown } from "react-icons/fa";

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
  const [searchInputValue, setSearchInputValue] = useState("");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<
    VehicleSubscription[] | null
  >(null);

  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddSubscriptionModalOpen, setAddSubscriptionModalOpen] = useState(
    false);

  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

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

  const handleEditSubscription = (
    user: User,
    subscriptions: VehicleSubscription[]
  ) => {
    setSelectedSubscriptions(subscriptions);
    //console.log("Selected Subscriptions:", subscriptions);
    setSelectedUser(user);
    setSubscriptionModalOpen(true);
  };

  const handleAddClick = (user: User) => {
    setAddSubscriptionModalOpen(true);
    setSelectedUser(user);
  }

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

  const handleSubscriptionSave = async (updatedSubscriptions: {
    VehicleSubscriptions: VehicleSubscription[];
  }) => {
    if (!selectedUser) {
      console.log("No user selected");
      return;
    }

    try {
      const subscriptionsArray = updatedSubscriptions.VehicleSubscriptions;
      console.log("Sending to API:", subscriptionsArray);
      const updatedData = await updateUserSubscriptions(
        selectedUser._id,
        subscriptionsArray
      );


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

  const handleAddSubscription = async (newSubscription: VehicleSubscription) => {
    if (!selectedUser) {
      console.log("No user selected");
      return;
    }
  
    const updatedSubscriptions = [
      ...selectedUser.VehicleSubscriptions,
      newSubscription, // Append the new subscription to the existing array
    ];
  
  
    try {
  
      // Update the users state with the updated subscriptions
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id
            ? { ...user, VehicleSubscriptions: updatedSubscriptions }
            : user
        )
      );
  
      // Updates the filtered users if search is active
      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.map((user) =>
          user._id === selectedUser._id
            ? { ...user, VehicleSubscriptions: updatedSubscriptions }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating subscriptions:", error);
    }
  };

  const handleToggleAccordion = (userId: string) => {
    setExpandedUserId((prevExpandedUserId) =>
      prevExpandedUserId === userId ? null : userId
    );
  };

  const handleSearch = () => {
    setSearchTerm(searchInputValue);
  }
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }
  return (
    <div className="p-8 h-screen overflow-y-auto">
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="px-4 py-3 border border-gray-100 bg-white rounded-l-lg w-full focus:outline-none"
        />
        <button
          onClick={handleSearch}
          title="Update User Info"
          className="bg-blue-300 text-blue-500 hover:text-blue-400 px-4 py-3 rounded-r-lg hover:bg-blue-200 cursor-pointer"
        >
          <FaMagnifyingGlass size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 items-start">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-2xl shadow-lg w-full min-h-[300px] flex flex-col  border border-gray-200"
          >
            <div className="flex justify-between mb-4 items-center">
              <h3 className="text-lg font-semibold text-gray-800">User Information</h3>
              <button
                title="Update Account Info"
                onClick={() => handleEditUser(user)}
                className="text-blue-700 hover:text-blue-600 cursor-pointer transition-transform transform hover:scale-105"
              >
                <FaPenToSquare size={20} />
              </button>
            </div>
            <div className="mb-4 space-y-1 text-gray-700 break-words">
            <p className="text-xl">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 ">
              Phone: {user.phone || "N/A"}
            </p>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h4 className="text-lg font-semibold text-gray-800">Vehicle Subscriptions</h4>
                <div className="flex space-x-3">
                  <button
                    title="Edit Subscription"
                    onClick={() =>
                      handleEditSubscription(user, user.VehicleSubscriptions)
                    }
                    className="text-blue-700 hover:text-blue-600 cursor-pointer transition-transform transform hover:scale-105"
                  >
                    <FaPenToSquare size={20} />
                  </button>
                  <button
                    title="Add Subscription to User"
                    onClick={() => handleAddClick(user)}  
                    className="text-blue-700 hover:text-blue-600 cursor-pointer transition-transform transform hover:scale-105"
                  >
                    <FaSquarePlus size={20} />
                  </button>
                </div>
              </div>

              <button onClick={() => handleToggleAccordion(user._id)} className="text-blue-700 hover:text-blue-600 mt-3 flex items-center justify-between w-full py-2 px-4 bg-gray-100 rounded-lg shadow-sm cursor-pointer">
              
              <span className="font-medium">{user.VehicleSubscriptions.length} {user.VehicleSubscriptions.length < 2 ? "Subscription" : "Subscriptions"}</span>
                {expandedUserId === user._id ? (
                  <FaChevronUp size={20} />
                ) : (
                  <FaChevronDown size={20} />
                )}
              </button>
              {expandedUserId === user._id && user.VehicleSubscriptions.length > 0 && (
                <div className="mt-4 space-y-3">
                  {user.VehicleSubscriptions.map((sub, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg text-gray-700 shadow-sm border border-gray-200">
                      <p><strong>Make:</strong> {sub.make}</p>
                      <p><strong>Model:</strong> {sub.model}</p>
                      <p><strong>Year:</strong> {sub.year}</p>
                      <p><strong>Subscription Type:</strong> {sub.subscriptionType}</p>
                      <p><strong>Status:</strong> {sub.status}</p>
                      <p><strong>Payment Status:</strong> {sub.paymentStatus}</p>
                      <p><strong>Start Date:</strong> {new Date(sub.startDate).toLocaleDateString()}</p>
                      <p><strong>End Date:</strong> {new Date(sub.endDate).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
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

      {isAddSubscriptionModalOpen && (
        <AddSubscriptionModal
          //subscriptions={[]}
          //isOpen={isAddSubscriptionModalOpen}
          onClose={() => setAddSubscriptionModalOpen(false)}
          onSave={handleAddSubscription}
        />
      )}
    </div>
  );
};

export default ViewUsers;

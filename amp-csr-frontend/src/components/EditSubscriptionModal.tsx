import { useState, useEffect } from "react";
import { VehicleSubscription } from "./ViewUsers";
import { FaTrash } from "react-icons/fa";

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSubscriptons: {
    VehicleSubscriptions: VehicleSubscription[];
  }) => void;
  subscriptions: VehicleSubscription[];
}

const EditSubscriptionModal: React.FC<EditSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  subscriptions,
}) => {
  const [formData, setFormData] = useState<VehicleSubscription | null>(null);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | undefined
  >(subscriptions[0]?.vehicleId);

  useEffect(() => {
    // If modal is opened, select the first subscription to edit (or handle as needed)
    if (isOpen && subscriptions.length > 0) {
      setSelectedSubscriptionId(subscriptions[0].vehicleId);
      setFormData({ ...subscriptions[0] });
      // Optionally, set available vehicles for transfer logic here
    }
  }, [isOpen, subscriptions]);

  if (!isOpen || !formData) return null;

  const handleSubscriptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedVehicleId = e.target.value;
    setSelectedSubscriptionId(selectedVehicleId);

    const selectedSubscription = subscriptions.find(
      (sub) => sub.vehicleId === selectedVehicleId
    );
    if (selectedSubscription) {
      setFormData({ ...selectedSubscription });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleTransferChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVehicleId = e.target.value;

    // Find the selected vehicle to Wtransfer to
    const selectedVehicle = subscriptions.find(
      (vehicle) => vehicle.vehicleId === selectedVehicleId
    );

    if (selectedVehicle && formData) {
      // Find the current vehicle (the one we're transferring from)
      const currentIndex = subscriptions.findIndex(
        (sub) => sub.vehicleId === formData?.vehicleId
      );

      if (currentIndex !== -1) {
        // Create a copy of the subscriptions array to avoid mutation
        const updatedSubscriptions = [...subscriptions];

        // Find the index of the vehicle we're transferring to
        const transferIndex = subscriptions.findIndex(
          (sub) => sub.vehicleId === selectedVehicleId
        );

        if (transferIndex !== -1) {
          // Only swap the subscriptionType field between the two vehicles
          const temp = { ...updatedSubscriptions[currentIndex] };
          updatedSubscriptions[currentIndex] = {
            ...updatedSubscriptions[currentIndex],
            subscriptionType: selectedVehicle.subscriptionType, // Swap subscriptionType only
          };
          updatedSubscriptions[transferIndex] = {
            ...updatedSubscriptions[transferIndex],
            subscriptionType: temp.subscriptionType, // Swap subscriptionType only
          };

          // Call onSave to update the subscriptions state with the swapped values
          onSave({ VehicleSubscriptions: updatedSubscriptions });
          onClose();
        }
      }
    }
  };

  const handleDelete = () => {
    const updatedSubscriptions = subscriptions.filter(
        (sub) => sub.vehicleId !== formData.vehicleId
        );

    onSave({ VehicleSubscriptions: updatedSubscriptions });
    onClose();

  };

  const handleSubmit = () => {
    if (!formData) return;

    if (!formData.vehicleId) {
      console.error("Vehicle ID is required");
      return;
    }

    // Preserve the rest of the subscriptions and only update the selected one
    const updatedSubscriptions = subscriptions.map((sub) =>
      sub.vehicleId === formData.vehicleId ? { ...formData } : sub
    );

    onSave({ VehicleSubscriptions: updatedSubscriptions });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/55 p-5 md:p-0">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Subscription</h2>

        {/* Subscription Selection Dropdown */}
        {subscriptions.length > 1 && (
        <label className="block mb-4">
          <span className="text-gray-700">Select Subscription:</span>
          <select
            value={selectedSubscriptionId}
            onChange={handleSubscriptionChange}
            className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 cursor-pointer"
          >
            {subscriptions.map((sub) => (
              <option key={sub.vehicleId} value={sub.vehicleId}>
                {sub.make} {sub.model} ({sub.subscriptionType})
              </option>
            ))}
          </select>
        </label>)}

        {/* Vehicle Information */}
        <label className="block mb-4">
          <span className="text-gray-700">Make:</span>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Model:</span>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Year:</span>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Subscription Type:</span>
          <select
            name="subscriptionType"
            value={formData.subscriptionType}
            onChange={handleChange}
            className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 cursor-pointer"
          >
            <option value="Basic">Basic</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Pro">Pro</option>
            <option value="Elite">Elite</option>
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Status:</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 cursor-pointer"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
        </label>

        {/* Transfer Subscription if applicable */}
        {subscriptions.length > 1 && formData.status !== "expired" && (
          <label className="block mb-4">
            <span className="text-gray-700">Transfer Subscription:</span>
            <select
              value={selectedSubscriptionId} // Set selectedSubscriptionId as the value
              onChange={handleTransferChange} // Trigger transfer logic when the user selects a new vehicle
              className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 cursor-pointer"
            >
              <option value="">Select Vehicle to Transfer</option>
              {subscriptions
                .filter((vehicle) => vehicle.vehicleId !== formData.vehicleId) // Exclude the current vehicle
                .map((vehicle) => (
                  <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                    {vehicle.make} {vehicle.model} ({vehicle.year}) - {vehicle.subscriptionType}
                  </option>
                ))}
            </select>
          </label>
        )}
        <div className="flex justify-between items-center mt-4">
        <button onClick={handleDelete} className="text-red-700 hover:text-red-600 flex items-center cursor-pointer">
            <FaTrash size={20} color="red" className="mr-2"/>
        </button>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Save
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubscriptionModal;

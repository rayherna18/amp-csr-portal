import { useState, useEffect } from "react";
import { VehicleSubscription } from "./ViewUsers";
import { FaSquareMinus } from "react-icons/fa6";
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

    // Preserve the rest of the subscriptions and only update the selected one
    const updatedSubscriptions = subscriptions.map((sub) =>
      sub.vehicleId === formData.vehicleId ? { ...formData } : sub
    );

    onSave({ VehicleSubscriptions: updatedSubscriptions });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/55">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Subscription</h2>

        {/* Subscription Selection Dropdown */}
        {subscriptions.length > 1 && (
        <label className="block mb-2">
          Select Subscription:
          <select
            value={selectedSubscriptionId}
            onChange={handleSubscriptionChange}
            className="w-full border p-2 rounded"
          >
            {subscriptions.map((sub) => (
              <option key={sub.vehicleId} value={sub.vehicleId}>
                {sub.make} {sub.model} ({sub.subscriptionType})
              </option>
            ))}
          </select>
        </label>)}

        {/* Vehicle Information */}
        <label className="block mb-2">
          Make:
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Model:
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Year:
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Subscription Type:
          <select
            name="subscriptionType"
            value={formData.subscriptionType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Basic">Basic</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Pro">Pro</option>
            <option value="Elite">Elite</option>
          </select>
        </label>

        <label className="block mb-2">
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
        </label>

        {/* Transfer Subscription if applicable */}
        {subscriptions.length > 1 && formData.status !== "expired" && (
          <label className="block mb-2">
            Transfer Subscription:
            <select
              value={selectedSubscriptionId} // Set selectedSubscriptionId as the value
              onChange={handleTransferChange} // Trigger transfer logic when the user selects a new vehicle
              className="w-full border p-2 rounded"
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
        <div className="flex justify-between">
        <button onClick={handleDelete} className="text-red-900 hover:text-red-800">
            <FaTrash size={20} color="red"/>
        </button>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
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

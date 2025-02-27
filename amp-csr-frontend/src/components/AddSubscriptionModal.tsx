import React, { useState } from "react";
import type { VehicleSubscription } from "./ViewUsers";
import { v4 as uuidv4 } from "uuid";
interface AddSubscriptionModalProps {
 // isOpen: boolean;
  onClose: () => void;
  onSave: (newSubscription: VehicleSubscription) => void;
  //subscriptions: VehicleSubscription[];
}

const AddSubscriptionModal: React.FC<AddSubscriptionModalProps> = ({
  //isOpen,
  onClose,
  onSave,
  //subscriptions,
}) => {
    const [formData, setFormData] = useState<VehicleSubscription>({
        make: "",
        model: "",
        year: 2025,
        subscriptionType: "Basic",
        status: "active",
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        paymentStatus: "unpaid",
        vehicleId: uuidv4(),
      });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Pass only the formData (newSubscription) to onSave
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/55">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Subscription</h2>

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

        <label className="block mb-2">
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate.toISOString().split("T")[0]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-2">
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate.toISOString().split("T")[0]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </label>

        {/* Buttons */}
        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubscriptionModal;

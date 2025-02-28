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
    <div className="fixed inset-0 flex items-center justify-center bg-black/55 p-5 md:p-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Subscription</h2>

        {/* Vehicle Information */}
        <label className="block mb-3">
          <span className="text-gray-700">Make:</span>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Model:</span>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </label>

        <label className="block mb-3">
        <span className="text-gray-700">Year:</span>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </label>

        <label className="block mb-3">
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

        <label className="block mb-3">
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

        <label className="block mb-3">
        <span className="text-gray-700">Start Date:</span>
          <input
            type="date"
            name="startDate"
            value={formData.startDate ? new Date(formData.startDate).toISOString().split("T")[0] : ""}
            onChange={handleChange}
            className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 cursor-pointer"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">End Date:</span>
          <input
            type="date"
            name="endDate"
            value={formData.endDate ? new Date(formData.endDate).toISOString().split("T")[0] : ""}
            onChange={handleChange}
            className="w-full mt-1 border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 cursor-pointer"
          />
        </label>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button onClick={onClose} className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200 cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubscriptionModal;

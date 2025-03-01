import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: [true, 'Name is required']},
  email: { type: String, required: [true, 'Email is required'], unique: true},
  phone: { type: String },
  VehicleSubscriptions: [
    {
      vehicleId: { type: String, ref: 'Vehicle'},
      make: { type: String, required: true },
      model: { type: String, required: true },
      year: { type: Number, required: true },
      subscriptionType: { type: String, required: true },
      startDate: { type: Date },
      endDate: { type: Date },
      status: { type: String, enum: ['active', 'inactive', 'expired'], required: true },
      paymentStatus: { type: String, enum: ['paid', 'unpaid', 'pending'], required: true },
    }
  ]
});

export interface User extends Document{
    id: string;
    name: string;
    email: string;
    phone: string;
    VehicleSubscriptions: Array<{
      vehicleId: string;
      make: string;
      model: string;
      year: number;
      subscriptionType: string;
      startDate: Date;
      endDate: Date;
      status: 'active' | 'inactive' | 'expired';
      paymentStatus: 'paid' | 'unpaid' | 'pending';
    }>;
}

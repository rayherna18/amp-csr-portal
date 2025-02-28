import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

// UsersService class with methods to create, find, update and remove users.
@Injectable()
export class UsersService {
  // Array of users to store user data.
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async update(id: string, userUpdate: Partial<User>): Promise<User> {
    // Find the existing user by ID
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    console.log('Before update:', existingUser);

    // Update user fields (excluding VehicleSubscriptions)
    Object.assign(existingUser, userUpdate);

    // Before saving, ensure that vehicleId is properly converted to ObjectId if necessary
    if (userUpdate.VehicleSubscriptions) {
      console.log('Updating VehicleSubscriptions');

      userUpdate.VehicleSubscriptions.forEach((updatedSub) => {
        const vehicleSubIndex = existingUser.VehicleSubscriptions.findIndex(
          (vs) => vs.vehicleId === updatedSub.vehicleId
        );
        if (vehicleSubIndex !== -1) {
          // Update existing subscription in place
          const vehicleSub = existingUser.VehicleSubscriptions[vehicleSubIndex];

          // Apply updates only to changed fields
          vehicleSub.make = updatedSub.make ?? vehicleSub.make;
          vehicleSub.model = updatedSub.model ?? vehicleSub.model;
          vehicleSub.year = updatedSub.year ?? vehicleSub.year;
          vehicleSub.subscriptionType =
            updatedSub.subscriptionType ?? vehicleSub.subscriptionType;
          vehicleSub.status = updatedSub.status ?? vehicleSub.status;
          vehicleSub.paymentStatus =
            updatedSub.paymentStatus ?? vehicleSub.paymentStatus;
          vehicleSub.startDate = updatedSub.startDate ?? vehicleSub.startDate;
          vehicleSub.endDate = updatedSub.endDate ?? vehicleSub.endDate;

          // Reassign to force the update to the object (or use markModified)
          existingUser.VehicleSubscriptions[vehicleSubIndex] = vehicleSub;
        } else {
          // Add new subscription if it doesn't exist
          existingUser.VehicleSubscriptions.push(updatedSub);
        }
      });

      // Mark the subdocument array as modified (so it is saved correctly)
      existingUser.markModified('VehicleSubscriptions');
    }

    // Save the updated user after the changes are applied
    const updatedUser = await existingUser.save();

    console.log('After update:', updatedUser); // Check the updated user data
    return updatedUser;
  }

  /*
  Unused methods for now

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Get subscriptions for a user
  async getSubscriptions(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new Error('User not found');
    return user.VehicleSubscriptions || [];
  }

  // Add a new subscription for a user
  async addSubscription(userId: string, subscriptionData: any): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new Error('User not found');
    user.VehicleSubscriptions.push(subscriptionData);
    await user.save();
    return subscriptionData;
  }

  // Remove a subscription from a user
  async removeSubscription(userId: string, vehicleId: string): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new Error('User not found');

    user.VehicleSubscriptions = user.VehicleSubscriptions.filter(
      (sub) => sub.vehicleId.toString() !== vehicleId,
    );

    await user.save();
    return { message: 'Subscription removed successfully' };
  } */
} 

import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  // Injects the UsersService into the UsersController
  constructor(private readonly usersService: UsersService) {}

  // Creates a new user
  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  // Returns all users
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAll();
  }

  // Returns a user by ID
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Put(':id')
async update(@Param('id') id: string, @Body() user: Partial<User>) {
    console.log("Incoming update request:", user); 
    const updatedUser = await this.usersService.update(id, user);
    console.log("User after update:", updatedUser);
    return updatedUser;
}

  /*
  Unused methods for now
  
  @Get(':userId/subscriptions')
  getSubscriptions(@Param('userId') userId: string) {
    return this.usersService.getSubscriptions(userId);
  }

  @Post(':userId/subscriptions')
  addSubscription(
    @Param('userId') userId: string,
    @Body() subscriptionData: any,
  ) {
    return this.usersService.addSubscription(userId, subscriptionData);
  }

  @Delete(':userId/subscriptions/:subscriptionId')
  removeSubscription(
    @Param('userId') userId: string,
    @Param('subscriptionId') subscriptionId: string,
  ) {
    return this.usersService.removeSubscription(userId, subscriptionId);
  } */
}

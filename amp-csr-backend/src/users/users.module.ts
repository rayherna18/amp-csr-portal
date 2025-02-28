import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service'; 
import { UserSchema } from './user.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}

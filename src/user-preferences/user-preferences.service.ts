/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from '../models/user-preference.model';
import { CreateUserPreferenceDto } from 'src/dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from 'src/dto/update-user-preference.dto';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreference.name)
    private userPreferenceModel: Model<UserPreference>,
  ) {}

  async create(createUserPreferenceDto: CreateUserPreferenceDto) {
    const createdUserPreference = new this.userPreferenceModel(createUserPreferenceDto);
    return createdUserPreference.save();
  }

  async findAll() {
    return this.userPreferenceModel.find().exec();
  }

  async findOne(userId: string) {
    const userPreference = await this.userPreferenceModel.findOne({ userId }).exec();
    if (!userPreference) {
      throw new NotFoundException(`Userpreference with ID ${userId} not found`);
    }
    return userPreference;
  }

  async update(userId: string, updateUserPreferenceDto: UpdateUserPreferenceDto) {
    const updatedUserPreference = await this.userPreferenceModel.findOneAndUpdate(
      { userId },
      updateUserPreferenceDto,
      { new: true },
    ).exec();
    if (!updatedUserPreference) {
      throw new NotFoundException(`User preference with ID ${userId} not found`);
    }
    return updatedUserPreference;
  }

  async remove(userId: string) {
    const deletedUserPreference = await this.userPreferenceModel.deleteOne({ userId }).exec();
    if (deletedUserPreference.deletedCount === 0) {
      throw new NotFoundException(`Userpreference with ID ${userId} not found`);
    }
    return deletedUserPreference;
  }
}

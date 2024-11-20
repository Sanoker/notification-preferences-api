/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserPreference, UserPreferenceDocument } from '../models/user-preference.model';
@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel(UserPreference.name) private userPreferenceModel: Model<UserPreferenceDocument>,
  ) {}

  async create(userPreference: UserPreference): Promise<UserPreference> {
    const createdPreference = new this.userPreferenceModel(userPreference);
    return createdPreference.save();
  }

  async findByUserId(userId: string): Promise<UserPreference | null> {
    return this.userPreferenceModel.findOne({ userId }).exec();
  }

  async update(userId: string, updateData: Partial<UserPreference>): Promise<UserPreference | null> {
    return this.userPreferenceModel.findOneAndUpdate({ userId }, updateData, { new: true }).exec();
  }

  async delete(userId: string): Promise<UserPreference | null> {
    return this.userPreferenceModel.findOneAndDelete({ userId }).exec();
  }
}
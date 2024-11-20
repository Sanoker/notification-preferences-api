/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { UserPreference } from '../models/user-preference.model';

@Controller('api/preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  // Create a new user preference
  @Post()
  async create(@Body() userPreference: UserPreference) {
    return this.preferencesService.create(userPreference);
  }

  // Get user preferences by userId
  @Get(':userId')
  async findByUserId(@Param('userId') userId: string) { // Fixed method name
    return this.preferencesService.findByUserId(userId); // Fixed method name
  }

  // Update user preferences by userId
  @Patch(':userId')
  async update(@Param('userId') userId: string, @Body() updateData: Partial<UserPreference>) {
    return this.preferencesService.update(userId, updateData);
  }

  // Delete user preferences by userId
  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    return this.preferencesService.delete(userId);
  }
}
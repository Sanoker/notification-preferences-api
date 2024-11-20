/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { UserPreferencesService } from '../user-preferences/user-preferences.service';
import { CreateUserPreferenceDto } from '../dto/create-user-preference.dto';
import { UserPreference } from '../models/user-preference.model';

@Controller('api/preferences')
export class UserPreferencesController {
    constructor(private readonly userPreferencesService: UserPreferencesService) {}

    @Post()
    async create(@Body() preferenceDto: CreateUserPreferenceDto) {
        return this.userPreferencesService.create(preferenceDto);
    }

    @Get(':userId')
    async findByUserId(@Param('userId') userId: string) {
        return this.userPreferencesService.findByUserId(userId);
    }

    @Patch(':userId')
    async update(@Param('userId') userId: string, @Body() updatedPreference: Partial<UserPreference>) {
        return this.userPreferencesService.update(userId, updatedPreference);
    }

    @Delete(':userId')
    async delete(@Param('userId') userId: string) {
        return this.userPreferencesService.delete(userId);
    }
}
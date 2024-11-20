/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferencesService } from './user-preferences.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserPreference } from '../models/user-preference.model'; // Adjust the import based on your file structure
import { CreateUserPreferenceDto } from 'src/dto/create-user-preference.dto'; // Ensure this DTO is correctly imported
import { NotFoundException } from '@nestjs/common';

describe('User PreferencesService', () => {
    let service: UserPreferencesService;
    let mockUserPreferenceModel: any;

    beforeEach(async () => {
        mockUserPreferenceModel = {
            save: jest.fn().mockResolvedValue({
                userId: 'user123',
                email: 'user@example.com',
                preferences: {
                    marketing: true,
                    newsletter: false,
                    updates: true,
                    frequency: 'weekly',
                    channels: {
                        email: true,
                        sms: false,
                        push: true,
                    },
                },
                timezone: 'America/New_York',
                lastUpdated: new Date(),
                createdAt: new Date(),
            }),
            findOne: jest.fn().mockResolvedValue(mockUserPreferenceModel), // Mock for getUser Preference
            findOneAndUpdate: jest.fn().mockResolvedValue(mockUserPreferenceModel), // Mock for updateUser Preference
            deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }), // Mock for deleteUser Preference
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserPreferencesService,
                {
                    provide: getModelToken(UserPreference.name), // Ensure this matches your model name
                    useValue: mockUserPreferenceModel,
                },
            ],
        }).compile();

        service = module.get<UserPreferencesService>(UserPreferencesService);
    });

    it('should create a user preference', async () => {
        const preferenceDto: CreateUserPreferenceDto = {
            userId: 'user123',
            email: 'user@example.com',
            preferences: {
                marketing: true,
                newsletter: false,
                updates: true,
                frequency: 'weekly', // Ensure this is one of the allowed values
                channels: {
                    email: true,
                    sms: false,
                    push: true,
                },
            },
            timezone: 'America/New_York',
        };

        const result = await service.create(preferenceDto); // Adjusted to match the method name
        expect(mockUserPreferenceModel.save).toHaveBeenCalled(); // Check if the save method was called
        expect(result).toEqual(expect.objectContaining(preferenceDto)); // Check if the result contains the expected values
    });

    it('should get a user preference', async () => {
        const result = await service.getUserPreference('user123');
        expect(mockUserPreferenceModel.findOne).toHaveBeenCalledWith({ userId: 'user123' });
        expect(result).toEqual(mockUserPreferenceModel);
    });

    it('should throw NotFoundException if user preference not found', async () => {
        mockUserPreferenceModel.findOne.mockResolvedValue(null); // Simulate not found
        await expect(service.getUserPreference('user123')).rejects.toThrow(NotFoundException);
    });

    it('should update a user preference', async () => {
        const updateDto = { email: 'new@example.com' };
        const result = await service.updateUserPreference('user123', updateDto);
        expect(mockUserPreferenceModel.findOneAndUpdate).toHaveBeenCalledWith(
            { userId: 'user123' },
            updateDto,
            { new: true },
        );
        expect(result).toEqual(mockUserPreferenceModel);
    });

    it('should throw NotFoundException when updating a non-existing user preference', async () => {
        mockUserPreferenceModel.findOneAndUpdate.mockResolvedValue(null); // Simulate not found
        await expect(service.updateUserPreference('user123', {})).rejects.toThrow(NotFoundException);
    });

    it('should delete a user preference', async () => {
        await service.deleteUserPreference('user123');
        expect(mockUserPreferenceModel.deleteOne).toHaveBeenCalledWith({ userId: 'user123' });
    });

    it('should throw NotFoundException when deleting a non-existing user preference', async () => {
        mockUserPreferenceModel.deleteOne.mockResolvedValue({ deletedCount: 0 }); // Simulate not found
        await expect(service.deleteUserPreference('user123')).rejects.toThrow(NotFoundException);
    });
});
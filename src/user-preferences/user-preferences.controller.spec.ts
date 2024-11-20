/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferencesController } from './user-preferences.controller'; // Adjust the import based on your file structure
import { UserPreferencesService } from './user-preferences.service'; // Adjust the import based on your file structure
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserPreferenceDto } from '../dto/create-user-preference.dto'; // Adjust the import based on your file structure

describe('UserPreferencesController', () => {
    let userPreferencesController: UserPreferencesController;
    let userPreferencesService: UserPreferencesService;

    const mockUserPreferenceModel = {
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
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserPreferencesController],
            providers: [
                UserPreferencesService,
                {
                    provide: getModelToken('UserPreference'), // Ensure this matches your model name
                    useValue: jest.fn().mockImplementation(() => mockUserPreferenceModel),
                },
            ],
        }).compile();

        userPreferencesController = module.get<UserPreferencesController>(UserPreferencesController);
        userPreferencesService = module.get<UserPreferencesService>(UserPreferencesService);
    });

    describe('create', () => {
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

            const result = await userPreferencesController.create(preferenceDto);
            expect(mockUserPreferenceModel.save).toHaveBeenCalled(); // Check if the save method was called
            expect(result).toEqual(expect.objectContaining(preferenceDto)); // Check if the result contains the expected values
        });
    });
});
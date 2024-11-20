/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UserPreferencesService } from '../user-preferences/user-preferences.service';

describe('User PreferencesService', () => {
    let service: UserPreferencesService;
    let mockUserPreferenceModel: any;

    beforeEach(async () => {
        mockUserPreferenceModel = {
            // Mock the methods that you will use in your service
            save: jest.fn().mockResolvedValue({}),
            // Add other methods if necessary
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserPreferencesService,
                {
                    provide: getModelToken('UserPreference'), // Ensure this matches your model name
                    useValue: mockUserPreferenceModel,
                },
            ],
        }).compile();

        service = module.get<UserPreferencesService>(UserPreferencesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Add more tests as necessary
});
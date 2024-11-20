/* eslint-disable prettier/prettier */
import { IsEmail,IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateUserPreferenceDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsObject()
    preferences: {
        marketing: boolean;
        newsletter: boolean;
        updates: boolean;
        frequency: 'daily' | 'weekly' | 'monthly' | 'never';
        channels: {
            email: boolean;
            sms: boolean;
            push: boolean;
        };
    };

    @IsNotEmpty()
    @IsString()
    timezone: string;
    lastUpdated?: Date; // Optional for creation
    createdAt?: Date;   // Optional for creation
}
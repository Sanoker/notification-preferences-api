/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserPreferenceDocument = UserPreference & Document;

export enum Frequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  NEVER = 'never',
}

@Schema()
export class UserPreference {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, match: /.+\@.+\..+/ }) // Simple email format validation
  email: string;

  @Prop({ type: Object, required: true })
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    frequency: Frequency; // Use enum for frequency
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };

  @Prop({ required: true })
  timezone: string;

  @Prop({ default: Date.now, type: Date }) // Explicitly set type
  lastUpdated: Date;

  @Prop({ default: Date.now, type: Date }) // Explicitly set type
  createdAt: Date;
}

// Create the schema
export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference);

// Middleware to update lastUpdated on every save
UserPreferenceSchema.pre<UserPreferenceDocument>('save', function (next) {
  this.lastUpdated = new Date();
  next();
});
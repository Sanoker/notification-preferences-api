/* eslint-disable prettier/prettier */
// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreference, UserPreferenceSchema } from './models/user-preference.model';
import { NotificationLog, NotificationLogSchema } from './models/notification-log.model';
import { UserPreferencesService } from './user-preferences/user-preferences.service';
import { UserPreferencesController } from './user-preferences/user-preferences.controller';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/your_database_name'), // Update with your MongoDB URI
        MongooseModule.forFeature([{ name: UserPreference.name, schema: UserPreferenceSchema }]),
        MongooseModule.forFeature([{ name: NotificationLog.name, schema: NotificationLogSchema }]),
    ],
    providers: [UserPreferencesService],
    controllers: [UserPreferencesController],
})
export class AppModule {}
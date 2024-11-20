/* eslint-disable prettier/prettier */
// src/models/notification-log.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NotificationLog extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    type: 'marketing' | 'newsletter' | 'updates';

    @Prop({ required: true })
    channel: 'email' | 'sms' | 'push';

    @Prop({ required: true })
    status: 'pending' | 'sent' | 'failed';

    @Prop()
    sentAt?: Date;

    @Prop()
    failureReason?: string;

    @Prop({ type: Object, required: true })
    metadata: Record<string, any>;
}

export const NotificationLogSchema = SchemaFactory.createForClass(NotificationLog);
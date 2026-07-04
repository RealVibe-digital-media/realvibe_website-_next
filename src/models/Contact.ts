import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
    name: string;
    mobile: string;
    service: string;
    message: string;
    createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

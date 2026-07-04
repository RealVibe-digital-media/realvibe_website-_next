import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
    name: string;
    slug: string;
    logo: string;
    type: 'Developer' | 'Broker';
    priority: number;
    createdAt: Date;
}

const ClientSchema = new Schema<IClient>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    type: { type: String, enum: ['Developer', 'Broker'], default: 'Developer' },
    priority: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Client;
}

export default mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);

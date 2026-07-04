import mongoose, { Schema, Document } from 'mongoose';

export interface ISubProject extends Document {
    name: string;
    slug: string;
    clientId: mongoose.Types.ObjectId;
    thumbnail?: string;
    description?: string;
    videoUrl?: string;
    priority: number;
    createdAt: Date;
}

const SubProjectSchema = new Schema<ISubProject>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    thumbnail: { type: String, default: '' },
    description: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    priority: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// Force model delete in development to apply schema changes
if (process.env.NODE_ENV === 'development' && mongoose.models.SubProject) {
    delete mongoose.models.SubProject;
}

export default mongoose.models.SubProject || mongoose.model<ISubProject>('SubProject', SubProjectSchema);

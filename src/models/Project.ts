import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    title: string;
    category: string;
    image: string;
    tags: string[];
    link?: string;
    clientId?: mongoose.Types.ObjectId;
    subProjectId?: mongoose.Types.ObjectId;
    client?: {
        name: string;
        logo: string;
    };
    priority: number;
    createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    link: { type: String },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    subProjectId: { type: Schema.Types.ObjectId, ref: 'SubProject' },
    client: {
        name: { type: String },
        logo: { type: String }
    },
    priority: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// During development, Next.js hot reloading can keep old models cached.
// This ensures we always use the latest schema.
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Project;
}

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    id: string;
    name: string;
    priority: number;
}

const CategorySchema = new Schema<ICategory>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    priority: { type: Number, default: 0 }
});

if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Category;
}

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface IAlert extends Document {
    user: mongoose.Types.ObjectId;
    symbol: string;
    price: number;
    direction: 'above' | 'below';
    executed: boolean;
}

const AlertSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    direction: { type: String, enum: ['above', 'below'], required: true },
    executed: { type: Boolean, default: false },
});

export default mongoose.model<IAlert>('Alert', AlertSchema);

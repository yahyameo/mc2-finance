import { Schema, model, Document } from 'mongoose';

interface IWatchlist extends Document {
  user: Schema.Types.ObjectId;
  symbols: string[];
}

const watchlistSchema = new Schema<IWatchlist>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  symbols: { type: [String], required: true },
});

const Watchlist = model<IWatchlist>('Watchlist', watchlistSchema);
export default Watchlist;

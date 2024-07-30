import { Request, Response } from 'express';
import Watchlist from '../models/Watchlist';
import { calculateTechnicalIndicator } from '../utils/calculateTechnicalIndicator';

export const getWatchlist = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const watchlist = await Watchlist.findOne({ user: userId });

  if (!watchlist) return res.status(404).send('Watchlist not found.');
  res.send(watchlist);
};

export const addToWatchlist = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { symbol } = req.body;

  let watchlist = await Watchlist.findOne({ user: userId });
  if (!watchlist) {
    watchlist = new Watchlist({ user: userId, symbols: [symbol] });
  } else {
    watchlist.symbols.push(symbol);
  }

  await watchlist.save();
  const technicalIndicator = await calculateTechnicalIndicator(symbol);
  res.send({ watchlist, technicalIndicator });
};

export const removeFromWatchlist = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { symbol } = req.body;

  const watchlist = await Watchlist.findOne({ user: userId });
  if (!watchlist) return res.status(404).send('Watchlist not found.');

  watchlist.symbols = watchlist.symbols.filter(s => s !== symbol);
  await watchlist.save();

  res.send(watchlist);
};

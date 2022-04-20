import { Model } from '../objects/model';
import { Merchant } from './merchant';

export class Reward extends Model<Reward> {
  merchant: Merchant;
  name: string;
  image?: string;
  description?: string;
  type: 'Cashback' | 'Raffle' | 'Gift';
  typeData?: any; //CashbackReward | GiftReward;
}

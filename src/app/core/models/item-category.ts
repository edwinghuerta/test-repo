import { Model } from '../objects/model';

export class ItemCategory extends Model<ItemCategory> {
  name: string;
  description?: string;
}

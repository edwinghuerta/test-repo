import { Model } from '../objects/model';
import { User } from './user';

export class Merchant extends Model<Merchant> {
  owner?: User;
  name: string;
  email?: string;
  image?: string;
  bio?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  location?: { lat: number; long: number };
  activity: string;
}

export class EmployeeContract extends Model<EmployeeContract> {
  merchant: Merchant;
  user: User;
  role: string;
}

import { Model } from '../objects/model';
import { Merchant } from './merchant';

export class Gift extends Model<Gift> {
    name: string;
    user: string;
    description: string;
    ammount: number;
    isFree: boolean;
    maxAvailability: number;
    merchant: Merchant;
    calendar: any;
    startDate: Date;
    expirationDate: Date;
    maxUsers: number;
    reservations: Object;
    fixedCollaboration: number;
    percentageCollaboration: number;
    fixedReferralCollaboration: number;
    timeChunkSize: number;
    restrictions:string[]
}
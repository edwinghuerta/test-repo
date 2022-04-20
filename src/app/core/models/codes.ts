import { Model } from '../objects/model';
import { IpUser, User } from './user';

export class CommunityCategory extends Model<CommunityCategory> {
    name: string;
}

export class Code extends Model<Code> {
    description?: string;
    reference?: string;
    keyword: string;
    link: string;
    qrColor: string;
    image: string;
    user?: User;
    category?: CommunityCategory
    status?: boolean;
    ipUser?: IpUser
}

export class CodeInput {
    description?: string;
    user?: string;
    keyword: string;
    link?: string;
    qrColor?: string;
    image?: File;
    model?: string;
    referenceId?: string;
    category?: string;
    quantity?: number;
}
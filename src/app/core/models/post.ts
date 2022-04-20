import { Model } from '../objects/model';
import { IpUser, User } from './user';

export class SocialMediaModel {
    name: string;
    url: string;
}

export class SocialMediaModelInput {
    name?: string;
    url: string;
}

export class Target extends Model<Target> {
    emailOrPhone: string
    name: string
}

export class TargetInput {
    emailOrPhone: string
    name: string
}

export class IlustrationInput {
    name: string;
    type: number;
    line1: string;
    line2: string;
    showDecoration: boolean
    background: string;
    backgroundTextType: number;
    borderRadius: boolean
    text: string;
}

export class SlideInput {
    media: File;
    ilustration: IlustrationInput
    text: string;
    index: number;
}

export class Post extends Model<Post> {
    socialNetworks: SocialMediaModel[];
    to: string;
    title: string;
    author: User
    from: string;
    headline: string;
    headlineBackground: string;
    occasion: string;
    message: string;
    targets: Target[];
    privateMessage: string;
    multimedia: string[];
    password: string;
    active: Boolean
    address: string;
    type: string;
    validatedAt: Date
    ipUser: IpUser
}

export class PostInput {
    socialNetworks?: SocialMediaModelInput[];
    to?: string;
    title?: string;
    from?: string;
    headline?: string;
    headlineBackground?: string;
    author?: string;
    message?: string;
    occasion?: string;
    targets?: TargetInput[];
    slides?: SlideInput[];
    privateMessage?: string;
    multimedia?: File[];
    address?: string;
    expiration?: string;
    password?: string;
    type?: string;
}
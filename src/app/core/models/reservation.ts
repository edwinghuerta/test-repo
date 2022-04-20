import { Model } from "../objects/model"
import { Merchant } from "./merchant";
import { User } from "./user";

export class DateModel {
    dateType: string;
    from: string;
    in: string;
    until: string;
    fromDay: string;
    inDays: string[];
    toDay: string;
    fromHour: string;
    toHour: string;
}

export class DateModelInput {
    dateType: string;
    from: Date | string;
    in: Date;
    until: Date | string;
    fromDay: string;
    inDays: string[];
    toDay: string;
    fromHour: string;
    toHour: string;
}

export class ReservationList {
    date: DateModel;
    reservation: string[];
}

export class CalendarRules {
    date: DateModel;
    expired: boolean;
}

export class Calendar extends Model<Calendar> {
    name: string;
    reservationLimits: number;
    timeChunkSize: number;
    merchant: Merchant;
    active: boolean;
    limits: DateModel
    breakTime: number;
    expirationTime: number;
    reservations: ReservationList[];
    rules: CalendarRules[];
}

export class Reservation extends Model<Reservation> {
    calendar: Calendar
    user: User
    merchant: User
    date: DateModel
    expiration: string;
    type: string;
    status: string;
    breakTime: number;
}

export class ReservationInput {
    calendar: string;
    merchant: string;
    type: string;
    date: DateModelInput;
    breakTime: number;
}
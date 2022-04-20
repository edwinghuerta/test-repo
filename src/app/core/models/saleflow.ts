import { Model } from '../objects/model';
import { Customizer } from './customizer';
import { Item, ItemCategory, ItemPackage } from './item';
import { Merchant } from './merchant';

export class DeliveryLocation {
  _id?: string;
  googleMapsURL?: string;
  city: string;
  street: string;
  houseNumber: string;
  referencePoint?: string;
  nickName: string;
  note: string;
}
export class DeliveryLocationInput {
  city?: string;
  street?: string;
  houseNumber?: string;
  note?: string;
  referencePoint?: string;
  nickName?: string;
  googleMapsURL?: string;
}

export class ModuleConfig {
  isActive: boolean;
  calendar: any;
  post: boolean;
  deliveryLocation: boolean;
  pickUpLocations: DeliveryLocation[];
  moduleOrder: number;
  paymentModule: any;
}

export class SaleFlowModule extends Model<SaleFlowModule> {
  saleflow?: SaleFlow;
  appointment?: ModuleConfig;
  post?: ModuleConfig;
  delivery?: ModuleConfig;
  merchant?: Merchant;
  paymentMethod?: ModuleConfig;
}

export class SocialMediaModel {
  name?: string;
  url?: string;
}

export class SaleFlowItem extends Model<SaleFlowItem> {
  item?: Item;
  customizer?: Customizer;
}

export class ItemPackageRule extends Model<ItemPackageRule> {
  item?: Item;
  onlyFixedQuantity?: boolean;
  fixedQuantity?: number;
  hasMaxQuantity?: boolean;
  maxQuantity?: number;
  hasMinQuantity?: boolean;
  minQuantity?: number;
  offsetPrice?: number;
}

export class SaleFlow extends Model<SaleFlow> {
  name?: string;
  headline?: string;
  subheadline?: string;
  addressExtraInfo?: string;
  workingHours?: string;
  paymentInfo?: string;
  social?: SocialMediaModel[];
  merchant?: Merchant;
  banner?: string;
  module?: SaleFlowModule;
  items?: SaleFlowItem[];
  packages?: ItemPackage[];
  itemNickname?: string;
  packageNickname?: string;
  canBuyMultipleItems?: boolean;
}

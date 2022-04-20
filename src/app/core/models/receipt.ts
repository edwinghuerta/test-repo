import { fixnumber } from '../helpers/strings.helpers';
import { Model } from '../objects/model';
import { CardData } from './../../shared/components/card/card.component';
import { Community } from './community';
import { Merchant } from './merchant';

export class Receipt extends Model<Receipt> {
  code: string;
  merchant?: Merchant;
  community?: Community;
  subtotal: number;
  total: number;
  items: any[] = [];
  kindcode?: string;
  collected?: boolean;
  userProfit?: number;
  communityProfit?: number;

  toCard(as?: string): CardData {
    if (as === 'as-user')
      return {
        title: `Earning of receipt: ${this.code}`,
        content: `
          <b>In merchant:</b> ${this.merchant?.name || 'n/a'}
          <br/>
          <b>To community:</b> ${this.community?.name || 'n/a'}
          <br/>
        `,
        accent: {
          content: `<span> $${fixnumber(this.userProfit || 0)} </span>`,
        },
        metadata: {
          collected: this.collected,
          recordId: this._id,
        },
      };

    if (as === 'as-partner')
      return {
        title: `Receipt: ${this.code}`,
        content: `
          <b>Community:</b> ${this.community?.name || 'n/a'}
          <br/>
          <b>Status:</b> ${this.collected ? 'Paid' : 'to pay'}
          <br/>
        `,
        accent: {
          content: `
            <span> $${fixnumber(this.communityProfit || 0)} </span>
            <span class="text-small no-print text-nowrap">
              ${this.collected ? 'paid' : 'to pay'}
            </span>
          `,
          color: this.collected ? 'gray' : 'primary',
        },
        metadata: {
          collected: this.collected,
          recordId: this._id,
        },
      };

    return {
      title: `Receipt: ${this.code}`,
      content: `
        <b>Merchant:</b> ${this.merchant?.name || 'n/a'}
        <br/>
        <b>Status:</b> ${this.collected ? 'Collected' : 'No Collected'}
        <br/>
      `,
      accent: {
        content: `
          <span> $${fixnumber(this.communityProfit || 0)} </span>
          <span class="text-small no-print text-nowrap">
            ${this.collected ? 'collected' : 'to collect'}
          </span>
        `,
        color: this.collected ? 'success' : 'danger',
        emit: true,
      },
      metadata: {
        collected: this.collected,
        recordId: this._id,
      },
    };
  }
}

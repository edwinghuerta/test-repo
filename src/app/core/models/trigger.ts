import { CardData } from './../../shared/components/card/card.component';
import { Receipt } from './receipt';
import { Model } from '../objects/model';
import * as moment from 'moment';

export class Trigger extends Model<Trigger> {
  image: string;
  kindcode?: string;
  result?: Receipt;

  get status() {
    return this.result ? 'Accepted' : 'Pending';
  }

  toCard(): CardData {
    const { _id, image, kindcode, status, result } = this;
    return {
      image,
      title: `Trigger ${moment(this.createdAt).format('YYYY/MM/DD HH:mm:ss')}`,
      content: `
        Trigger ${status}
        ${kindcode ? 'for community with kindcode: ' + kindcode : ''}
      `,
      // accent: {
      //   text: `${result ? '$' + (result.subtotal || 0) : '--'}`,
      //   color: result ? 'success' : 'gray',
      // },
      metadata: {
        recordId: _id,
      },
    };
  }
}

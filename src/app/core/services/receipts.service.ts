import { Injectable } from '@angular/core';

import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import { ListParams } from '../types/general.types';
import {
  receiptsByCommunity,
  setReceiptCollect,
  receiptsByUser,
  receiptsByPartner,
} from './../graphql/receipts.gql';
import { Receipt } from './../models/receipt';

@Injectable({ providedIn: 'root' })
export class ReceiptsService {
  constructor(private graphql: GraphQLWrapper) {}

  async receiptsByCommunity(
    community: string,
    params?: ListParams
  ): Promise<Receipt[]> {
    const { receiptsByCommunity: result } = await this.graphql.query({
      query: receiptsByCommunity,
      variables: { community, params },
      fetchPolicy: 'no-cache',
    });
    return result.map((r: any) => new Receipt(r));
  }

  async receiptsByPartner(
    partner: string,
    params?: ListParams
  ): Promise<Receipt[]> {
    const { receiptsByPartner: result } = await this.graphql.query({
      query: receiptsByPartner,
      variables: { partner, params },
      fetchPolicy: 'no-cache',
    });
    return result.map((r: any) => new Receipt(r));
  }

  async receiptsByUser(
    userId?: string,
    params?: ListParams
  ): Promise<Receipt[]> {
    const { receiptsByUser: result } = await this.graphql.query({
      query: receiptsByUser,
      variables: { userId, params },
      fetchPolicy: 'no-cache',
    });
    return result.map((r: any) => new Receipt(r));
  }

  async setReceiptCollect(id: string, value: boolean): Promise<Receipt> {
    const { setReceiptCollect: result = [] } = await this.graphql.mutate({
      mutation: setReceiptCollect,
      variables: { id, value },
      fetchPolicy: 'no-cache',
    });
    return new Receipt(result);
  }

  async markCollect(ids: string[], value: boolean) {
    return await Promise.all(
      ids.map((id) => this.setReceiptCollect(id, value))
    );
  }
}

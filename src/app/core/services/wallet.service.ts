import { Injectable } from '@angular/core';
import { float } from '@zxing/library/esm/customTypings';
import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import { ExchangeData, PaymentReceiver } from '../models/wallet';
import { ListParams } from '../types/general.types';
import { AppService } from './../../app.service';
import {
  globalWallet,
  transactionsByGlobalWallet,
  createExchangeData,
  requestByUserAndStatus,
  request,
  makeTransaction,
  payKanddys,
  createRequest,
  transaction,
  hotTransactionsByGlobalWallet,
  hotRequestByUserAndStatus,
  exchangeDataByUser,
  updateExchangeData,
  paymentReceivers,
  paymentReceiverByName,
  exchangedata,
  paymentreceiver
} from './../graphql/wallet.gql';
import { Community } from './../models/community';
import { User } from './../models/user';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private graphql: GraphQLWrapper, private app: AppService) { }

  public async globalWallet() {
    const response = await this.graphql.query({
      query: globalWallet,
      fetchPolicy: 'no-cache',
    });
    return response
  }

  async transactionsByGlobalWallet(isHot?: boolean) {
    if (isHot) {
      try {
        console.log("caliente ee");
        const response = await this.graphql.query({
          query: hotTransactionsByGlobalWallet,
          fetchPolicy: 'no-cache',
        });
        return response;
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await this.graphql.query({
          query: transactionsByGlobalWallet,
          fetchPolicy: 'no-cache',
        });
        return response;
      } catch (e) {
        console.log(e);
      }
    }
  }

  async exchangedata(id: string): Promise<{ ExchangeData: ExchangeData }>{
    try {
      const response = await this.graphql.query({
        query: exchangedata,
        variables: { id },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async paymentReceiver(id: string): Promise<{ PaymentReceiver: PaymentReceiver }>{
    try {
      const response = await this.graphql.query({
        query: paymentreceiver,
        variables: { id },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }


  async exchangeDataByUser(userId: any) {
    try {
      const response = await this.graphql.query({
        query: exchangeDataByUser,
        variables: { userId },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async createExchangeData(input: any) {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: createExchangeData,
      variables: { input },
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

  async updateExchangeData(input: any, id:any) {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: updateExchangeData,
      variables: { input, id },
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

  async paymentReceivers(params: any) {
    try {
      const response = await this.graphql.query({
        query: paymentReceivers,
        variables: { params },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async paymentReceiverByName(name: string) {
    try {
      const response = await this.graphql.query({
        query:  paymentReceiverByName,
        variables: { name },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async requestByUserAndStatus(status: String, isHot?: boolean) {
    console.log(status);
    if (isHot) {
      const result = await this.graphql.query({
        query: hotRequestByUserAndStatus,
        variables: { status },
        fetchPolicy: 'no-cache',
      });
      return result;
    } else {
      const result = await this.graphql.query({
        query: requestByUserAndStatus,
        variables: { status },
        fetchPolicy: 'no-cache',
      });
      return result;
    }
  }

  async request(id: any) {
    console.log(id);
    const result = await this.graphql.query({
      query: request,
      variables: { id },
      fetchPolicy: 'no-cache',
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

  async makeTransaction(amount: float, emailOrPhoneDestiny: String) {
    console.log(amount, emailOrPhoneDestiny);
    const result = await this.graphql.mutate({
      mutation: makeTransaction,
      variables: { amount, emailOrPhoneDestiny },
      fetchPolicy: 'no-cache',
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

  async payKanddys(amountKanddys) {
    console.log(amountKanddys);
    const result = await this.graphql.mutate({
      mutation: payKanddys,
      variables: { amountKanddys },
      fetchPolicy: 'no-cache',
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

  async createRequest(input: any) {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: createRequest,
      variables: { input },
      fetchPolicy: 'no-cache',
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

  async transaction(transactionID: any) {
    console.log(transactionID);
    const result = await this.graphql.query({
      query: transaction,
      variables: { transactionID },
      fetchPolicy: 'no-cache',
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }
}
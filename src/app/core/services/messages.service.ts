import { Injectable } from '@angular/core';
import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import { AppService } from './../../app.service';
import {
  dummyOrderById,
  createDummyOrder,
  updateDummyOrder,
  dummyOrdersByUser
} from './../graphql/messages.gql';


@Injectable({ providedIn: 'root' })
export class MessagesService {
  constructor(private graphql: GraphQLWrapper, private app: AppService) {}

  async dummyOrderById(dummyOrderId: any) {
    try {
      const response = await this.graphql.query({
        query: dummyOrderById,
        variables: { dummyOrderId },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }



  async createDummyOrder(input?: any, clientPhone?: string) {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: createDummyOrder,
      variables: { input, clientPhone },
      fetchPolicy: 'no-cache'
    });

    if (!result || result?.errors) return undefined;

    console.log(result);
    return result;
  }

  async updateDummyOrder(input?: any, id?: any) {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: updateDummyOrder,
      variables: { input, id },
      fetchPolicy: 'no-cache'
    });

    if (!result || result?.errors) return undefined;

    console.log(result);
    return result;
  }


  async dummyOrderByUser(userId: any) {
    try {
      const response = await this.graphql.query({
        query: dummyOrdersByUser,
        variables: { userId },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  
}

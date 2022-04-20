import { Injectable } from '@angular/core';

import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import { ListParams } from '../types/general.types';
import { merchant, myMerchants, merchants } from '../graphql/merchants.gql';
import { Merchant } from '../models/merchant';
import { User } from '../models/user';
import { users, user } from '../graphql/users.gql';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private graphql: GraphQLWrapper) {}

  async users(params: ListParams = {}): Promise<any> {
    let result = await this.graphql.query({
      query: users,
      variables: { params },
      fetchPolicy: 'no-cache',
    });
    return result;
  }

  async user(id) {
    console.log('id', id);
    let value = await this.graphql.query({
      query: user,
      variables: { userId: id },
      fetchPolicy: 'no-cache',
    });
    return value;
  }
}

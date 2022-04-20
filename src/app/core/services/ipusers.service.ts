import { Injectable } from '@angular/core';
import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import {IpUserbyIp, createIpUser} from '../graphql/ipusers.gql'

@Injectable({
  providedIn: 'root'
})
export class IpusersService {

  constructor(private graphql: GraphQLWrapper) { }

  async IpUserbyIp(ip: string) {
    try {
      const response = await this.graphql.query({
        query: IpUserbyIp,
        variables: { ip },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async createIpUser(input: any) {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: createIpUser,
      variables: { input },
    });

    if (!result || result?.errors) return undefined;
    console.log(result);
    return result;
  }
}

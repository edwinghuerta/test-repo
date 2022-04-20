import { createPartner } from './../graphql/partner.gql';
import { Injectable } from '@angular/core';

import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import { communityPartners } from '../graphql/partner.gql';
import { Partner } from '../models/partner';
import { ListParams } from '../types/general.types';

@Injectable({ providedIn: 'root' })
export class PartnersService {
  constructor(private graphql: GraphQLWrapper) {}

  async create(input: any, merchantInput: any) {
    const { createPartner: result } = await this.graphql.mutate({
      mutation: createPartner,
      variables: { input, merchantInput },
    });
    return new Partner(result);
  }

  async communityPartners(
    community: string,
    params?: ListParams
  ): Promise<Partner[]> {
    const { communityPartners: result } = await this.graphql.query({
      query: communityPartners,
      variables: { community, params },
      fetchPolicy: 'no-cache',
    });
    return result.map((r: any) => new Partner(r));
  }
}

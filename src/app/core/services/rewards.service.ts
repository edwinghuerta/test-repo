import { Injectable } from '@angular/core';

import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import { reward, rewards } from '../graphql/rewards.gql';
import { Reward } from '../models/reward';
import { ListParams } from '../types/general.types';

@Injectable({ providedIn: 'root' })
export class RewardsService {
  constructor(private graphql: GraphQLWrapper) {}

  async reward(id: string): Promise<Reward> {
    const { reward: result } = await this.graphql.query({
      query: reward,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
    return new Reward(result);
  }

  async rewards(
    merchantId: string,
    params: ListParams = {}
  ): Promise<Reward[]> {
    const { rewards: result = [] } = await this.graphql.query({
      query: rewards,
      variables: { params, merchantId },
      fetchPolicy: 'no-cache',
    });
    return (result || []).map((r: any) => new Reward(r));
  }
}

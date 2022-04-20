import { Injectable } from '@angular/core';

import { Trigger } from '../models/trigger';
import { GraphQLWrapper } from './../graphql/graphql-wrapper.service';
import { makeTrigger, myTriggers } from './../graphql/triggers.gql';
import { ListParams } from './../types/general.types';

@Injectable({
  providedIn: 'root',
})
export class TriggersService {
  constructor(private graphql: GraphQLWrapper) {}

  async myTriggers(params: ListParams = {}): Promise<Trigger[]> {
    const { myTriggers: result = [] } = await this.graphql.query({
      query: myTriggers,
      variables: { params },
      fetchPolicy: 'no-cache',
    });
    return (result || []).map((r: any) => new Trigger(r));
  }

  async makeTrigger(image: File): Promise<Trigger> {
    const { makeTrigger: result } = await this.graphql.mutate({
      mutation: makeTrigger,
      variables: { image },
      context: { useMultipart: true },
    });
    return new Trigger(result);
  }
}

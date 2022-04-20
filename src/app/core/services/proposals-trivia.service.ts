import { Injectable } from '@angular/core';
import { proposals, createVote } from './../graphql/proposals-trivia.gql';
import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';

@Injectable({
  providedIn: 'root',
})
export class ProposalsTriviaService {
  constructor(private graphql: GraphQLWrapper) {}

  proposals(params);

  async proposals(params = {}) {
    try {
      const response = await this.graphql.query({
        query: proposals,
        variables: { params },
        fetchPolicy: 'no-cache',
      });
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async createVote(input: any, proposalId: string) {
    try {
      const result = this.graphql.mutate({
        mutation: createVote,
        variables: { input, proposalId },
        fetchPolicy: 'no-cache',
      });

      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

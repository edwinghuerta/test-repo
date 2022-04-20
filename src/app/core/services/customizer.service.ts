import { Injectable } from '@angular/core';
import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import { getCustomizer, createCustomizer, updateCustomizer } from '../graphql/customizer.gql';
import { Customizer, CustomizerInput } from '../models/customizer';

@Injectable({
  providedIn: 'root'
})
export class CustomizerService {
  constructor(private graphql: GraphQLWrapper) { }

  async getCustomizer(id: string): Promise<Customizer> {
    try {
      const result = await this.graphql.query({
        query: getCustomizer,
        variables: { id },
        fetchPolicy: 'no-cache',
      });
      return result.getCustomizer;
    } catch (e) { 
      console.log(e);
    } 
  }

  async createCustomizer(input: CustomizerInput): Promise<string> {
    console.log(input);
    try {
      let value = await this.graphql.mutate({
        mutation: createCustomizer,
        variables: { input },
        fetchPolicy: 'no-cache',
        context: { useMultipart: true },
      });
      return value.createCustomizer._id;
    } catch (e) { 
      console.log(e);
    } 
  }

  async updateCustomizer(input: CustomizerInput, id: string): Promise<string> {
    try {
      let value = await this.graphql.mutate({
        mutation: updateCustomizer,
        variables: { input, id },
        fetchPolicy: 'no-cache',
        context: { useMultipart: true },
      });
      return value.updateCustomizer._id;
    } catch (e) { 
      console.log(e);
    } 
  }
}

import { Injectable } from '@angular/core';
import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import {
  createSynologySession,
  verifySynologyAuth,
  createSynologyDirectory,
  getImagesFromSynologyDirectory,
  setSelectedImageSynology,
  synologyDirectoryByOrder
} from './../graphql/synology.gql';

@Injectable({
  providedIn: 'root'
})
export class SynologyService {

  constructor(
    private graphql: GraphQLWrapper,
  ) { }

  async createExchangeData(input: any) {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: createSynologySession,
      variables: { input },
    });

    if (!result || result?.errors) return undefined;

    console.log(result);
    return result;
  }

  async synologyDirectoryByOrder(orderId: String) {
    console.log(orderId);
    const result = await this.graphql.query({
      query: synologyDirectoryByOrder,
      variables: { orderId },
    });

    if (!result || result?.errors) return undefined;

    console.log(result);
    return result;
  }


  async verifySynologyAuth(mode: String, idMerchant: String) {
    console.log(mode, idMerchant);
    const result = await this.graphql.mutate({
      mutation: verifySynologyAuth,
      variables: { mode, idMerchant },
    });

    if (!result || result?.errors) return undefined;

    console.log(result);
    return result;
  }

  async createSynologyDirectory(input: any) {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: createSynologyDirectory,
      variables: { input },
    });

    if (!result || result?.errors) return undefined;

    console.log(result);
    return result;
  }

  async setSelectedImageSynology(itemSubOrderId, synologyDirectoryId, input: any) {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: setSelectedImageSynology,
      variables: { itemSubOrderId, synologyDirectoryId, input },
    });

    if (!result || result?.errors) return undefined;

    console.log(result);
    return result;
  }

  async getImagesFromSynologyDirectory(isSelected: Boolean = false, synologyDirectoryId: string) {
    console.log(isSelected, synologyDirectoryId);
    const result = await this.graphql.query({
      query: getImagesFromSynologyDirectory,
      variables: { isSelected, synologyDirectoryId },
    });

    if (!result || result?.errors) return undefined;

    console.log(result);
    return result;
  }
}

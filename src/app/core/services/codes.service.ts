import { Injectable } from '@angular/core';
import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import { Code, CodeInput } from '../models/codes';
import { ListParams } from '../types/general.types';
import { AppService } from './../../app.service';
import {
  checkCodeKeyword,
  generateCodes,
  createCode,
  publicCodes,
  codesByUser,
  hotCodesByUser,
  hotPublicCodes,
  updateCode,
  searchCodesByKeywords,
  CodeSearchByKeyword,
  codeByKeyword,
  CodesByUserId,
} from './../graphql/codes.gql';
import { Community } from './../models/community';
import { User } from './../models/user';

@Injectable({ providedIn: 'root' })
export class CodesService {
  constructor(private graphql: GraphQLWrapper, private app: AppService) {}

  async generateCode(input: CodeInput): Promise<{ generateCodes: Code[] }> {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: generateCodes,
      variables: { input },
      context: { useMultipart: true },
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

  async createCode(input: CodeInput): Promise<Code[]> {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: createCode,
      variables: { input },
      context: { useMultipart: true },
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

  async updateCode(input: any, id: string) {
    console.log(input);
    const result = await this.graphql.mutate({
      mutation: updateCode,
      variables: { input, id },
      context: { useMultipart: true },
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

  async checkCode(keyword: string) {
    try {
      const response = await this.graphql.query({
        query: checkCodeKeyword,
        variables: { keyword },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async getCodesByKeyword(keyword: string): Promise<Code[]> {
    try {
      const response = await this.graphql.query({
        query: searchCodesByKeywords,
        variables: { keyword },
        fetchPolicy: 'no-cache',
      });
      return response.searchCodesByKeywords;
    } catch (e) {
      console.log(e);
    }
  }

  async codeByKeyword(keyword: string) {
    try {
      const response = await this.graphql.query({
        query: codeByKeyword,
        variables: { keyword },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async CodeSearchByKeyword(keyword: string) {
    try {
      const response = await this.graphql.query({
        query: CodeSearchByKeyword,
        variables: { keyword },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async publicCodes(params: any, isHot?: boolean) {
    if (isHot) {
      try {
        const response = await this.graphql.query({
          query: hotPublicCodes,
          variables: { params },
          fetchPolicy: 'no-cache',
        });
        return response;
      } catch (e) {}
    } else {
      try {
        const response = await this.graphql.query({
          query: publicCodes,
          variables: { params },
          fetchPolicy: 'no-cache',
        });
        return response;
      } catch (e) {}
    }
  }

  async codesByUser(isHot?: boolean): Promise<{ codesByCurrentUser: Code[] }> {
    if (isHot) {
      const response = await this.graphql.query({
        query: hotCodesByUser,
        fetchPolicy: 'no-cache',
      });
      return response;
    } else {
      const response = await this.graphql.query({
        query: codesByUser,
        fetchPolicy: 'no-cache',
      });
      return response;
    }
  }

  async CodesByUserId(userId: string) {
    try {
      const response = await this.graphql.query({
        query: CodesByUserId,
        variables: { userId },
        fetchPolicy: 'no-cache',
      });
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
}

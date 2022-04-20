import { Injectable } from '@angular/core';
import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import { AppService } from './../../app.service';
import {
    addMark,
    bookmarkByUser,
    removeMark
} from './../graphql/bookmarks.gql';
import { User } from './../models/user';


@Injectable({ providedIn: 'root' })
export class BookmarksService {
  constructor(private graphql: GraphQLWrapper, private app: AppService) {}

  async addMark(id, type) {
    console.log(id, type);
    const result = await this.graphql.mutate({
      mutation: addMark,
      variables: { input:{
        reference: id,
        markType: type
      } },
      optimisticResponse: {
        __typename: "Mutation",
        addMark:{
          createdAt: new Date(),
          __typename: "BookMark",
          _id: id,
            code :{
              _id: id,
              __typename: "Code"
            },
            post: null,
            gift:null,
            own: true,
            refBookmark: null,
        }
      }
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

  async removeMark(id) {
    console.log(id);
    
    const result = await this.graphql.mutate({
      mutation: removeMark,
      variables: { input: id },
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

  async bookmarkByUser(){
      const response = await this.graphql.query({
        query: bookmarkByUser,
        fetchPolicy: 'no-cache',
      });
      return response;
  }
}

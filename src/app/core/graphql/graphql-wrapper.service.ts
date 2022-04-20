import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MutationOptions, QueryOptions } from 'apollo-client';

@Injectable({
  providedIn: 'root',
})
export class GraphQLWrapper {
  constructor(private readonly apollo: Apollo) {}

  public async mutate(options: MutationOptions): Promise<any> {
    let result: any;
    try {
      const { data, errors } = await this.apollo.mutate(options).toPromise();
      if (errors) throw errors;
      result = data;
    } catch (e) {
      console.error(e);
      throw Error(e);
    }
    return result;
  }

  public async query(options: QueryOptions): Promise<any> {
    let result: any;
    try {
      const { data, errors } = await this.apollo.query(options).toPromise();
      if (errors) throw errors;
      result = data;
    } catch (e) {
      console.error(e);
    }
    return result;
  }

  // public async watch(
  //   options: QueryOptions,
  //   onChange: (result: ApolloQueryResult<any>) => void = () => {}
  // ) {
  //   const watcher = this.apollo.watchQuery(options);
  //   const subscription = watcher.valueChanges.subscribe((value) => {
  //     onChange(value);
  //   });
  //   const firstResult = await watcher.result();
  //   return { watcher, subscription, firstResult };
  // }
}

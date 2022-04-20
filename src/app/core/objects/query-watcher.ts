// import { Subscription } from 'rxjs';
// import { QueryRef } from 'apollo-angular';

// export class QueryWatcher<T> {
//   private lastData: T;
//   private subscription: Subscription;

//   constructor(private query: QueryRef<any>) {
//     this.subscription = this.query.valueChanges.subscribe((result) => {
//       const { data, errors } = result;
//       if (!errors) this.lastData = data;
//     });
//   }

//   get data(): T {
//     return this.lastData;
//   }

//   async reload(variables: Record<string, any> = {}): Promise<any> {
//     const { data, errors } = await this.query.refetch(variables);
//     try {
//       if (errors) throw errors;
//       return data;
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   kill() {
//     this.subscription.unsubscribe();
//   }
// }

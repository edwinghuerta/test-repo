import { Injectable } from '@angular/core';
import { float } from '@zxing/library/esm/customTypings';
import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import { ListParams } from '../types/general.types';
import { AppService } from './../../app.service';
import {
    scanOCR
} from './../graphql/ocr.gql';

@Injectable({ providedIn: 'root' })
export class OcrService {
  constructor(private graphql: GraphQLWrapper, private app: AppService) { }

  async scanOCR(image: any, platform, merchant) {
    console.log(image, platform, merchant);
    const result = await this.graphql.mutate({
      mutation: scanOCR,
      variables: { image, platform, merchant },
      context: { useMultipart: true }
    });

    if (!result || result?.errors) return undefined;

    this.app.events.emit({ type: 'reload' });
    console.log(result);
    return result;
  }

}
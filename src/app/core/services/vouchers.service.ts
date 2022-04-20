import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GraphQLWrapper } from '../graphql/graphql-wrapper.service';
import {
  gift,
  vouchersByUser,
  voucherByGift,
  getVoucher as getVoucherGqlQuery,
} from '../graphql/vouchers.gql';
import { Voucher } from '../models/vouchers';

@Injectable({
  providedIn: 'root',
})
export class VouchersService {
  public voucherSelected: any = {};
  public kanddySelected: any = {};
  url = environment.APIREST;
  constructor(private graphql: GraphQLWrapper, private http: HttpClient) {}

  async gift(giftId) {
    let value = await this.graphql.query({
      query: gift,
      variables: { giftId },
      fetchPolicy: 'no-cache',
    });
    return value;
  }

  async vouchersByUser(params: any): Promise<{vouchersByUser: Voucher[]}> {
    try {
      const response = await this.graphql.query({
        query: vouchersByUser,
        variables: { params },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {}
  }

  async voucherByGift(giftId: any) {
    try {
      const response = await this.graphql.query({
        query: voucherByGift,
        variables: { giftId },
        fetchPolicy: 'no-cache',
      });
      return response;
    } catch (e) {}
  }

  possibleDate(voucherId, dates) {
    try {
      let url = this.url + '/activity/voucher/possible-date';
      console.log(localStorage.getItem('session-token'));

      let body = {
        voucherId,
        date: dates.date,
      };
      console.log(body);
      return this.http.post(url, dates, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('session-token'),
          'Content-Type': 'application/json',
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  getVoucher(id) {
    let url = this.url + `/activity/voucher?id=${id}`;

    return this.http.get(url);
  }

  async getVoucherGql(id: string): Promise<{ getVoucher: Voucher }> {
    try {
      const response = await this.graphql.query({
        query: getVoucherGqlQuery,
        variables: { id },
        fetchPolicy: 'no-cache',
      });

      return response;
    } catch (e) {}
  }

  vote(voucherId, possibleDateId) {
    let url = this.url + '/activity/voucher/vote';
    let body = { voucherId, possibleDateId };
    console.log(body);
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('session-token'),
        'Content-Type': 'application/json',
      }),
    });
  }
}

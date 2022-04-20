import gql from 'graphql-tag';

export const gift = gql`
  query gift($giftId: ObjectID!) {
    gift(giftId: $giftId) {
      _id
      limits {
        fromDay
        toDay
      }
    }
  }
`;

export const vouchersByUser = gql`
  query vouchersByUser($params: ListParams) {
    vouchersByUser(params: $params) {
      _id
      ammount
      name
      gift {
        _id
        name
      }
      creator {
        _id
        name
        image
        activity
        email
      }
      expirationDate
      voucherStatus
      active
    }
  }
`;

export const voucherByGift = gql`
  query voucherByGift($giftId: ObjectID!) {
    voucherByGift(giftId: $giftId) {
      _id
      ammount
      voucherStatus
    }
  }
`;

export const getVoucher = gql`
  query getVoucher($id: ObjectID!) {
    getVoucher(id: $id) {
      _id
      description
      creator {
        _id
        image
        name
      }
      voucherStatus
      voucherType
      startDate
      expirationDate
      ammount
      restrictions
      owner {
        _id
        name
      }
    }
  }
`;

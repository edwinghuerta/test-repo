import gql from 'graphql-tag';
import { body as merchant } from './merchants.gql';

const body = `
  _id
  name
  image
  description
  type
  merchant { ${merchant} }
  typeData {
    ... on CashbackReward {
      _id
      type
      when
      quantity
      related {
        ... on Item {
          _id
          name
          description
        }
        ... on ItemCategory {
          _id
          name
          description
        }
      }
    }
    ... on GiftReward {
      _id
      quantity
    }
  }
  createdAt
  updatedAt
`;

export const rewards = gql`
  query rewards($merchantId: ObjectID, $params: ListParams) {
    rewards(merchantId: $merchantId, params: $params) { ${body} }
  }
`;

export const reward = gql`
  query reward($id: ObjectID!) {
    reward(id: $id) { ${body} }
  }
`;

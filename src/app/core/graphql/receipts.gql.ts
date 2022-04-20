import gql from 'graphql-tag';

export const body = `
  _id
  code
  total
  subtotal
  collected
  userProfit
  userPercent
  communityProfit
  communityPercent
  merchant {
    _id
    name
    location
    email
    image
    bio
  }
  community {
    _id
    name
    kindcode
  }
`;

export const receiptsByUser = gql`
  query receiptsByUser($userId: ObjectID, $params: ListParams) {
    receiptsByUser(userId: $userId, params: $params) { ${body} }
  }
`;

export const receiptsByCommunity = gql`
  query receiptsByCommunity($kindcode: String, $community: ObjectID, $params: ListParams) {
    receiptsByCommunity(kindcode: $kindcode, community: $community, params: $params) { ${body} }
  }
`;

export const receiptsByPartner = gql`
  query receiptsByPartner($partner: ObjectID!, $params: ListParams) {
    receiptsByPartner(partner: $partner, params: $params) { ${body} }
  }
`;

export const setReceiptCollect = gql`
  mutation setReceiptCollect($id: ObjectID!, $value: Boolean!) {
    setReceiptCollect(id: $id, value: $value) { ${body} }
  }
`;

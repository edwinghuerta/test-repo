import gql from 'graphql-tag';

const body = `
  _id
  percent
  userPercent
  merchant {
    _id
    name
    image
  }
  community {
    _id
    name
    image
    kindcode
    collected
    tocollect
  }
`;

export const createPartner = gql`
  mutation createPartner($input: PartnerInput!, $merchantInput: MerchantInput) {
    createPartner(input: $input, merchantInput: $merchantInput) { ${body} }
  }
`;
export const partner = gql`
  query partner($id: ObjectID!) {
    partner(id: $id) { ${body} }
  }
`;

export const communityPartners = gql`
  query communityPartners($community: ObjectID!, $params: ListParams) {
    communityPartners(community: $community, params: $params) { ${body} }
  }
`;

import gql from 'graphql-tag';

// export const body = `
//   _id
//   name
//   location
//   email
//   image
//   bio
//   owner { 
//     phone
//     email
//     name
//     _id
//   }
//   createdAt
//   updatedAt
//   activity
// `;

export const body = `
  _id
  name
  location
  email
  image
  bio
  owner { 
    phone
    email
    name
    _id
  }
  activity
`;

export const myMerchants = gql`
  query merchants($params: ListParams) {
    myMerchants(params: $params) { ${body} }
  }
`;

export const merchants = gql`
  query merchants($params: ListParams) {
    merchants(params: $params) { ${body} }
  }
`;

export const hotMerchants = gql`
  query merchants($params: ListParams) {
    merchants(params: $params) {
      _id
      name
      owner {
        email
      }
    }
  }
`;

export const merchant = gql`
  query merchant($id: ObjectID!) {
    merchant(id: $id) { ${body} }
  }
`;

export const hotMerchant = gql`
  query merchant($id: ObjectID!) {
    merchant(id: $id) {
      _id
      name
      activity
    }
  }
`;

export const createMerchant = gql`
  mutation createMerchant($input: MerchantInput!) {
    createMerchant(input: $input) { ${body} }
  }
`;

export const updateMerchant = gql`
  mutation updateMerchant($id: ObjectID!, $input: MerchantInput!) {
    updateMerchant(id: $id, input: $input) { ${body} }
  }
`;

export const addMerchant = gql`
  mutation addMerchant($emailOrPhone: String!, $input: MerchantInput!) {
    addMerchant(emailOrPhone: $emailOrPhone, input: $input) {
      _id
    }
  }
`;

export const itemsByMerchant = gql`
  query itemsByMerchant($id: ObjectID!) {
    itemsByMerchant(id: $id) {
      _id
      name
      pricing
      description
      createdAt
      images
    }
  }
`;

export const ordersByMerchant = gql`
  query ordersByMerchant($pagination: PaginationInput, $merchant: ObjectID!) {
    ordersByMerchant(pagination: $pagination, merchant: $merchant) {
      _id
      subtotals {
        amount
      }
      user {
        phone
        email
        name
        image
      }
      ocr {
        _id
      }
      items {
        item {
          name
          images
          pricing
        }
        reservation {
          _id
        }
      }
      orderStatus
      dateId
      createdAt
      tags
    }
  }
`;

export const item = gql`
  query item($id: ObjectID!) {
    item(id: $id) {
      _id
      name
      pricing
      description
      createdAt
      images
      fixedQuantity
      params{
        _id
        name
        values {
          _id
          name
          price
        }
      }
    }
  }
`;

export const createEmployeeContract = gql`
  mutation createEmployeeContract($input: EmployeeContractInput!) {
    createEmployeeContract(input: $input) {
      _id
      user {
        _id
        email
        phone
      }
    }
  }
`;

export const employeeContractByMerchant = gql`
  query employeeContractByMerchant($merchantId: ObjectID!) {
    employeeContractByMerchant(merchantId: $merchantId) {
      _id
      user {
        _id
        email
        name
        phone
      }
    }
  }
`;

export const tagsByMerchant = gql`
  query tagsByMerchant($input: PaginationInput, $merchantId: ObjectID!) {
    tagsByMerchant(input: $input, merchantId: $merchantId) {
      results{
        _id,
        name,
        counter
      }
      page,
      limit,
      totalPages,
      totalResults
    }
  }
`;

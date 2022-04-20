import gql from 'graphql-tag';

const orderData = `
  _id
  dateId
  createdAt
  tags
  subtotals {
    amount
  }
  merchants {
    _id
  }
  user {
    _id
    phone
    name
    email
  }
  items {
    _id
    deliveryLocation {
      googleMapsURL
      city
      street
      houseNumber
      referencePoint
      nickName
      note
    }
    saleflow{
      _id
      name 
      headline
      subheadline
      banner
      merchant {
        _id
        name
        owner {
          phone
        }
      }
      social {
        name
        url
      }
      module {
        paymentMethod{
          paymentModule{
            _id
          }
        }
      }
    }
    post {
      _id
    }
    amount
    item {
      _id
      name
      pricing
      images
      hasSelection
      params {
        _id
        name
        values {
          _id
          name
        }
      }
    }
    params {
      param
      paramValue
    }
    reservation {
      _id
    }
    itemExtra {
      _id
      images
      name
    }
    customizer {
      _id
      preview
    }
  }
  orderStatus
  itemPackage {
    _id
    name
    images
    price
  }
  ocr {
    image
  }
`

export const order = gql`
  query order($orderId: ObjectID!) {
    order(orderId: $orderId) {
      ${orderData}
    }
  }
`;

export const createOrder = gql`
  mutation createOrder($input: ItemOrderInput!) {
    createOrder(input: $input) {
      _id
    }
  }
`;

export const ordersByUser = gql`
  query ordersByUser($pagination: PaginationInput) {
    ordersByUser(pagination: $pagination) {
      ${orderData}
    }
  }
`;

export const payOrder = gql`
  mutation payOrder(
    $ocr: OCRInput
    $payMode: String
    $orderId: ObjectID!
    $userId: ObjectID!
  ) {
    payOrder(ocr: $ocr, payMode: $payMode, orderId: $orderId, userId: $userId) {
      _id
    }
  }
`;

export const addTagsInOrder = gql`
  mutation addTagsInOrder($merchantId: ObjectID!, $tags: [String!]!, $orderId: ObjectID!) {
    addTagsInOrder(merchantId: $merchantId, tags: $tags, orderId: $orderId) {
      _id,
      tags
    }
  }
`;

export const updateTagsInOrder = gql`
  mutation updateTagsInOrder($merchantId: ObjectID!, $tags: [String!]!, $orderId: ObjectID!) {
    updateTagsInOrder(merchantId: $merchantId, tags: $tags, orderId: $orderId) {
      _id,
      tags
    }
  }
`;
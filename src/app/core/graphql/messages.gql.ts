import gql from 'graphql-tag';

export const dummyOrderById = gql`
  query dummyOrderById($dummyOrderId: ObjectID!) {
    dummyOrderById(dummyOrderId: $dummyOrderId) {
      _id
      item {
      
        letter {
          fontFamily
          color
          text
          position
        },
        type {
          color
          type
          size
          quantity
          proportion
          quality,
          price,
          category
        },
        icon {
          image
          color
        }
      },
      user{
        _id
        email
        phone
      }
      note
      dateId
      createdAt
    }
  }
`;

export const createDummyOrder = gql`
  mutation createDummyOrder($input: DummyOrderInput, $clientPhone: String) {
    createDummyOrder(input: $input, clientPhone: $clientPhone) {
      _id
      item {
       
        letter {
          fontFamily
          color
          text
          position
        },
        type {
          color
          type
          size
          quantity
          proportion
          quality,
          price
        },
        icon {
          image
          color
        }
      }
      dateId
      createdAt
    }
  }
`;

export const updateDummyOrder = gql`
  mutation updateDummyOrder($input: DummyOrderInput, $id: ObjectID!) {
    updateDummyOrder(input: $input, id: $id) {
      _id
      note
    }
  }
`;

export const dummyOrdersByUser = gql`
  query dummyOrdersByUser($userId: ObjectID!) {
    dummyOrdersByUser(userId: $userId) {
      _id
      item {
      
        letter {
          fontFamily
          color
          text
          position
        },
        type {
          color
          type
          size
          quantity
          proportion
          quality,
          price,
          category
        },
        icon {
          image
          color
        }
      },
      user{
        email
        phone
      }
      note
      dateId
      createdAt
    }
  }
`;
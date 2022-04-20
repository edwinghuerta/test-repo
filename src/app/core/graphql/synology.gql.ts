import gql from 'graphql-tag';

export const createSynologySession = gql`
  mutation createSynologySession($input: SynologyAuthInput!) {
    createSynologySession: createSynologySession(input: $input) {
      _id
      name
      credentials{
        token
        user
        password
        role
      }
      merchant{ 
        _id
      }
    }
  }
`;

export const verifySynologyAuth = gql`
  mutation verifySynologyAuth($mode: String!, $idMerchant: ObjectID!) {
    verifySynologyAuth: verifySynologyAuth(mode: $mode, idMerchant: $idMerchant)
  }
`;

export const createSynologyDirectory = gql`
  mutation createSynologyDirectory($input: SynologyDirectoryInput!) {
    createSynologyDirectory: createSynologyDirectory(input: $input) {
      _id
    }
  }
`;

export const setSelectedImageSynology = gql`
  mutation setSelectedImageSynology($itemSubOrderId: ObjectID!, $synologyDirectoryId: ObjectID!,$input: [String!]!) {
    setSelectedImageSynology: setSelectedImageSynology(itemSubOrderId: $itemSubOrderId,synologyDirectoryId: $synologyDirectoryId,input: $input)
  }
`;

export const getImagesFromSynologyDirectory = gql`
  query getImagesFromSynologyDirectory($isSelected: Boolean!, $synologyDirectoryId: ObjectID!) {
    getImagesFromSynologyDirectory(isSelected: $isSelected, synologyDirectoryId: $synologyDirectoryId)
  }
`;

export const synologyDirectoryByOrder = gql`
query synologyDirectoryByOrder($orderId: ObjectID!) {
    synologyDirectoryByOrder(orderId: $orderId){
      _id
    }
  }
`;
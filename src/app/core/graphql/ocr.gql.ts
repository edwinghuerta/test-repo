import gql from 'graphql-tag';

export const scanOCR = gql`
  mutation scanOCR($image: Upload!, $platform: String!, $merchant: ObjectID!) {
    OCR: scanOCR(image: $image, platform: $platform, merchant: $merchant) {
        _id
        transactionCode
        subtotal
        total
        platform
        status
        createdAt
    }
  }
`;
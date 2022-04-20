import gql from 'graphql-tag';

export const gift = gql`
  query gift($id: ObjectID!) {
    gift(id: $id) {
      _id
      description
      name
      user
      merchant {
        _id
        name
        image
      }
      startDate
      expirationDate
      ammount
      isFree
      maxUsers
      fixedCollaboration
      percentageCollaboration
      restrictions
    }
  }
`;

export const createMerchantGift = gql`
  mutation createMerchantGift($input: GiftInput!) {
    createMerchantGift(input: $input) {
      _id
      createdAt
      updatedAt
      name
      user
      description
      ammount
      isFree
      maxAvailability
      merchant {
        _id
        image
        name
      }
      startDate
      expirationDate
      maxUsers
      fixedCollaboration
      percentageCollaboration
      fixedReferralCollaboration
      timeChunkSize
    }
  }
`;

export const availableGifts = gql`
  query availableGifts($params: ListParams) {
    availableGifts(params: $params) {
      _id
      ammount
      description
      merchant {
        _id
        name
        activity
      }
      expirationDate
      name
    }
  }
`;

export const availableGiftsByUser = gql`
  query availableGiftsByUser($params: ListParams) {
    availableGiftsByUser(params: $params) {
      _id
      ammount
      merchant {
        _id
        name
        activity
      }
      reservationLimit
      maxUsers
      limits {
        fromDay
        toDay
      }
      maxAvailability
      account
      expirationDate
      name
    }
  }
`;

export const grantMerchantGift = gql`
  mutation grantMerchantGift($giftId: ObjectID!) {
    grantMerchantGift(giftId: $giftId) {
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
      owner {
        _id
        name
      }
    }
  }
`;

export const giftsByMerchant = gql`
  query giftsByMerchant($merchantId: ObjectID!) {
    giftsByMerchant(merchantId: $merchantId) {
      _id
      createdAt
      updatedAt
      name
      user
      description
      ammount
      isFree
      maxAvailability
      merchant {
        _id
        name
      }
      startDate
      expirationDate
      maxUsers
      fixedCollaboration
      percentageCollaboration
      fixedReferralCollaboration
      timeChunkSize
    }
  }
`;

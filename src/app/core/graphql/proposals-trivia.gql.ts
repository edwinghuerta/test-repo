import gql from 'graphql-tag';

export const proposals = gql`
  query proposals($params: PaginationInput) {
    proposals(params: $params) {
      results
    }
  }
`;

export const createVote = gql`
  mutation createVote($input: [AnswerInput!]!, $proposalId: ObjectID!) {
    createVote(
      proposalId: $proposalId,
      input: $input
    ) {
      _id
      question
      response
      createdAt
    }
  }
`;

import gql from 'graphql-tag';

export const addMark = gql`
  mutation addMark ($input: [MarkInput!]!) {
    addMark (input: $input) {
        _id
        post {
          _id
        }
        code {
          _id
        }
        gift {
          _id
        }
        own
        refBookmark
        createdAt
    }
  }
`;

export const removeMark = gql`
  mutation removeMark ($input: [ObjectID!]!) {
    Boolean: removeMark (input: $input)
  }
`;


export const bookmarkByUser = gql`
  query {
    bookmarkByUser  {  
        _id
        marks {
          _id
          post {
              _id
          }
          code {
            _id
            link
            image
            keyword
          }
          gift {
            _id
          }
        }
        createdAt
  }
}
`;
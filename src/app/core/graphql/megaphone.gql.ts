import gql from 'graphql-tag';

export const createMegaphone = gql`
  mutation createMegaphone($input: MegaphoneInput!) {
    megaphoneData: createMegaphone(input: $input) {
        _id
        name
        steps {
           image
           text
        }
    }
  }
`;
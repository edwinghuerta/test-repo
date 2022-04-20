import gql from 'graphql-tag';

export const IpUserbyIp = gql`
  query IpUserbyIp($ip: String!) {
    IpUserbyIp(ip: $ip) {
      _id
      ip
      city
      country
      user{
        phone
        email
        name
      }
    }
  }
`;
export const createIpUser = gql`
  mutation createIpUser($input: IpUserInput!) {
    createIpUser(input: $input) {
        _id
        ip
        city
        country
    }
  }
`;
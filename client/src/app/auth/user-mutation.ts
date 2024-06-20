import { gql } from 'apollo-angular';

export const USER_MUTATION = gql`
  mutation User($username: String!, $password: String!) {
    user(username: $username, password: $password) {
      user {
        id
        username
      }
      token
    }
  }
`;

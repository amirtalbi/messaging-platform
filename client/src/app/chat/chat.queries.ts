import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;
export const GET_USERS_WITHOUT_CONVERSATION = gql`
query($userId: String!) {
    userWithoutConversation(userId: $userId) {
        id,
      username
    }
  }	
`;

export const GET_MESSAGES = gql`
  query($id: String!) {
    conversation(id: $id) {
      id
      messages {
        id
        content
        createdAt
        sender {
          id
          username
        }
      }
    }
  }
`;
export const GET_CONVERSATION_BY_USER_ID = gql`
  query GetConversationByUserId($userId: String!) {
    conversationByUserId(userId: $userId) {
      id
      participants {
        id
        username
      }
    }
  }
`;
export const GET_CONVERSATION_BY_ID = gql`
  query($id: String!) {
    conversation(id: $id) {
     id
      messages {
        id
        content
        createdAt
        sender {
          id
          username
        }
      }
      participants {
        id
        username
      }
    }
  }`;
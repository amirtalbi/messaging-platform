import { gql } from 'apollo-angular';

export const CREATE_CONVERSATION = gql`
  mutation($input: CreateConversationInput!) {
    createConversation(createConversationInput: $input) {
      id
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation($content: String!, $senderId: String!, $conversationId: String!) {
    createMessage(content: $content, senderId: $senderId, conversationId: $conversationId) {
      id
    }
  }
`;

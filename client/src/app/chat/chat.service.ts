import { Injectable } from '@angular/core';
import { CREATE_CONVERSATION, CREATE_MESSAGE } from './chat.mutations';
import { GET_CONVERSATION_BY_ID, GET_CONVERSATION_BY_USER_ID, GET_MESSAGES, GET_USERS, GET_USERS_WITHOUT_CONVERSATION } from './chat.queries';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public userId = localStorage.getItem('userId');
  constructor(private apollo: Apollo) { }
  getUsers() {
    return this.apollo.query({
      query: GET_USERS,
    });
  }
  getSearchUsers() {
    return this.apollo.query({
      query: GET_USERS_WITHOUT_CONVERSATION,
      variables: {
        userId: this.userId,
      },
    });
  }
  createConversation(participantId: string) {
    return this.apollo.mutate({
      mutation: CREATE_CONVERSATION,
      variables: {
        input: {
          participants: [this.userId,participantId],
        },
      },
    });
    }
    getMessages(conversationId: string) {
    return this.apollo.query({
      query: GET_MESSAGES,
      variables: {
        id: conversationId,
      },
    });
    }
  createMessage(content: string, conversationId: string) {
    return this.apollo.mutate({
      mutation: CREATE_MESSAGE,
      variables: {
        content: content,
        senderId: this.userId,
        conversationId: conversationId,
      },
    });
    }
   getConversations() {
    return this.apollo.query({
      query: GET_CONVERSATION_BY_USER_ID,
      variables: {
        userId: this.userId,
      },
    });
   }
  getConversationById(id: string) {
    return this.apollo.query({
      query: GET_CONVERSATION_BY_ID,
      variables: {
        id: id,
      },
      fetchPolicy: 'network-only'
    });
  }
  
}

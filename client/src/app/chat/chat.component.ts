import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_USER_BY_ID = gql`
  query GetUserById($id: Int!) {
    getUserById(id: $id) {
      id
      name
    }
  }
`;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  chats: any[] = [];
  selectedChat: any = null;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<any>({
        query: GET_USER_BY_ID,
        variables: {
          id: 1,
        },
      })
      .valueChanges.subscribe(({ data }) => {
        console.log('data', data);
        this.chats = data.chats;
      });
  }

  selectChat(chat: any) {
    this.selectedChat = chat;
  }
}

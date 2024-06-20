import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';


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
    // Logic
    console.log('Chat component initialized');
  }

  selectChat(chat: any) {
    this.selectedChat = chat;
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ChatService } from './chat.service';
import { WebSocketService } from './websocket.service';
import { Conversation, Message, User } from '../model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
    users: User[] = [];
  conversationSelected: Conversation;
  conversations: Conversation[] = [];
  messages: Message[] = [];
  newMessage: string;
  searchResults$: Observable<User[]>;
  private searchTerms = new Subject<string>();
  isSearchOnGoing = false;

  constructor(
    private chatService: ChatService,
    private webSocketService: WebSocketService,
    private cdr: ChangeDetectorRef
  ) {
    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((input: string) => {
        if (input.trim().length >= 1) {
          return this.users.filter(user =>
            user.username.toLowerCase().includes(input.toLowerCase())
          );
        } else {
          return [];
        }
      })
    );
  }

  ngOnInit() {
    this.webSocketService.onNewMessageTrigger().subscribe((data) => {
      this.loadConversation(data.conversationId);
    });

    this.getSearchUsers();
    this.getConversations();
  }

  createConversation(participantId: string) {
    this.chatService.createConversation(participantId).subscribe((res:any) => {
      this.loadConversation(res.data.createConversation.id);
      this.getConversations();
      this.searchTerms.next('');
    });
  }

  getConversations() {
    this.chatService.getConversations().subscribe((result: any) => {
      this.conversations = result.data.conversationByUserId;
    });
  }

  getMessages(conversation: Conversation) {
    this.conversationSelected = conversation;
    this.chatService.getMessages(conversation.id).subscribe((result: any) => {
      this.messages = result.data.conversation.messages;
    });
  }

  getParticipantsString(participants: User[]): string {
    return participants.map(p => p.username).join(', ');
  }

  loadConversation(conversationId: string) {
    this.chatService.getConversationById(conversationId).subscribe((result: any) => {
      this.conversationSelected = result.data.conversation;
      this.messages = this.conversationSelected.messages;
      console.log('Conversation mise à jour:', this.conversationSelected);
      this.cdr.detectChanges();
    });
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value.trim();
    if (term.length >= 1) {
      this.isSearchOnGoing = true;
      this.searchTerms.next(term);
    } else {
      this.isSearchOnGoing = false;
      this.searchTerms.next('');
    }
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }
    this.createMessage(this.newMessage, this.conversationSelected.id);
    this.newMessage = '';
  }

  private createMessage(content: string, conversationId: string) {
    this.chatService.createMessage(content, conversationId).subscribe();
  }

  isSendByMe(id: string) {
    return id === localStorage.getItem('userId');
  }

  private getSearchUsers() {
    this.chatService.getSearchUsers().subscribe((result: any) => {
      this.users = result.data.userWithoutConversation;
    });
  }
}

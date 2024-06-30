import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.authService
      .createOrLogUser(
        this.userForm.value.username,
        this.userForm.value.password,
      )
      .subscribe({
        next: (response) => {
          this.authService.login();
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.user.id);
          this.router.navigate(['/chat']);

        },
        error: (err) => {
          console.error('Error during authentication:', err);
        },
      });
  }
}

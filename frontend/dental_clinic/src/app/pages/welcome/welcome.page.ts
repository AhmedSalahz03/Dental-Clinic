import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5 text-center">
      <h2 class="mb-4">Welcome</h2>
      <p class="text-muted mb-4">Please login or create an account to continue.</p>
      <div class="d-flex justify-content-center gap-3">
        <a class="btn btn-primary" routerLink="/login">Login</a>
        <a class="btn btn-outline-primary" routerLink="/signup">Sign up</a>
      </div>
    </div>
  `
})
export class WelcomePage {}

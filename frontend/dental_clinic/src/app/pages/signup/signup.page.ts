import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.css'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})

export class SignupPage {
    username = '';
    password = '';
    error = '';
    success = '';

    constructor(private authService: AuthService) {}

    signup() {
        this.error = '';
        this.success = '';
        this.authService.signup({ username: this.username, password: this.password }).subscribe({
            next: (res: any) => {
                this.success = 'Signup successful! You can now login.';
                this.username = '';
                this.password = '';
            },
            error: (err: any) => {
                this.error = err.error?.message || 'Signup failed.';
            }
        });
    }
}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule]
})

export class SignupPage {
    username = '';
    password = '';
    secret_code = '';
    selectedRole: string = '';
    error = '';
    success = '';
    submitted = false;

    availableRoles = [
      { label: 'Dentist', value: 'dentist' },
      { label: 'Receptionist', value: 'receptionist' },
      { label: 'Admin', value: 'admin' }
    ];

    constructor(private authService: AuthService, private router: Router) {}

    onRoleChange(role: string, event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        this.selectedRole = checked ? role : '';
    }

    signup() {
        this.submitted = true;
        this.error = '';
        this.success = '';
        if (!this.selectedRole) {
            this.error = 'Please select a role.';
            return;
        }
                const username = this.username;
                const password = this.password;
                this.authService.signup({
            username: this.username,
            password: this.password,
            secret_code: this.secret_code,
            roles: [this.selectedRole]
        }).subscribe({
            next: (res: any) => {
                                // Auto-login after successful signup
                                this.success = 'Account created. Logging you in…';
                                this.authService.login({ username, password }).subscribe({
                                    next: (loginRes: any) => {
                                        try { localStorage.setItem('token', loginRes.token); } catch {}
                                        this.router.navigateByUrl('/');
                                    },
                                    error: (loginErr: any) => {
                                        // If auto-login fails, keep the success message and ask user to login manually
                                        this.error = loginErr.error?.message || 'Auto-login failed. Please login manually.';
                                    }
                                });
            },
            error: (err: any) => {
                this.error = err.error?.message || 'Signup failed.';
            }
        });
    }
}

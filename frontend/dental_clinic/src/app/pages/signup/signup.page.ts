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
    secret_code = '';
    roles: string[] = [];
    error = '';
    success = '';
    submitted = false;

    availableRoles = [
      { label: 'Dentist', value: 'dentist' },
      { label: 'Receptionist', value: 'receptionist' },
      { label: 'Admin', value: 'admin' }
    ];

    constructor(private authService: AuthService) {}

    onRoleChange(role: string, event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        if (checked) {
            if (!this.roles.includes(role)) {
                this.roles.push(role);
            }
        } else {
            this.roles = this.roles.filter(r => r !== role);
        }
    }

    signup() {
        this.submitted = true;
        this.error = '';
        this.success = '';
        if (this.roles.length === 0) {
            this.error = 'Please select at least one role.';
            return;
        }
        this.authService.signup({
            username: this.username,
            password: this.password,
            secret_code: this.secret_code,
            roles: this.roles
        }).subscribe({
            next: (res: any) => {
                this.success = 'Signup successful! You can now login.';
                this.username = '';
                this.password = '';
                this.secret_code = '';
                this.roles = [];
                this.submitted = false;
            },
            error: (err: any) => {
                this.error = err.error?.message || 'Signup failed.';
            }
        });
    }
}

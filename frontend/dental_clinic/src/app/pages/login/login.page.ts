import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
		styleUrls: ['./login.page.css'],
		standalone: true,
		imports: [CommonModule, FormsModule]
})
export class LoginPage {
	username = '';
	password = '';
	error = '';

	constructor(private authService: AuthService) {}

	login() {
		this.error = '';
		this.authService.login({ username: this.username, password: this.password }).subscribe({
			next: (res) => {
				localStorage.setItem('token', res.token);
				// TODO: Redirect to home/dashboard
			},
			error: (err) => {
				this.error = err.error?.message || 'Login failed.';
			}
		});
	}
}

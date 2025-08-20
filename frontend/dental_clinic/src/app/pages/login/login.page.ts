import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
		styleUrls: ['./login.page.css'],
		standalone: true,
		imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginPage {
	username = '';
	password = '';
	error = '';
	success = '';

	constructor(private authService: AuthService, private router: Router) {}

	login() {
		this.error = '';
		this.authService.login({ username: this.username, password: this.password }).subscribe({
			next: (res) => {
				localStorage.setItem('token', res.token);
				this.success = 'Login successful! Redirecting...';
				setTimeout(() => this.router.navigateByUrl('/'), 700);
			},
			error: (err) => {
				this.error = err.error?.message || 'Login failed.';
			}
		});
	}
}

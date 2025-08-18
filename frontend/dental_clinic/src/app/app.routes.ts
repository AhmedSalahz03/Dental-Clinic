import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { AppointmentsPage } from './pages/appointments/appointments.page';
export const routes: Routes = [
	{ path: '', component: HomePage },
	{ path: 'login', component: LoginPage },
	{ path: 'signup', component: SignupPage },
	{ path: 'appointments', component: AppointmentsPage }
];

import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { AppointmentsPage } from './pages/appointments/appointments.page';
import { PaymentsPage } from './pages/payments/payments.page';
import { DentalChartPage } from './pages/dental-chart/dental-chart.page';
export const routes: Routes = [
	{ path: '', component: HomePage },
	{ path: 'login', component: LoginPage },
	{ path: 'signup', component: SignupPage },
	{ path: 'appointments', component: AppointmentsPage },
	{ path: 'payments', component: PaymentsPage },
	{ path: 'patients/:id/chart', component: DentalChartPage }
];

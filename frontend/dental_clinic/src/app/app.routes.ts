import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { AppointmentsPage } from './pages/appointments/appointments.page';
import { PaymentsPage } from './pages/payments/payments.page';
import { DentalChartPage } from './pages/dental-chart/dental-chart.page';
import { WelcomePage } from './pages/welcome/welcome.page';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
	{ path: '', component: HomePage, canActivate: [AuthGuard] },
	{ path: 'welcome', component: WelcomePage },
	{ path: 'login', component: LoginPage },
	{ path: 'signup', component: SignupPage },
	{ path: 'appointments', component: AppointmentsPage, canActivate: [AuthGuard] },
	{ path: 'payments', component: PaymentsPage, canActivate: [AuthGuard] },
	{ path: 'patients/:id/chart', component: DentalChartPage, canActivate: [AuthGuard] }
];

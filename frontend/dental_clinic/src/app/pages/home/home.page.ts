import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PatientsListComponent } from '../../components/patients-list/patients-list.component';
import { PatientService, Patient } from '../../services/patient.service';
import { AppointmentService, Appointment } from '../../services/appointment.service';
import { PaymentService, Payment } from '../../services/payment.service';
import { HeaderComponent } from '../../components/header/header.component';

type AddressObj = { country: string; city: string; zip: string; street: string };
type EditablePatient = Omit<Patient, 'address' | 'dateOfBirth'> & { address: AddressObj; dateOfBirth?: any };
type NewPatientForm = Partial<Omit<Patient, 'address' | 'dateOfBirth'>> & { address: AddressObj; dateOfBirth?: any };

@Component({
	selector: 'app-home',
	standalone: true,
					imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, PatientsListComponent, DatePipe],
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.css']
})
export class HomePage {
	patients: Patient[] = [];
	selectedPatient: Patient | null = null;
	editingPatient: Patient | null = null;
	isHome = true;
	// Error messages for UI alerts
	newPatientError: string | null = null;
	editError: string | null = null;
	deleteError: string | null = null;
	// Ensure address is always present for template bindings
	editForm: { address: AddressObj } & Partial<Omit<EditablePatient, 'address'>> = {
		address: { country: '', city: '', zip: '', street: '' }
	};
	addingPatient = false;
	newPatientFile: File | null = null;
	newPatientPreview: string | null = null;
	editFile: File | null = null;
	editPreview: string | null = null;

	// Dashboard data
	appointments: Appointment[] = [];
	pendingPayments: Payment[] = [];
	lastPayments: Payment[] = [];
	newPatientForm: NewPatientForm = { address: { country: '', city: '', zip: '', street: '' } };

	get todayDate(): string {
		const now = new Date();
		const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
		return local;
	}

	getImageUrl(url?: string | null): string {
		if (!url) return '';
		if (/^https?:\/\//i.test(url)) return url;
		// Assume backend is on port 5000 in dev
		return `http://localhost:5000${url}`;
	}

	constructor(
		private patientService: PatientService,
		private appointmentService: AppointmentService,
		private paymentService: PaymentService
	) {
		this.refreshPatients();
		this.loadDashboard();
	}

	refreshPatients() {
		this.patientService.getPatients().subscribe(data => {
			this.patients = data;
		});
	}

	onPatientSelected(patient: Patient) {
		console.log('HomePage received patient:', patient);
		this.selectedPatient = patient;
		this.editingPatient = null;
		this.isHome = false;
	}

	onHomeClick() {
		this.selectedPatient = null;
		this.editingPatient = null;
		this.addingPatient = false;
			this.newPatientFile = null;
			this.newPatientPreview = null;
			this.editFile = null;
			this.editPreview = null;
			this.newPatientError = null;
			this.editError = null;
			this.deleteError = null;
		this.isHome = true;
		this.loadDashboard();
	}

	formatAddress(address: any): string {
		if (!address) return 'N/A';
		if (typeof address === 'string') return address;
		if (typeof address === 'object') {
			const parts = [address.street, address.city, address.state, address.zip].filter(Boolean);
			return parts.length ? parts.join(', ') : 'N/A';
		}
		return 'N/A';
	}

	private parseDateLike(a: Appointment): number {
		const dt = (a.dateTime || a.date || a.scheduledAt) as any;
		return dt ? new Date(dt).getTime() : Number.MAX_SAFE_INTEGER;
	}

	getPatientName(patient: any): string {
		if (!patient) return 'Unknown patient';
		if (typeof patient === 'string') return patient;
		return patient.name || 'Unknown patient';
	}

	loadDashboard() {
		// Appointments: get upcoming (next 5)
		this.appointmentService.getAppointments().subscribe({
			next: (all) => {
				const now = Date.now();
				this.appointments = all
					.filter(a => this.parseDateLike(a) >= now)
					.sort((a, b) => this.parseDateLike(a) - this.parseDateLike(b))
					.slice(0, 5);
			},
			error: () => { this.appointments = []; }
		});

		// Payments: split pending and last paid (5 most recent)
		this.paymentService.getPayments().subscribe({
			next: (all) => {
				this.pendingPayments = all.filter(p => (p.status || '').toLowerCase() !== 'paid').slice(0, 5);
				this.lastPayments = all
					.filter(p => (p.status || '').toLowerCase() === 'paid')
					.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
					.slice(0, 5);
			},
			error: () => { this.pendingPayments = []; this.lastPayments = []; }
		});
	}

			editPatient(patient: Patient) {
				this.editingPatient = { ...patient };
				this.addingPatient = false;
				// Deep copy for address if it's an object
				const addr = (patient as any).address;
				const addressObj = (addr && typeof addr === 'object' && !Array.isArray(addr))
					? { country: '', city: '', zip: '', street: '', ...addr }
					: (typeof addr === 'string')
						? { street: addr, city: '', zip: '', country: '' }
						: { street: '', city: '', zip: '', country: '' };
				this.editForm = {
					...patient,
					address: addressObj
				};
			}

			addPatient() {
				this.addingPatient = true;
				this.editingPatient = null;
				this.selectedPatient = null;
				this.isHome = false;
				this.newPatientFile = null;
				this.newPatientPreview = null;
				this.newPatientError = null;
					this.newPatientForm = {
						name: '',
						email: '',
						dateOfBirth: undefined,
						phone: '',
						address: { street: '', city: '', zip: '', country: '' },
						gender: ''
					};
			}

			fillSampleNewPatient() {
				const random = Math.floor(Math.random() * 10000);
				this.newPatientForm = {
					name: `John Doe ${random}`,
					email: `john${random}@example.com`,
					dateOfBirth: '1990-05-15' as any,
					phone: '+1 555-123-4567',
					address: { street: '123 Main St', city: 'Springfield', zip: '12345', country: 'USA' },
					gender: 'male'
				};
			}

			saveNewPatient() {
				const payload: any = this.normalizePayload({ ...this.newPatientForm });
				const onError = (err: any) => {
					console.error('Create patient failed:', err);
					this.newPatientError = this.humanizeHttpError(err);
				};
				if (this.newPatientFile) {
					this.patientService.createPatientWithImage(payload, this.newPatientFile).subscribe({
						next: (created: Patient) => {
							this.addingPatient = false;
							this.selectedPatient = created;
							this.refreshPatients();
						},
						error: onError
					});
				} else {
					this.patientService.createPatient(payload).subscribe({
						next: (created: Patient) => {
							this.addingPatient = false;
							this.selectedPatient = created;
							this.refreshPatients();
						},
						error: onError
					});
				}
			}

			cancelAddPatient() {
				this.addingPatient = false;
				this.newPatientForm = { address: { country: '', city: '', zip: '', street: '' } } as NewPatientForm;
				this.newPatientFile = null;
				this.newPatientPreview = null;
			}

	saveEdit() {
		console.log('saveEdit() called', {
			editingPatient: this.editingPatient,
			payload: this.editForm
		});
		if (!this.editingPatient) {
			console.warn('No editingPatient set, aborting save.');
			return;
		}
		if (this.editFile) {
			const normalized = this.normalizePayload({ ...this.editForm });
			this.patientService.updatePatientWithImage(this.editingPatient._id, normalized, this.editFile).subscribe({
				next: (updated) => {
					console.log('Update success:', updated);
					this.selectedPatient = updated;
					this.editingPatient = null;
					this.editFile = null;
					this.editPreview = null;
					this.refreshPatients();
				},
				error: (err) => {
					console.error('Update failed:', err);
					this.editError = this.humanizeHttpError(err);
				}
			});
		} else {
			const normalized = this.normalizePayload({ ...this.editForm });
			this.patientService.updatePatient(this.editingPatient._id, normalized).subscribe({
			next: (updated) => {
				console.log('Update success:', updated);
				this.selectedPatient = updated;
				this.editingPatient = null;
				this.refreshPatients();
			},
			error: (err) => {
				console.error('Update failed:', err);
				this.editError = this.humanizeHttpError(err);
			}
			});
		}
	}

	cancelEdit() {
		this.editingPatient = null;
	}

	deletePatient(patient: Patient) {
		if (!confirm('Are you sure you want to delete this patient?')) return;
		this.patientService.deletePatient(patient._id).subscribe({
			next: () => {
				this.selectedPatient = null;
				this.editingPatient = null;
				this.refreshPatients();
			},
			error: (err) => {
				console.error('Delete failed:', err);
				this.deleteError = this.humanizeHttpError(err);
			}
		});
	}

	onNewProfilePicSelected(evt: Event) {
		const input = evt.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			this.newPatientFile = input.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				this.newPatientPreview = reader.result as string;
			};
			reader.readAsDataURL(this.newPatientFile);
		}
	}

	onEditProfilePicSelected(evt: Event) {
		const input = evt.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			this.editFile = input.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				this.editPreview = reader.result as string;
			};
			reader.readAsDataURL(this.editFile);
		}
	}

	private humanizeHttpError(err: any): string {
		// Prefer backend message if present
		const raw = err?.error;
		const msg = (raw && (raw.message || raw.error || raw.msg)) || err?.message;
		// Mongo duplicate key
		if (raw && (raw.code === 11000 || /duplicate key/i.test(JSON.stringify(raw)))) {
			return 'Email or phone already exists.';
		}
		if (err?.status === 400) {
			return msg || 'Invalid data. Please check required fields.';
		}
		if (err?.status === 401) return 'Unauthorized. Please log in again.';
		if (err?.status === 404) return 'Record not found.';
		return msg || 'Something went wrong. Please try again.';
	}

	private normalizePayload<T extends Record<string, any>>(data: T): T {
		// Trim strings and remove empty optional fields
		const copy: any = { ...data };
		for (const k of Object.keys(copy)) {
			if (typeof copy[k] === 'string') {
				copy[k] = copy[k].trim();
				if (copy[k] === '') {
					// Remove empty optional fields
					if (['phone', 'profilePic'].includes(k)) delete copy[k];
				}
			}
		}
		if (copy.address && typeof copy.address === 'object') {
			const a = { ...copy.address } as any;
			['street', 'city', 'zip', 'country'].forEach(f => {
				if (typeof a[f] === 'string') a[f] = a[f].trim();
			});
			const allEmpty = ['street', 'city', 'zip', 'country'].every(f => !a[f]);
			copy.address = allEmpty ? undefined : a;
			if (copy.address === undefined) delete copy.address;
		}
		return copy as T;
	}
}

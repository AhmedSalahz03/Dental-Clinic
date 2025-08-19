import { Component } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { PaymentService, Payment } from '../../services/payment.service';
import { PatientService, Patient } from '../../services/patient.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, CurrencyPipe, HeaderComponent],
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.css']
})
export class PaymentsPage {
  loading = true;
  error = '';
  payments: Payment[] = [];
  patients: Patient[] = [];

  adding = false;
  newPayment: { patient: string; amount: number | null; status: 'paid' | 'unpaid'; method?: string; date?: string; note?: string } = {
    patient: '', amount: null, status: 'unpaid'
  };

  editingId: string | null = null;
  editModel: { patient: string; amount: number | null; status: 'paid' | 'unpaid'; method?: string; date?: string; note?: string } = {
    patient: '', amount: null, status: 'unpaid'
  };

  constructor(private paymentService: PaymentService, private patientService: PatientService) {
    this.refresh();
    this.loadPatients();
  }

  refresh() {
    this.loading = true; this.error = '';
    this.paymentService.getPayments().subscribe({
      next: (data) => { this.payments = (data || []).sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()); this.loading = false; },
      error: (err) => { this.error = err?.error?.message || 'Failed to load payments'; this.loading = false; }
    });
  }

  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: list => this.patients = list || [],
      error: () => this.patients = []
    });
  }

  getPatientName(p: any): string {
    if (!p) return 'Unknown patient';
    if (typeof p === 'string') return p;
    return p.name || 'Unknown patient';
  }

  toggleAdd() {
    this.adding = !this.adding;
    if (this.adding) this.newPayment = { patient: '', amount: null, status: 'unpaid', method: 'cash', date: '', note: '' };
  }

  savePayment() {
    if (!this.newPayment.patient || this.newPayment.amount == null) { this.error = 'Patient and amount are required'; return; }
    this.error = '';
    this.paymentService.addPayment({
      patient: this.newPayment.patient,
      amount: this.newPayment.amount,
      status: this.newPayment.status,
      method: this.newPayment.method,
      date: this.newPayment.date,
      note: this.newPayment.note
    }).subscribe({
      next: () => { this.adding = false; this.refresh(); },
      error: (err) => { this.error = err?.error?.message || 'Failed to add payment'; }
    });
  }

  startEdit(p: Payment) {
    this.editingId = p._id;
    this.editModel = {
      patient: typeof p.patient === 'string' ? p.patient : (p.patient?._id || ''),
      amount: p.amount ?? null,
      status: (p.status as any) || 'unpaid',
      method: p.method,
      date: p.date ? new Date(new Date(p.date as any).getTime() - new Date(p.date as any).getTimezoneOffset() * 60000).toISOString().slice(0,16) : '',
      note: p.note
    } as any;
  }

  cancelEdit() { this.editingId = null; }

  saveEdit() {
    if (!this.editingId) return;
    if (!this.editModel.patient || this.editModel.amount == null) { this.error = 'Patient and amount are required'; return; }
    const payload: Partial<Payment> = {
      patient: this.editModel.patient,
      amount: this.editModel.amount ?? undefined,
      status: this.editModel.status,
      method: this.editModel.method,
      date: this.editModel.date,
      note: this.editModel.note
    };
    this.paymentService.updatePayment(this.editingId, payload).subscribe({
      next: () => { this.editingId = null; this.refresh(); },
      error: (err) => { this.error = err?.error?.message || 'Failed to update payment'; }
    });
  }

  deletePayment(p: Payment) {
    if (!p?._id) return;
    const ok = confirm('Delete this payment?');
    if (!ok) return;
    this.paymentService.deletePayment(p._id).subscribe({
      next: () => this.refresh(),
      error: (err) => { this.error = err?.error?.message || 'Failed to delete payment'; }
    });
  }
}

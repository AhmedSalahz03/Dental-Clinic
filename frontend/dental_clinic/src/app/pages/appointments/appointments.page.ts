import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService, Appointment } from '../../services/appointment.service';
import { HeaderComponent } from '../../components/header/header.component';
import { PatientService, Patient } from '../../services/patient.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, HeaderComponent],
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.css']
})
export class AppointmentsPage {
  loading = true;
  error = '';
  appointments: Appointment[] = [];
  adding = false;
  newAppt: { patient: string; date: string; reason?: string } = { patient: '', date: '' };
  patients: Patient[] = [];
  editingId: string | null = null;
  editModel: { patient: string; date: string; reason?: string; status?: string } = { patient: '', date: '' };

  constructor(private apptService: AppointmentService, private patientService: PatientService) {
    this.refresh();
    this.loadPatients();
  }

  refresh() {
    this.loading = true; this.error = '';
    this.apptService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = (data || []).sort((a, b) => {
          const ta = new Date((a.dateTime || a.date || a.scheduledAt) as any).getTime();
          const tb = new Date((b.dateTime || b.date || b.scheduledAt) as any).getTime();
          return ta - tb;
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load appointments';
        this.loading = false;
      }
    });
  }

  getPatientName(p: any): string {
    if (!p) return 'Unknown patient';
    if (typeof p === 'string') return p;
    return p.name || 'Unknown patient';
  }

  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: (list) => { this.patients = list || []; },
      error: () => { this.patients = []; }
    });
  }

  toggleAdd() {
    this.adding = !this.adding;
    if (this.adding) {
      this.newAppt = { patient: '', date: '', reason: '' };
    }
  }

  saveAppointment() {
    if (!this.newAppt.patient || !this.newAppt.date) {
      this.error = 'Patient ID and Date are required';
      return;
    }
    this.error = '';
    this.apptService.addAppointment({
      patient: this.newAppt.patient,
      date: this.newAppt.date,
      reason: this.newAppt.reason || undefined
    }).subscribe({
      next: () => {
        this.adding = false;
        this.refresh();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to add appointment';
      }
    });
  }

  startEdit(a: Appointment) {
    this.editingId = a._id;
    const dateVal = (a.dateTime || a.date || a.scheduledAt) ? new Date(a.dateTime || a.date || a.scheduledAt as any) : null;
    // Convert to input[type=datetime-local] format
    const toLocal = (d: Date | null) => d ? new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : '';
    this.editModel = {
      patient: typeof a.patient === 'string' ? a.patient : (a.patient?._id || ''),
      date: toLocal(dateVal),
      reason: a.reason,
      status: a.status
    };
  }

  cancelEdit() {
    this.editingId = null;
  }

  saveEdit() {
    if (!this.editingId) return;
    if (!this.editModel.patient || !this.editModel.date) {
      this.error = 'Patient and Date are required';
      return;
    }
    const payload: Partial<Appointment> = {
      patient: this.editModel.patient,
      date: this.editModel.date,
      reason: this.editModel.reason,
      status: this.editModel.status
    };
    this.apptService.updateAppointment(this.editingId, payload).subscribe({
      next: () => {
        this.editingId = null;
        this.refresh();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to update appointment';
      }
    });
  }

  deleteAppointment(a: Appointment) {
    if (!a?._id) return;
    const ok = confirm('Delete this appointment?');
    if (!ok) return;
    this.apptService.deleteAppointment(a._id).subscribe({
      next: () => this.refresh(),
      error: (err) => {
        this.error = err?.error?.message || 'Failed to delete appointment';
      }
    });
  }
}

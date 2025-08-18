import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appointment {
  _id: string;
  patient?: { _id: string; name?: string; phone?: string } | string;
  // Common possible fields; keep index signature to be resilient to schema differences
  date?: string | Date;
  dateTime?: string | Date;
  scheduledAt?: string | Date;
  status?: string;
  reason?: string;
  notes?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = 'http://localhost:5000/api/appointments';

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  addAppointment(data: Partial<Appointment>): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, data);
  }

  updateAppointment(id: string, data: Partial<Appointment>): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.apiUrl}/${id}`, data);
  }

  deleteAppointment(id: string): Observable<{ message?: string } & any> {
    return this.http.delete<{ message?: string } & any>(`${this.apiUrl}/${id}`);
  }
}

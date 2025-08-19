import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Patient {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  phone: string;
  address: string | { country?: string; city?: string; zip?: string; street?: string };
  gender: string;
  dentalChart?: any;

}

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl = 'http://localhost:5000/api/patients';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatePatient(id: string, data: Partial<Patient>): Observable<Patient> {
    return this.http.patch<Patient>(`${this.apiUrl}/${id}`, data);
  }

  createPatient(data: Partial<Patient>): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, data);
  }
}
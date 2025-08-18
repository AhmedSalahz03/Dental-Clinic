import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payment {
  _id: string;
  patient?: { _id: string; name?: string; phone?: string } | string;
  amount?: number;
  status?: 'paid' | 'pending' | string;
  method?: string;
  date?: string | Date;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = 'http://localhost:5000/api/payments';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }
}

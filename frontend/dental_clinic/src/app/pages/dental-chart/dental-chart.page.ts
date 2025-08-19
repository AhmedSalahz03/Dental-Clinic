import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DentalChartComponent, DentalChart } from '../../components/dental-chart/dental-chart.component';
import { PatientService, Patient } from '../../services/patient.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-dental-chart-page',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, DentalChartComponent],
  templateUrl: './dental-chart.page.html',
  styleUrls: ['./dental-chart.page.css']
})
export class DentalChartPage {
  patient: Patient | null = null;
  chartDraft: DentalChart = {};
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private patients: PatientService) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patients.getPatientById(id).subscribe({
        next: (p) => { this.patient = p; this.chartDraft = (p as any).dentalChart || {}; this.loading = false; },
        error: (e) => { this.error = e?.error?.message || 'Failed to load patient'; this.loading = false; }
      });
    } else {
      this.loading = false; this.error = 'Missing patient id';
    }
  }

  onChartChange(c: DentalChart) { this.chartDraft = c; }

  save() {
    if (!this.patient) return;
    this.patients.updatePatient(this.patient._id, { dentalChart: this.chartDraft } as any).subscribe({
      next: (p) => { this.patient = p; },
      error: (e) => { this.error = e?.error?.message || 'Failed to save chart'; }
    });
  }
}

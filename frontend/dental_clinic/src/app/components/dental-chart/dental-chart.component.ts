import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type Diagnosis = 'caries' | 'filled' | 'missing' | 'crown' | 'implant' | 'root-canal' | 'none';
export type ToothPart = 'O' | 'M' | 'D' | 'B' | 'L' | 'rootL' | 'rootR';

export type DentalChart = {
  [toothId: string]: { [part in ToothPart]?: Diagnosis | null } | undefined;
};

@Component({
  selector: 'app-dental-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dental-chart.component.html',
  styleUrls: ['./dental-chart.component.css']
})
export class DentalChartComponent {
  @Input() chart: DentalChart = {};
  @Output() chartChange = new EventEmitter<DentalChart>();

  teethTop = Array.from({ length: 16 }, (_, i) => (i + 1).toString());
  teethBottom = Array.from({ length: 16 }, (_, i) => (i + 17).toString());

  diagnoses: { key: Exclude<Diagnosis, 'none'>; label: string; color: string }[] = [
    { key: 'caries',     label: 'Caries',     color: '#ef4444' },
    { key: 'filled',     label: 'Filled',     color: '#22c55e' },
    { key: 'missing',    label: 'Missing',    color: '#9ca3af' },
    { key: 'crown',      label: 'Crown',      color: '#f59e0b' },
    { key: 'implant',    label: 'Implant',    color: '#06b6d4' },
    { key: 'root-canal', label: 'Root Canal', color: '#8b5cf6' }
  ];
  selected: Diagnosis = 'caries';

  pick(d: Diagnosis) { this.selected = d; }

  togglePart(toothId: string, part: ToothPart) {
    const t = (this.chart[toothId] ||= {});
    const current = t[part] ?? null;
    if (this.selected === 'none') {
      t[part] = null;
    } else {
      t[part] = current === this.selected ? null : this.selected;
    }
    this.chartChange.emit({ ...this.chart });
  }

  getFill(toothId: string, part: ToothPart): string {
    const diag = this.chart[toothId]?.[part] ?? null;
    if (!diag) return '#ffffff';
    const found = this.diagnoses.find(d => d.key === diag);
    return found?.color || '#ffffff';
  }

  getTitle(toothId: string, part: ToothPart): string {
    const v = this.chart[toothId]?.[part];
    return v ? `${toothId} • ${part}: ${v}` : `${toothId} • ${part}: none`;
  }
}

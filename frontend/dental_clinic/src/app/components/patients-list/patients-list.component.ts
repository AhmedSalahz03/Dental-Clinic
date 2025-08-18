import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient } from '../../services/patient.service';

@Component({
	selector: 'app-patients-list',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './patients-list.component.html',
	styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, OnChanges {
	@Input() patients: Patient[] = [];

		@Output() selected = new EventEmitter<Patient>();
		@Output() addPatient = new EventEmitter<void>();

	constructor() {}

		ngOnInit() {}

		ngOnChanges(changes: SimpleChanges) {
			if (changes['patients']) {
				console.log('Patients list updated:', this.patients);
			}
		}

			selectPatient(patient: Patient) {
				console.log('Patient selected:', patient);
				this.selected.emit(patient);
			}

			addPatientClicked() {
				this.addPatient.emit();
			}
}

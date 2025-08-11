import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService, Patient } from '../../services/patient.service';

@Component({
	selector: 'app-patients-list',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './patients-list.component.html',
	styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
	patients: Patient[] = [];

	constructor(private patientService: PatientService) {}

	ngOnInit() {
		this.patientService.getPatients().subscribe(data => {
			this.patients = data;
		});
	}
}

import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PatientsListComponent } from '../../components/patients-list/patients-list.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [PatientsListComponent, JsonPipe],
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.css']
})
export class HomePage {
  selectedPatient: any = null;

  onPatientSelected(patient: any) {
    this.selectedPatient = patient;
  }
}

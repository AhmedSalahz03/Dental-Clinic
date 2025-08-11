import { Component } from '@angular/core';
import { PatientsListComponent } from '../../components/patients-list/patients-list.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [PatientsListComponent],
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.css']
})
export class HomePage {}

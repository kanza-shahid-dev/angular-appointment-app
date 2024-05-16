import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  appointmentTitle: string = '';
  appointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  ngOnInit(): void {
    let localStorageData = localStorage.getItem('appointments');

    this.appointments = localStorageData ? JSON.parse(localStorageData) : [];
  }

  addAppointment() {
    if (this.appointmentTitle.trim().length && this.appointmentDate) {
      const appoint: Appointment = {
        id: Math.random(),
        title: this.appointmentTitle,
        date: this.appointmentDate,
      };
      this.appointments.push(appoint);
      this.appointmentTitle = '';
      this.appointmentDate = new Date();
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }
  deleteAppointment(id: number) {
    let updated: Appointment[] = this.appointments.filter(
      (item) => item.id != id
    );
    this.appointments = updated;
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}

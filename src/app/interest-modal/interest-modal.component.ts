import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-interest-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './interest-modal.component.html',
  styleUrls: ['./interest-modal.component.css']
})
export class InterestModalComponent {
  @Input() showModal: boolean = false;
  @Input() eventId!: string;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  email: string = '';
  fullName: string = '';
  phoneNumber: string = '';
  numberOfAttendees: number = 1;
  agreeToEmails: boolean = false;
  showSuccessModal: boolean = false;
  submitted: boolean = false; 

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  onSubmit(): void {

    const token = this.authService.getToken(); // Get token from AuthService
    // console.log(token  , "1")

    this.submitted = true; 

   
    if (!this.email || !this.fullName || !this.phoneNumber || !this.numberOfAttendees || !this.agreeToEmails) {
      // If any required field is empty, do not submit the form
      return;
    }


  
    if (!token) {
      return;
    }

    if (!this.eventId) {  
      
      return;
    }

    this.eventService.indicateInterest(this.eventId, this.numberOfAttendees, token).subscribe({
      next: (response) => {
        console.log(response.message);
        this.showSuccessModal = true;
      },
      error: (error) => {
        console.error('Error booking the event:', error);
      }
    });
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.closeModal.emit();
  }
}
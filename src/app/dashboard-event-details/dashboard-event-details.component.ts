
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { InterestModalComponent } from '../interest-modal/interest-modal.component'; 
import { EventService } from '../services/event.service';
interface Event {
  _id: string;
  title: string;
  hostname: string;
  date: Date;
  img: string;
  liked: boolean;
  description: string;
  tags: string[];
}
@Component({
  selector: 'app-dashboard-event-details',
  standalone: true,
  imports: [CommonModule,InterestModalComponent],
  templateUrl: './dashboard-event-details.component.html',
  styleUrl: './dashboard-event-details.component.css'
})
export class DashboardEventDetailsComponent implements OnInit {
  event: Event | undefined;
  showModal: boolean = false;
  selectedEventId: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEventDetails(eventId);
    } else {
      console.error('No event ID found in route parameters.');
    }
  }

  loadEventDetails(id: string): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.event = events.find((event) => event._id === id);
        if (this.event) {
          this.selectedEventId = this.event._id;
          console.log('Fetched event details:', this.event);
        } else {
          console.error('Event not found with ID:', id);
        }
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      }
    });
  }

  toggleLike(): void {
    if (this.event) {
      this.event.liked = !this.event.liked;
      console.log('Event liked status:', this.event.liked);
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  copyEventLink(): void {
    if (this.event) {
      const eventUrl = `${window.location.origin}/dashboard/dashboard-event-details/${this.event._id}`;
      this.clipboard.copy(eventUrl);
      console.log('Event link copied to clipboard:', eventUrl);
      alert('Event link copied to clipboard!');
    }
  }
}

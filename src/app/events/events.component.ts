import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router'; 
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { StayUpdatedComponent } from '../stay-updated/stay-updated.component';
import { HomeInfoSharedComponent } from '../home-info-shared/home-info-shared.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [HomeInfoSharedComponent, FooterComponent, CommonModule, StayUpdatedComponent, NavbarComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any[] = [];

  constructor(
    private router: Router, 
    private eventService: EventService,
    private clipboard: Clipboard 
  ) { 
   
  }
 
  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      }
    });
  }

  viewEventDetails(event: any): void {
    this.router.navigate(['/event-details', event._id]); 
  }
  
  shareEventLink(event: any): void {
    const eventUrl = `${window.location.origin}/event-details/${event._id}`;
    this.clipboard.copy(eventUrl);
    console.log('Event link copied to clipboard:', eventUrl);
    alert('Event link copied to clipboard!');
  }
  
  copyEventLink(eventId: string): void {
    const eventUrl = `${window.location.origin}/events/${eventId}`;
    navigator.clipboard.writeText(eventUrl).then(() => {
      alert('Event link copied to clipboard!');
    }).catch((error) => {
      console.error('Failed to copy event link:', error);
    });
  }
}

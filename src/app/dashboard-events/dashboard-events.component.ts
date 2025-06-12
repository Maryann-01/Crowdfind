import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router'; 
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { StayUpdatedComponent } from '../stay-updated/stay-updated.component';
@Component({
  selector: 'app-dashboard-events',
  standalone: true,
  imports: [ CommonModule, StayUpdatedComponent],
  templateUrl: './dashboard-events.component.html',
  styleUrl: './dashboard-events.component.css'
})
export class DashboardEventsComponent implements OnInit{
  events: any[] = []; 
  displayedEvents: any[] = [];
  increment: number = 5; 
  startIndex: number = 0; 
  loading: boolean = true;
  
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
    this.router.navigate(['/dashboard/event-details', event._id]); 
  }
  
  shareEventLink(event: any): void {
    const eventUrl = `${window.location.origin}/dashboard/event-details/${event._id}`;
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
  loadMore(): void {
    const moreEvents = this.events.slice(this.startIndex, this.startIndex + this.increment);
    this.displayedEvents = [...this.displayedEvents, ...moreEvents];
    this.startIndex += this.increment; 
  }
}

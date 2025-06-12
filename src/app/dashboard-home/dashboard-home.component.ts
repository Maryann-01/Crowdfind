import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { StayUpdatedComponent } from '../stay-updated/stay-updated.component';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Event {
  _id: string;
  liked?: boolean;
}

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [StayUpdatedComponent, CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent implements OnInit{
  events: any[] = []; 
  displayedEvents: any[] = [];
  increment: number = 5; 
  startIndex: number = 0; 
  loading: boolean = true;
  
  firstName: string | null = '';
  constructor(
    private router: Router, 
    private eventService: EventService,
    private clipboard: Clipboard ,
    private http: HttpClient,
    private authService: AuthService 
  ) {}
 
  ngOnInit(): void {
    this.fetchEvents();
    this.fetchFirstName();
  }
  fetchFirstName(): void {
    this.firstName = localStorage.getItem('firstName');
  }
  fetchEvents(): void {
    this.loading = true; 
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.displayedEvents = this.events.slice(this.startIndex, this.increment); 
      this.loading = false; 
    });
  }

  viewEventDetails(event: any): void {
    this.router.navigate(['dashboard/event-details', event._id]); 
  }

  toggleLike(event: Event): void {
    if (!event || !event._id) {
      console.error('Invalid event object.');
      return;
    }
  
    if (!event.liked) {
      this.saveEvent(event._id).subscribe({
        next: (response) => {
          console.log(response.message);
          event.liked = true;
        },
        error: (error) => {
          console.error('Failed to save event:', error);
        },
        complete: () => {
          console.log('Save event completed.');
        },
      });
    } else {
      console.log('Event is already liked.');
    }
  }
  
  saveEvent(eventId: string) {
    const url = `https://crowdfind-backend.onrender.com/api/auth/save-event/${eventId}`;
    const token = this.authService.getToken();
  
    if (!token) {
      console.error('User is not authenticated. Cannot save event.');
      alert('Please log in to save events.');
      
      // Return an observable that emits an error
      return new Observable<{ message: string }>((observer) => {
        observer.error('User is not authenticated');
        observer.complete();
      });
    }
  
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<{ message: string }>(url, {}, { headers });
  }
  

  // saveEvent(eventId: string) {
  //   const url = `https://crowdfind-backend.onrender.com/api/auth/save-event/${eventId}`;
  //   const token = this.authService.getToken();
  
  //   if (!token) {
  //     console.error('User is not authenticated. Cannot save event.');
  //     alert('Please log in to save events.');
  //     return;
  //   }
  
  //   const headers = { Authorization: `Bearer ${token}` };
  //   return this.http.post<{ message: string }>(url, {}, { headers });
  // }
  

  shareEventLink(event: any): void {
    const eventUrl = `${window.location.origin}/dashboard/event-details/${event._id}`;
    this.clipboard.copy(eventUrl);
    console.log('Event link copied to clipboard:', eventUrl);
    alert('Event link copied to clipboard!');
  }

 
  loadMore(): void {
    const moreEvents = this.events.slice(this.startIndex, this.startIndex + this.increment);
    this.displayedEvents = [...this.displayedEvents, ...moreEvents];
    this.startIndex += this.increment; 
  }
  
}

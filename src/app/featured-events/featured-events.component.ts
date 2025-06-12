import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { EventService } from '../services/event.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-featured-events',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './featured-events.component.html',
  styleUrls: ['./featured-events.component.css']
})
export class FeaturedEventsComponent implements OnInit {
  events: any[] = [];
  displayedEvents: any[] = [];
  increment: number = 6;
  loading: boolean = true;

  constructor(
    private router: Router,
    private eventService: EventService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  get skeletons() {
    return Array(this.increment);
  }

  fetchEvents(): void {
    this.loading = true;
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.displayedEvents = this.events.slice(0, this.increment);
      this.loading = false;
    });
  }

  viewEventDetails(event: any): void {
    this.router.navigate(['/event-details', event._id]);
  }

  toggleLike(event: any): void {
    event.liked = !event.liked;
    console.log('Event liked status:', event.liked);
  }

  shareEventLink(event: any): void {
    const eventUrl = `${window.location.origin}/event-details/${event._id}`;
    this.clipboard.copy(eventUrl);
    console.log('Event link copied to clipboard:', eventUrl);
    alert('Event link copied to clipboard!');
  }

  loadMore(): void {
    const currentLength = this.displayedEvents.length;
    const nextEvents = this.events.slice(currentLength, currentLength + this.increment);
    
    if (nextEvents.length > 0) {
      this.displayedEvents = [...this.displayedEvents, ...nextEvents];
    }
  }

  get hasMoreEvents(): boolean {
    return this.displayedEvents.length < this.events.length;
  }
}
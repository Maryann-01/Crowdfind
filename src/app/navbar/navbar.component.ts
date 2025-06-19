import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [EventService],
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  filteredEvents: any[] = [];
  showDropdown: boolean = false;
  isLoggedIn: boolean = false;
  isNavbarCollapsed: boolean = false;
  private loginCheckInterval: any;

  constructor(
    private eventService: EventService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn;
    this.loginCheckInterval = setInterval(() => {
      const stillLoggedIn = this.authService.loggedIn;
      if (this.isLoggedIn !== stillLoggedIn) {
        this.isLoggedIn = stillLoggedIn;
        if (!stillLoggedIn) {
          this.router.navigate(['/home']);
        }
      }
    }, 10000); // check every 10 seconds
  }

  ngOnDestroy(): void {
    if (this.loginCheckInterval) {
      clearInterval(this.loginCheckInterval);
    }
  }

  toggleLoginState(): void {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.isLoggedIn = false;
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  onSearch(): void {
    if (this.searchQuery.length > 0) {
      this.eventService.getEvents().subscribe({
        next: (events) => {
          this.filteredEvents = events.filter((event) =>
            event.title?.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          this.showDropdown = this.filteredEvents.length > 0;
        },
        error: (error) => {
          console.error('Error fetching events:', error);
          this.filteredEvents = [];
          this.showDropdown = false;
        },
      });
    } else {
      this.filteredEvents = [];
      this.showDropdown = false;
    }
  }

  onSelectEvent(eventId: string | undefined): void {
    if (eventId) {
      this.searchQuery = '';
      this.showDropdown = false;
      this.router.navigate(['/event-details', eventId]);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isDropdown = target.closest('.dropdown-menu') !== null;
    const isSearchInput = target.closest('.nav-form') !== null;

    if (!isDropdown && !isSearchInput) {
      this.showDropdown = false;
    }
  }
}

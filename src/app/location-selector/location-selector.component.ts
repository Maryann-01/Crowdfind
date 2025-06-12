import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-location-selector',
  standalone: true,
  templateUrl: './location-selector.component.html',
  styleUrl: './location-selector.component.css',
  imports: [CommonModule, FormsModule]
  
})
export class LocationSelectorComponent {
  location = {
    country: '',
    state: '',
    town: ''
  };

  closePopup(): void {
    // Logic to close the popup
    console.log('Popup closed');
  }

  onCountryChange(event: Event): void {
    console.log('Country changed:', this.location.country);
  }

  onStateChange(event: Event): void {
    console.log('State changed:', this.location.state);
  }

  submitLocation(): void {
    console.log('Location selected:', this.location);
    // Logic to proceed with the selected location
  }
}


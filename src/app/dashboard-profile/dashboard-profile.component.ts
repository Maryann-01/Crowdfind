import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { StayUpdatedComponent } from '../stay-updated/stay-updated.component';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-dashboard-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, StayUpdatedComponent],
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css'],
})
export class DashboardProfileComponent implements OnInit {

  
  user = {
    name: '',
    email: '',
    address: '',
    password: '',
  };

  profilePicture: string = 'assets/images/user-profile.png'; // Default image

  editMode: boolean = false;
  userLocation: string=" "
  baseUrl: string = 'https://crowdfind-backend.onrender.com';

  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    const token = this.authService.getToken();  // Get token from auth service
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      
      this.http.get<any>(`${this.baseUrl}/api/auth/profile`, { headers })
        .subscribe({
          next: (response) => {
            this.user = response;
            this.userLocation=response.address
           this.profilePicture = response.profilePicture || 'assets/images/user-profile.png'; // Default to placeholder image if none
           this.profileService.setProfilePicture(this.profilePicture);
          },
          error: (error) => {
            console.error('Profile fetch failed:', error);
          }
        });
    }
  }

  triggerFileUpload(): void {
    const fileInput = document.getElementById('profilePictureInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  uploadProfilePicture(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);
      const token = this.authService.getToken();  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });

      this.http.post<any>(`${this.baseUrl}/api/auth/profile/picture`, formData, { headers })
        .subscribe({
          next: (response) => {
            const newImageUrl = response.profilePicture;
            this.profilePicture = newImageUrl; 
            this.profileService.setProfilePicture(newImageUrl);
          },
          error: (error) => {
            console.error('Image upload failed:', error);
          }
        });
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  updateProfile(): void {
    const updatedFirstName = this.user.name.split(' ')[0];
    const updatedUserData = {
      name: this.user.name,
      email: this.user.email,
      address: this.user.address,
      password: this.user.password,
    };
    
    const token = this.authService.getToken();  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    this.http.put(`${this.baseUrl}/api/auth/profile`, updatedUserData, { headers })
      .subscribe({
        next: (response) => {
          console.log('Profile updated successfully', response);
          localStorage.setItem('firstName', updatedFirstName);
          
        },
        error: (error) => {
          console.error('Profile update failed:', error);
        }
      });
  }
}

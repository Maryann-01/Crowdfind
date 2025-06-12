import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = ''; 
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  termsAccepted: boolean = false;
  showSuccessModal: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    
    const firstName = this.name.split(' ')[0]; 

    if (this.password === this.confirmPassword && this.termsAccepted) {
      const registerData = {
        name: this.name,   
        email: this.email,
        password: this.password
      };

      this.http.post('https://crowdfind-backend.onrender.com/api/auth/register', registerData)
        .subscribe({
          next: (response: any) => {
            console.log('Registration successful', response);
            this.showSuccessModal = true;
            localStorage.setItem('firstName', firstName);

            setTimeout(() => {
              this.closeModal();
              this.router.navigate(['/login']); 
            }, 3000);
          },
          error: (error) => {
            console.error("Registration failed", error);
            // alert('Registration failed. Please try again.');
          }
        });
    } else {
      // alert('Please make sure passwords match and terms are accepted.');
    }
  }

  closeModal(): void {
    this.showSuccessModal = false;
  }
}

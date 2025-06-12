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
  passwordError: string = '';
  confirmPasswordError: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  validatePassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const minLength = password.length >= 8;

    if (!minLength) {
      this.passwordError = 'Password must be at least 8 characters long';
      return false;
    }
    if (!hasUpperCase) {
      this.passwordError = 'Password must contain at least one uppercase letter';
      return false;
    }
    if (!hasLowerCase) {
      this.passwordError = 'Password must contain at least one lowercase letter';
      return false;
    }
    if (!hasNumbers) {
      this.passwordError = 'Password must contain at least one number';
      return false;
    }
    if (!hasSpecialChar) {
      this.passwordError = 'Password must contain at least one special character';
      return false;
    }

    this.passwordError = '';
    return true;
  }

  validateForm(): boolean {
    let isValid = true;
    this.passwordError = '';
    this.confirmPasswordError = '';
    if (!this.password) {
      this.passwordError = 'Password is required';
      isValid = false;
    } else if (!this.validatePassword(this.password)) {
      isValid = false;
    }
    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please confirm your password';
      isValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.validateForm()) {
      return;
    }

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
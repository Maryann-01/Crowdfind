// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { AuthService } from '../services/auth.services';
// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   imports: [FormsModule, RouterModule]
// })
// export class LoginComponent {
//   email: string = '';
//   // user: string = '';
//   password: string = '';
//   rememberMe: boolean = false; 

//   constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}
//   onSubmit() {
//     const loginData = { email: this.email, password: this.password };
//     this.http.post<{ token: string }>('https://crowdfind-backend.onrender.com/api/auth/login', loginData)
//       .subscribe({
//         next: (response) => {
//           // Save token in AuthService or localStorage
//           this.authService.login(response.token);
  
//           // Fetch user details
//           this.http.get<{ name: string }>('https://crowdfind-backend.onrender.com/api/auth/login', {
//             headers: {
//               Authorization: `Bearer ${response.token}`,
//             }
//           }).subscribe({
//             next: (userData) => {
//               const firstName = userData.name.split(' ')[0]; // Extract first name
//               localStorage.setItem('firstName', firstName); // Save it locally
//               this.router.navigate(['/dashboard/dashboardhome']); 
//             },
//             error: (error) => {
//               console.error('Failed to fetch user details', error);
//               // alert('Unable to fetch user details. Please try again later.');
//             }
//           });
//         },
//         error: (error) => {
//           console.error('Login failed', error);
//           // alert('Invalid email or password. Please try again.');
//         }
//       });
//   }
  
//   // onSubmit() {
//   //   const loginData = { email: this.email, password: this.password };
//   //   this.http.post<{ token: string }>('https://crowdfind-backend.onrender.com/api/auth/login', loginData)
//   //     .subscribe({
//   //       next: (response) => {
//   //         this.authService.login(response.token); 
//   //         const fullName = response.user.name; 
//   //         const firstName = fullName.split(' ')[0];
//   //         localStorage.setItem('firstName', firstName); 
//   //         this.router.navigate(['/dashboard/dashboardhome']);  
//   //       },
//   //       error: (error) => {
//   //         console.error("Login failed", error);
//   //       }
//   //     });
//   // }
// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false; 

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onSubmit() {
    const loginData = { email: this.email, password: this.password };
    this.http.post<{ token: string }>('https://crowdfind-backend.onrender.com/api/auth/login', loginData)
      .subscribe({
        next: (response) => {
         
          this.authService.login(response.token);

          this.router.navigate(['/dashboard/dashboardhome']);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-ready',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './account-ready.component.html',
  styleUrl: './account-ready.component.css'
  
})
export class AccountReadyComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/home']); // Replace '/home' with your actual home route
    }, 10000); // Redirect after 10 seconds
  }
}






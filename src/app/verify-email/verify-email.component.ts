import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
})
export class VerifyEmailComponent implements OnInit {
  countdown: number = 10;

  ngOnInit() {
    const timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }
}

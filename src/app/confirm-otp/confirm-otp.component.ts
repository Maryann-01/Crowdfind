import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.css'
})
export class ConfirmOtpComponent {

}

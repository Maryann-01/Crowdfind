import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
  
  
})
export class EmailVerificationComponent {

}

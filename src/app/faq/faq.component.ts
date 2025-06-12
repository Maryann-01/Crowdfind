import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs = [
    { 
      question: 'How do I book an event?', 
      answer: 'To book an event, browse through our available listings, select your desired event, and follow the booking instructions provided.', 
      isOpen: false 
    },
    { 
      question: 'How do I receive my tickets?', 
      answer: "Once you've completed your booking, your tickets and confirmation will be sent to your email instantly. You can also access them through your account on the platform.", 
      isOpen: false 
    },
    { 
      question: 'Can I cancel or reschedule my booking?', 
      answer: 'Yes, cancellations and rescheduling options are available within a specified timeframe. Visit your bookings section for details on cancellation policies.', 
      isOpen: false 
    },
    { 
      question: 'What should I do if I have issues with my booking?', 
      answer: 'If you encounter any issues with your booking, contact our support team through the "Help" section for prompt assistance.', 
      isOpen: false 
    }
];


  
  toggleAccordion(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

}

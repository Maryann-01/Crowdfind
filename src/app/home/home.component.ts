import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeInfoComponent } from '../home-info/home-info.component';
import { FooterComponent } from '../footer/footer.component';
import { StayUpdatedComponent } from '../stay-updated/stay-updated.component';
import { FeaturedEventsComponent } from '../featured-events/featured-events.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,HomeInfoComponent,FooterComponent,StayUpdatedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

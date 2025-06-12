import { Component } from '@angular/core';
import { FeaturedEventsComponent } from "../featured-events/featured-events.component";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FaqComponent } from "../faq/faq.component";
import { HomeInfoSharedComponent } from '../home-info-shared/home-info-shared.component';

@Component({
  selector: 'app-home-info',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, FeaturedEventsComponent, FaqComponent,HomeInfoSharedComponent],
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.css'],
})
export class HomeInfoComponent {

}



import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from '../footer/footer.component';
import { StayUpdatedComponent } from '../stay-updated/stay-updated.component';
import { CommonModule } from '@angular/common';

import { HomeInfoSharedComponent } from '../home-info-shared/home-info-shared.component';
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule,HomeInfoSharedComponent,FooterComponent,NavbarComponent,StayUpdatedComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  teamMembers = [
    { name: 'Dubem', job: 'Project Manager', image: 'assets/images/Chidubem Ojukwu.jpg' },
    { name: 'GodFirst', job: 'UI/UX Designer', image: 'assets/images/Godfirst Azubuike.jpg' },
    { name: 'Tejiri', job: 'UI/UX Designer', image: 'assets/images/Oghenetejiri Omaduvie.JPG' },
    { name: 'Blessing', job: 'Backend Developer', image: 'assets/images/Blessing Peters.JPG' },
    { name: 'Amarachukwu', job: 'Backend Developer', image: 'assets/images/Amarachukwu Nweke.jpg' },
    { name: 'Mmesoma', job: 'Frontend Developer', image: 'assets/images/Mmesoma Amaraizu.JPEG' },
    { name: 'Reagan', job: 'Frontend Developer', image: 'assets/images/Reagan Ijeomah.jpg' },
    { name: 'Jessica', job: 'Quality Assurance', image: 'assets/images/Jessica Wada.jpg' }
  ];
}

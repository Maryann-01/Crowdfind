import { Component ,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService,
     private router: Router,
     private profileService: ProfileService
  ){}
  
  profilePicture: string = 'assets/images/user-profile.png'; // Default image
  firstName: string = 'Jessica';


  ngOnInit(): void {
    
    this.profileService.profilePicture$.subscribe((newProfilePicture) => {
      this.profilePicture = newProfilePicture;
    });
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/home']); 
  }

}

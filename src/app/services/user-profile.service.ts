import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private profilePictureSubject = new BehaviorSubject<string>('./assets/images/user-image.png');
  profilePicture$ = this.profilePictureSubject.asObservable();

  constructor() {}

  // Method to update the profile picture URL
  setProfilePicture(url: string): void {
    this.profilePictureSubject.next(url);
  }
}

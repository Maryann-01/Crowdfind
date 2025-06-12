import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profilePictureSubject = new BehaviorSubject<string>('assets/images/user-profile.png');
  profilePicture$ = this.profilePictureSubject.asObservable();

  constructor() {}

  setProfilePicture(url: string): void {
    this.profilePictureSubject.next(url); // Update the profile picture URL
  }
}

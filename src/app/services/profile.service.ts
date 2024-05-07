import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../common/Profile";
import {map, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profiles: Profile[] = [];
  private profiles$ = new Subject<Profile[]>();
  readonly url = 'http://localhost:3000/profiles';
  constructor(private http: HttpClient) {
    this.profiles = [];
  }

  getProfiles(){
    this.http.get<{profiles: Profile[]}>(this.url).pipe(
      map((profileData) => {
        return profileData.profiles;
      })
    ).subscribe((profiles) => {
      console.log(profiles);
      this.profiles = profiles;
      this.profiles$.next(this.profiles);
    })
  }

  getProfilesStream(){
    return this.profiles$.asObservable();
  }

  addProfile(name: string, image: File){
    const profileData = new FormData();
    profileData.append('name',name);
    profileData.append('image',image, name);
    this.http.post<{profile: {createdProfile: Profile}}>(this.url, profileData)
      .subscribe({
        next: profileData => {
          const profile: Profile = {
            _id: profileData.profile.createdProfile._id,
            name: name,
            imagePath: profileData.profile.createdProfile.imagePath
          }
          this.profiles.push(profile);
          this.profiles$.next(this.profiles);
        },
        error: err => {
          console.error(err);
        }
      })
  }
}

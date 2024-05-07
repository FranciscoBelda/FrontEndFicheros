import {Component, OnDestroy} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../common/Profile";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.css']
})
export class AllProfilesComponent implements OnDestroy{
  profiles: Profile[] = [];
  private  profileSubscription: Subscription;
  constructor(private profileService: ProfileService) {
    this.profileService.getProfiles();
    this.profileSubscription = this.profileService.getProfilesStream()
      .subscribe((profiles: Profile[]) => {
        this.profiles  = profiles;
      } )
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }
}

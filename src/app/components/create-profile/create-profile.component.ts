import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Profile} from "../../common/Profile";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent {

  form: FormGroup;
  profile!: Profile;
  imageData!: string;

  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService) {
    this.form = this.formBuilder.group({
      name: [null],
      image: [null],
    })
  }

  onFileSelect(event: any) {

    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    const allowedMimeTypes = ['image/png','image/jpg','image/jpeg'];
    if(file && allowedMimeTypes.includes(file.type)){
      const reader = new FileReader();
      // Necesitamos que la imagen esté cargada para usarla
      reader.onload = () => {
        this.imageData = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    this.profileService.addProfile(this.form.value.name, this.form.value.image);
    this.form.reset();
    this.imageData = '';
  }


}

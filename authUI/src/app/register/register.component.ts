import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


import { MustMatch } from '../_helpers/must-match.validators';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  backgroundUrl = '../../assets/dark-material-bg.jpg';
  registerForm: FormGroup;
  submitted = false;
  hide = true;
  selectedFile: File;
  imgURL: any;
  mimeType: any;
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private cd: ChangeDetectorRef,
    private router: Router
    ) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      uploadImage: [null, Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  get f() { return this.registerForm.controls; }

  fileType(control: FormControl) {
    console.log(control);

    this.mimeType = control.value.FileList.type;
    console.log(this.mimeType);
    if (this.mimeType.match(/image\/*/) == null) {
      // this.registerForm.contains[5].error = "Only images are supported.";
      return;
    }
    // let imgValue = this.mimeType;
    // if (this.mimeType.match(/image\/*/) == null) {
    //   console.log(imgValue);
    //   // this.registerForm.contains[5].error = "Only images are supported.";
    //   return;
    // }
    return null;
  }
  preview(event) {

    // tslint:disable-next-line:curly
    if (event.target.files.length === 0)
      return;
      let reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.imgURL = reader.result;
          this.registerForm.patchValue({
            uploadImage: event.target.files[0]
          });

          // need to run CD since file load runs outside of zone
          this.cd.markForCheck();
        };
      }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
      this.registerService.upload(this.registerForm.controls.uploadImage.value);
     this.registerService.register(this.registerForm.value)
        .subscribe(data => {
          console.log(data);
          // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
          this.router.navigateByUrl('/login');
        });


}

}

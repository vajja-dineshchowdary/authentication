import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
     this.loginService.login(this.loginForm.value)
        .subscribe(data => {
          console.log(data);

          console.log(data['_id']);
          if (data['_id']) {
            localStorage.setItem('User', JSON.stringify(data));
            this.router.navigateByUrl('/Dashboard');
          }
          // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
        });


}

  }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: any;
  submitClick = false;
  submitted = false;
  username: any;
  newpassword: any;
  error = '';

  public message = '';
  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      userName: ['', Validators.required],
      newpassword: ['', Validators.required],
    });
  }

  get formData() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotForm.invalid) {
      return;
    }
    this.username = this.forgotForm.controls['userName'].value;
    this.newpassword = this.forgotForm.controls['newpassword'].value;
    this.message = 'Password Successfully Changed';
    this.userService.ForgotPassword(this.username, this.newpassword).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        this.error = error;
        this.submitClick = false;
      }
    );
  }
}

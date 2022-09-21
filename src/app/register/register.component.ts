import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errMsg: any;
  LoggedInCheack = false;
  myForm: any;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    // this.myForm = new FormGroup({
    //   FirstName: new FormControl(''),
    //   LastName: new FormControl(''),
    //   Email: new FormControl(''),
    //   UserName: new FormControl(''),
    //   Password: new FormControl(''),
    //   ConfirmPassword: new FormControl(''),
    //   PhoneNumber: new FormControl(''),
    // });
    this.myForm = this.fb.group({
      FirstName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      LastName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      UserName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],

      PhoneNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\?)|0)?[0-9]{10}$')],
      ],
    });
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    let user = new User();
    user.firstName = form.value.FirstName;
    user.lastName = form.value.LastName;
    user.email = form.value.Email;
    user.userName = form.value.UserName;
    user.password = form.value.Password;
    user.contactNo = form.value.PhoneNumber;
    console.log(user);
    this.userService.Register(user).subscribe(
      (result: any) => {
        console.warn(result);
        this.errMsg = 'Registered Successfully ';
      },
      (err: any) => {
        console.log(err);
        this.errMsg = 'Please Fill the  Fields ';
      }
    );
    form.reset();
    window.alert('Registered Successfully');
  }
}

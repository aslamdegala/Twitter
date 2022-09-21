import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  myForm: any;
  errMsg: any;
  loginForm: any;
  id: any;
  password: any;

  error = '';
  result: any;
  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      Username: [
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
    });
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    this.id = form.value.Username;
    this.password = form.value.Password;

    this.userService.Authenticate(this.id, this.password).subscribe(
      (res: any) => {
        this.userService.LoginAgent(res);

        console.warn('log', res);
        this.result = res;
      },
      (err: any) => {
        console.log(err);
        this.errMsg = 'Username or Password is Incorrect';
      }
    );
  
  }

}

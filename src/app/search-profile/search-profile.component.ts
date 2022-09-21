import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.css'],
})
export class SearchProfileComponent implements OnInit {
  UserList: any;
  flag = false;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.GetAllProfiles();
  }

  ngOnInit(): void {}
  GetAllProfiles() {
    this.userService.GetAllProfiles().subscribe((data) => {
      console.warn(data);
      this.UserList = data;
      if (this.UserList.length === 0) {
        this.flag = true;
      }
    });
  }
  contactForm = new FormGroup({
    uname: new FormControl(),
  });

  onSubmit() {
    const data = this.contactForm.value;
    console.log(data.uname);
    console.log(this.contactForm.value);

    this.userService.GetProfile(data.uname).subscribe((data) => {
      console.warn(data);
      this.UserList = data;
      if (this.UserList.length === 0) {
        this.flag = true;
      }
    });
  }

  ViewProfile(name: string) {
    this.userService.StroreName(name);
  }
}

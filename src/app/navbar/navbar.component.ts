import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private userService: UserService) {}
  isLoggedIn = this.userService.isLoggedIn;
  ngOnInit(): void {}
  logout() {
    this.userService.Logout();
    window.location.reload();
  }
  login() {
    return this.isLoggedIn;
  }
}

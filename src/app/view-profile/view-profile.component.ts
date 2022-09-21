import { Component, OnInit } from '@angular/core';
import { TweetService } from '../tweet.service';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { reply } from '../reply';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  name: any;
  UserDetails: any;
  TweetsList: any;
  isCollapsed1 = true;
  isCollapsed2 = true;
  flag = false;
  errMsg: any;
  constructor(
    private userService: UserService,
    private tweetService: TweetService
  ) {
    this.name = this.userService.Restore();
    this.GetProfile();
    this.getAllTweet();
  }

  ngOnInit(): void {}
  GetProfile() {
    this.userService.GetProfile(this.name).subscribe((data) => {
      console.warn(data);
      this.UserDetails = data;
      if (this.UserDetails.length === 0) {
        this.flag = true;
      }
    });
  }
  getAllTweet() {
    this.tweetService.getAllTweetOfUser(this.name).subscribe((data) => {
      console.warn(data);
      this.TweetsList = data;
      if (this.TweetsList.length === 0) {
        this.flag = true;
      }
    });
  }
  OnLike(id: number) {
    console.log(id);
    this.tweetService.OnLike(id).subscribe(
      (result) => {
        console.warn(result);
        this.errMsg = 'Tweet Liked Successfully ';
      },
      (err) => {
        console.log(err);
        this.errMsg = 'Error  Fields ';
      }
    );
  }

  onComment(c: NgForm, id: number) {
    let desp = c.value.replymsg;
    let hash = c.value.replytag;
    let r = new reply();
    r.replyMsg = desp;
    r.tweetReplytag = hash;
    r.username = sessionStorage.getItem('UserName');
    console.log(r);
    this.tweetService.Comment(r, id).subscribe(
      (result) => {
        console.warn(result);
        this.errMsg = 'comment Posted Successfully ';
      },
      (err) => {
        console.log(err);
        this.errMsg = 'Please Fill the  Fields ';
      }
    );
  }
}

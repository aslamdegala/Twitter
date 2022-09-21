import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { TweetService } from '../tweet.service';
import { reply } from '../reply';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  username = sessionStorage.getItem('UserName');
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
    this.GetProfile();
    this.getAllTweet();
  }

  ngOnInit(): void {}
  GetProfile() {
    this.userService.GetProfile(this.username).subscribe((data) => {
      console.warn(data);
      this.UserDetails = data;
      if (this.UserDetails.length === 0) {
        this.flag = true;
      }
    });
  }
  getAllTweet() {
    this.tweetService.getAllTweetOfUser(this.username).subscribe((data) => {
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
    window.location.reload();
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
    window.location.reload();
    c.reset();
  }
  DeletePost(user: any, id: number) {
    console.log(id, user);
    this.tweetService.DeletePost(user, id).subscribe(
      (result: any) => {
        console.warn(result);
        this.errMsg = 'Tweet Posted Successfully ';
      },
      (err: any) => {
        console.log(err);
        this.errMsg = 'Please Fill the  Fields ';
      }
    );
    window.location.reload();
  }
  EditTweetId(id: number) {
    console.log('passig' + id);
    this.tweetService.StroreTweetId(id);
  }
}

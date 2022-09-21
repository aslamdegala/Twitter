import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { reply } from '../reply';
import { tweet } from '../tweet';
import { like } from '../like';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isCollapsed1 = true;
  isCollapsed2 = true;
  errMsg: any;
  flag: any;
  TweetsList: any;
  constructor(private tweetService: TweetService) {
    this.getAllTweet();
  }

  ngOnInit(): void {}
  getAllTweet() {
    this.tweetService.getAllTweet().subscribe((data) => {
      console.warn(data);
      this.TweetsList = data;
      if (this.TweetsList.length === 0) {
        this.flag = true;
      }
    });
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

    c.reset();
  }
  onSubmit(f: NgForm) {
    let desp = f.value.description;
    let hash = f.value.hashtags;
    let username = sessionStorage.getItem('UserName');
    let r = Array<reply>();
    let l = Array<like>();

    console.log(desp, hash, username);
    let tw = new tweet();
    tw.tweetDesp = desp;
    tw.tweetTag = hash;
    tw.userName = username;
    tw.tweetReply = r;
    tw.tweetLikes = l;
    console.log('from service ' + tw);

    this.tweetService.Post(tw).subscribe(
      (result) => {
        console.warn(result);
        this.errMsg = 'Tweet Posted Successfully ';
      },
      (err) => {
        console.log(err);
        this.errMsg = 'Please Fill the  Fields ';
      }
    );

    f.reset();
  }
  OnLike(id: number) {
    console.log(id);
    this.tweetService.OnLike(id).subscribe(
      (result) => {
        console.warn(result);
        this.errMsg = 'Tweet Posted Successfully ';
      },
      (err) => {
        console.log(err);
        this.errMsg = 'Please Fill the  Fields ';
      }
    );
  }
}

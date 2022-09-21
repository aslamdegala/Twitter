import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { reply } from '../reply';
import { like } from '../like';
import { TweetService } from '../tweet.service';
import { tweet } from '../tweet';
@Component({
  selector: 'app-edit-tweet',
  templateUrl: './edit-tweet.component.html',
  styleUrls: ['./edit-tweet.component.css'],
})
export class EditTweetComponent implements OnInit {
  tweetid: any;
  constructor(private tweetService: TweetService) {
    this.tweetid = this.tweetService.RestoreTweetId();
  }
  errMsg: any;
  ngOnInit(): void {}
  onSubmit(f: NgForm) {
    let desp = f.value.description;
    let hash = f.value.hashtags;
    let username = sessionStorage.getItem('UserName');

    console.log(desp, hash, username);
    let tw = new tweet();
    tw.tweetDesp = desp;
    tw.tweetTag = hash;
    tw.userName = username;

    console.log('from service ' + tw);
    this.tweetService.EditTweet(this.tweetid, tw).subscribe(
      (result) => {
        console.warn(result);
        this.errMsg = 'Tweet Updated Successfully ';
      },
      (err) => {
        console.log(err);
        this.errMsg = 'Please Fill the  Fields ';
      }
    );
      
    window.location.reload();
    f.reset();
    window.alert('Tweet is Updated Successfully');
  }
}

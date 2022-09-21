import { Injectable } from '@angular/core';
import { tweet } from './tweet';
import { HttpClient } from '@angular/common/http';
import { reply } from './reply';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  username = sessionStorage.getItem('UserName');
  tid: any;
  constructor(private http: HttpClient) {}
  Post(tw: tweet) {
    console.warn(tw);

    return this.http.post(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/' +
        tw.userName +
        '/Add',
      tw
    );
  }
  getAllTweet() {
    return this.http.get(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/AllTweet'
    );
  }

  Comment(r: reply, id: number) {
    return this.http.post(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/' +
        this.username +
        '/Reply/' +
        id,
      r
    );
  }
  OnLike(id: number) {
    return this.http.put(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/' +
        this.username +
        '/Like/' +
        id,
      id
    );
  }
  getAllTweetOfUser(username: string | null) {
    return this.http.get(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/Username?username=' +
        username
    );
  }
  DeletePost(user: any, id: number) {
    return this.http.delete(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/' +
        user +
        '/Delete/' +
        id
    );
  }
  EditTweet(tweetid: number, tw: tweet) {
    return this.http.put(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/' +
        tw.userName +
        '/Update/' +
        tweetid,
      tw
    );
  }
  StroreTweetId(tid: number) {
    console.log('from st0re' + tid);
    this.tid = tid;
  }
  RestoreTweetId() {
    return this.tid;
  }
}

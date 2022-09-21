import { like } from './like';
import { reply } from './reply';
export class tweet {
  id: string | any;
  tweetDesp: string | any;
  tweetTag: string | any;
  tweetReply: Array<reply> | any;
  tweetLikes: Array<like> | any;
  tweetTime: string | any;
  userName: string | any;
  tweetId: number | any;
}

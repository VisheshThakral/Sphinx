export interface Tweet {
  _id: number;
  content: string;
  author: string;
  authorUsername: string;
  authorImgPath: string;
  timestamp: Date;
  likes: number;
  retweets: number;
  comments: number;
  views: number;
}

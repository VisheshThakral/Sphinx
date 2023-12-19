export interface Sphinx {
  _id: number;
  content: string;
  author: string;
  authorUsername: string;
  authorImgPath: string;
  timestamp: Date;
  likes: number;
  repost: number;
  comments: number;
  views: number;
}

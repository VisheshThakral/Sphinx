export interface Sphinx {
  sphinxId: string;
  fullName: string;
  userImage: string;
  userName: string;
  content: string;
  likes: number;
  reposts: number;
  createdAt: Date,
  isLikedByUser: boolean;
  isRepostedByUser: boolean;
}

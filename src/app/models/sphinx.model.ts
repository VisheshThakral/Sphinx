export interface Sphinx {
  sphinxId: string;
  userName: string;
  content: string;
  likes: number;
  reposts: number;
  createdAt: Date,
  isLikedByUser: boolean;
  isRepostedByUser: boolean;
}

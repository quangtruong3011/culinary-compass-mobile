import { Comment } from "./comment.interface";

export interface CommentState {
  comments: Comment[] | null;
  currentComment: Comment | null;
  isLoading: boolean;
  error: string | null;
}

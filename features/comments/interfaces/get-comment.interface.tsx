import { SingleResponse } from "@/shared/api-response";
import { Comment } from "./comment.interface";

export interface GetCommentDto extends SingleResponse<Comment> {}
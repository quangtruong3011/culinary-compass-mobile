import { PaginatedResponse } from "@/shared/api-response";
import { Comment } from "./comment.interface";

export interface GetAllCommentForRestaurant extends PaginatedResponse<Comment> {}
import { Types } from "mongoose";


// Define the Vote interface
export interface IVote extends Document {
    user: Types.ObjectId; // Reference to the User
    post: Types.ObjectId; // Reference to the Post
    voteType: 'Upvote' | 'Downvote'; // Vote type can be either Upvote or Downvote
}

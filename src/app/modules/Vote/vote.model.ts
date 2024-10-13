import mongoose, { Schema } from 'mongoose';
import { IVote } from './vote.interface';

// Define the vote schema
const voteSchema: Schema<IVote> = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Reference to Post model
    voteType: { type: String, enum: ['Upvote', 'Downvote'], required: true },   // Enum for Upvote and Downvote
});

// Create and export the Vote model
export const Vote = mongoose.model<IVote>('Vote', voteSchema);

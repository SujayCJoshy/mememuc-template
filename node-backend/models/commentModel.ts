import { Schema, model, Types } from "mongoose";
import { User } from "./userModel"; // Assuming you have exported the User interface

interface Comment {
  userId: Types.ObjectId;
  text: string;
  date: Date;
}

const commentSchema = new Schema<Comment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const CommentModel = model<Comment>('Comment', commentSchema);

export { CommentModel, Comment };

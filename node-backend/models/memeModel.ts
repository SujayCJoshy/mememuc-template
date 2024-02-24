import { Schema, model, Types } from "mongoose";
import { Comment } from "./commentModel"; // Make sure to export Comment interface

interface Meme {
  title: string;
  topCaption: string;
  bottomCaption: string;
  template: Types.ObjectId;
  user: Types.ObjectId;
  creationDate: Date;
  comments: Types.DocumentArray<Comment>;
  views: number;
  votes: number;
  isPrivate: boolean;
}

const memeSchema = new Schema<Meme>({
  title: { type: String, required: true },
  topCaption: { type: String, required: true },
  bottomCaption: { type: String, required: true },
  template: { type: Schema.Types.ObjectId, ref: 'Template', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creationDate: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  views: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  isPrivate: { type: Boolean, default: false },
}, { timestamps: true });

const MemeModel = model<Meme>('Meme', memeSchema);

export { MemeModel, Meme };

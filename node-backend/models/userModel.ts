import { Schema, model } from "mongoose";

interface User {
  username: string;
  userid: string;
  useremail: string;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    unique: true,
    required: true,
  },
  useremail: {
    type: String,
    unique: true,
    required: true,
  },
});

const UserModel = model<User>('User', userSchema);

export { UserModel, User };

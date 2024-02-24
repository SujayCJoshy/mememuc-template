const express = require("express");
require('dotenv').config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user");
const Meme = require("./models/meme");
const Template = require("./models/template");
const Comment = require("./models/comment");

const app = express();
const PORT = process.env.DATALAYERPORT; // Port to listen on

app.use(bodyParser.json());

async function startServer() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Mongoose connected to database at ${uri}`);

  // Users
  app.post("/users", async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.patch("/users/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.delete("/users/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Memes
  app.post("/memes", async (req, res) => {
    try {
      const meme = new Meme(req.body);
      await meme.save();
      res.status(201).send(meme);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/memes", async (req, res) => {
    try {
      const memes = await Meme.find({});
      res.send(memes);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.patch("/memes/:id", async (req, res) => {
    try {
      const meme = await Meme.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!meme) {
        return res.status(404).send();
      }
      res.send(meme);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.delete("/memes/:id", async (req, res) => {
    try {
      const meme = await Meme.findByIdAndDelete(req.params.id);
      if (!meme) {
        return res.status(404).send();
      }
      res.send(meme);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Templates
  app.post("/templates", async (req, res) => {
    try {
      const template = new Template(req.body);
      await template.save();
      res.status(201).send(template);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/templates", async (req, res) => {
    try {
      const templates = await Template.find({});
      res.send(templates);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.patch("/templates/:id", async (req, res) => {
    try {
      const template = await Template.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!template) {
        return res.status(404).send();
      }
      res.send(template);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.delete("/templates/:id", async (req, res) => {
    try {
      const template = await Template.findByIdAndDelete(req.params.id);
      if (!template) {
        return res.status(404).send();
      }
      res.send(template);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Comments
  app.post("/comments", async (req, res) => {
    try {
      const comment = new Comment(req.body);
      await comment.save();
      res.status(201).send(comment);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/comments", async (req, res) => {
    try {
      const comments = await Comment.find({});
      res.send(comments);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.patch("/comments/:id", async (req, res) => {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!comment) {
        return res.status(404).send();
      }
      res.send(comment);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.delete("/comments/:id", async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) {
        return res.status(404).send();
      }
      res.send(comment);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Clean up when the process is closed
  process.on("SIGINT", async () => {
    await mongoose.disconnect();
    await mongod.stop();
    console.log("MongoDB Memory Server and Mongoose connection closed");
    process.exit(0);
  });
}

startServer().catch(console.error);

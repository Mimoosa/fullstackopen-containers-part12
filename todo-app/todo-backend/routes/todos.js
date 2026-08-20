const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { createClient } = require("redis");

let client;
const initRedis = async () => {
  client = createClient({ url: process.env.REDIS_URL });
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
};

initRedis();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  const value = await client.get("added_todos");
  await client.set("added_todos", Number(value) + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.deleteOne();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const { text, done } = req.body;

  if (text !== undefined) req.todo.text = text;
  if (done !== undefined) req.todo.done = done;

  const result = await req.todo.save();
  res.json(result);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;

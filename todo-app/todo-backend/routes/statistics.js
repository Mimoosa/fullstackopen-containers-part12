const express = require("express");
const router = express.Router();
const { createClient } = require("redis");

let client;
const initRedis = async () => {
  client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
};
initRedis();

router.get("/", async (req, res) => {
  const value = await client.get("added_todos");
  res.json({ added_todos: Number(value) });
});

module.exports = router;

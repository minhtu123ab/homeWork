import express, { json } from "express";
const app = express();
app.use(express.json());
app.get("/users", (req, res) => {
  res.send("get is successfull");
});
app.post("/users", (req, res) => {
  res.send("post is successfull");
});
app.put("/users", (req, res) => {
  res.send("put is successfull");
});
app.delete("/users", (req, res) => {
  res.send("delete is successfull");
});

app.listen(8080, () => {
  console.log("Server is running");
});

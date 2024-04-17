import express from "express";
import mongoose from "mongoose";
import accountModel from "./model/accountModel.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/account");

app.listen(8080, () => {
  console.log("Server running...");
});

app.get("/account", async (req, res) => {
  try {
    const data = await accountModel.find();
    res.status(200).send({
      message: "get accounts successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving accounts",
    });
  }
});

app.get("/account/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await accountModel.findById(id);
    if (!data) {
      return res.status(404).send({ message: "Account not found" });
    }
    res.status(200).send({
      message: "get account by id successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send({
      message: "Invalid ID format",
    });
  }
});

app.post("/account", async (req, res) => {
  try {
    const { username, password, full_name, birthday, address } = req.body;
    if (!username || !password || !full_name || !birthday || !address) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const account = await accountModel.create({
      username,
      password,
      full_name,
      birthday,
      address,
    });
    res.status(201).send({
      message: "Account created successfully",
      data: account,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating account",
    });
  }
});

app.put("/account/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const accountUpdate = await accountModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!accountUpdate) {
      return res.status(404).send({ message: "Account not found" });
    }
    res.status(200).send({
      message: "Account updated successfully",
      data: accountUpdate,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error updating account",
    });
  }
});

app.delete("/account/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await accountModel.findByIdAndDelete(id);
    if (!account) {
      return res.status(404).send({ message: "Account not found" });
    }
    res.send({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(400).send({
      message: "Error deleting account",
    });
  }
});

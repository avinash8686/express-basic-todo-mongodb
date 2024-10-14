const Todos = require("../model/Todos");

// Fn for get api
const getTodoList = async (req, res) => {
  try {
    const todos = await Todos.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Fn for posts api
const createATodo = async (req, res) => {
  try {
    console.log("creatin todo....", req.body, req.user);
    const newPost = Todos.create({ title: req.body.title, user: req.user._id });
    if (!newPost) throw Error("Something went wrong while saving the post");
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ message: err });
  }
};

// Fn for delete api
const deleteATodo = async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);
    if (!todo) throw Error("Something went wrong while deleting the post");
    const deletedTodo = await Todos.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: err });
  }
};

// Fn for update
const updateATodo = async (req, res) => {
  console.log("req.params", req.params);
  try {
    const todo = await Todos.findById(req.params.id);
    if (!todo) throw Error("Something went wrong while updating the post");
    const updatedTodo = await Todos.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: err });
  }
};

// Fn for get by id
// const getById = async (req, res) => {
//   try {
//     const post = await Posts.findById(req.params.id);
//     if (!post) throw Error("no items");
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(400).json({ message: err });
//   }
// };

module.exports = {
  getTodoList,
  createATodo,
  deleteATodo,
  updateATodo,
};

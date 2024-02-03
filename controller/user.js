const fs = require("fs");
// const data = fs.readFileSync('./data.json', 'utf-8');
// const todos = JSON.parse(data).todos;

const model = require("../models/user");
const User = model.User;

exports.getAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.get = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    res.status(404).json(error.message);    
  }

};


exports.replace = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findOneAndReplace({_id:id}, req.body, {new: true});
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.findOneAndUpdate({_id:id}, req.body, {new:true})
  .then(doc => res.json(doc))
  .catch(err => res.json(err.message));
}

exports.deleteIt = (req, res) => {
  const id = req.params.id;

  User.findOneAndDelete({_id:id})
  .then(doc => res.json(doc))
  .catch(err => res.json(err.message));  
};



//you can use either
// 1. Async/await + try and catch
// 2. Promise -> then and catch
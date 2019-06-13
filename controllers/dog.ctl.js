const Dog = require("../models/dog");
const errobj = require("../errObj");

exports.isNickExists = (req, res) => {
  const nickName = req.query.nickName;

  Dog.find({
    Name: nickName
  })
    .then(result => {
      res.send(result.length > 0 ? true : false);
    })
    .catch(err => {
      return res.send(errobj(500, err));
    });
};

exports.getDogInfoBynickName = (req, res) => {
  const nickName = req.query.nickName;

  Dog.find({
    Name: nickName
  })
    .then(result => {
      console.log(result);
      res.send(result.length > 0 ? result : errobj(404, "Dog not found"));
    })
    .catch(err => {
      return res.send(errobj(500, err));
    });
};

exports.dogsSignUp = (req, res) => {
  const { dog } = req.body;

  Dog.find({
    Name: dog.nickName
  })
    .then(result => {
      if (result.length !== 0)
        return res.send(errobj(500, "Dog with this nickName allready exists"));
      else {
        Dog.create({
          Name: dog.nickName,
          requiredMeals: dog.requiredMeals,
          requiredSnacks: dog.requiredSnacks
        })
          .then(() => {
            return res.send("Dog created successfully");
          })
          .catch(err => {
            return res.send(errobj(500, err));
          });
      }
    })
    .catch(err => {
      return res.send(errobj(500, err));
    });
};

const Owner = require("../models/owner");
const Dog = require("../models/dog");
const errobj = require("../errObj");

exports.getOwnerinfoByEmail = (req, res) => {
  const email = req.query.email;

  Owner.find({
    Email: email
  })
    .then(result => {
      return res.send(
        result.length > 0 ? result : errobj(404, "Owner not found")
      );
    })
    .catch(err => {
      return res.send(errobj(500, err));
    });
};

exports.addOwnerToDog = (req, res) => {
  const { email, nickName } = req.query;

  Owner.findOneAndUpdate(
    {
      Email: email
    },
    {
      $push: { Dogs: [nickName] }
    }
  ).catch(err => {
    return res.send(errobj(500, err));
  });

  Dog.findOneAndUpdate(
    {
      Name: nickName
    },
    {
      $push: { Owners: [email] }
    }
  ).catch(err => {
    return res.send(errobj(500, err));
  });

  return res.json("Dog added to Owner");
};

exports.ownersSignUp = (req, res) => {
  const { user } = req.body;

  Owner.find({
    Email: user.email
  })
    .then(result => {
      if (result.length !== 0)
        return res.send(
          errobj(500, "User with this email address allready exists")
        );
      else {
        Owner.create({
          fullName: user.fullName,
          Email: user.email,
          Password: user.password
        })
          .then(() => {
            return res.send("User created successfully");
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

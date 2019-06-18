const errobj = require("../errObj");
const Dog = require("../models/dog");
const Event = require("../models/event");
const moment = require("moment");

exports.getEventsForDog = (req, res) => {
  const nickName = req.query.nickName;
  let resultToSend = [];
  let numOfwalks = 0;
  Event.find({
    nickName: nickName
  })
    .then(results => {
      results.map(result => {
        numOfwalks = result.Trips.length;
        resultToSend.push({
          Date: result.Date,
          Trips: result.Trips,
          Snacks: result.Snacks,
          Poops: result.Poops,
          Meals: result.Meals,
          numOfwalks: numOfwalks
        });
      });
      return res.send(resultToSend);
    })
    .catch(err => {
      return res.send(errobj(500, err));
    });
};

exports.updateTotalKmWalkedinEvent = (req, res) => {
  const { nickName, dataToUpdate } = req.query;
  const date = moment().format("YYYY-MM-DD");
  Event.findOneAndUpdate(
    {
      nickName: nickName,
      Date: date
    },
    { totalKmWalked: dataToUpdate },
    { upsert: true, new: true }
  )
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.send(errobj(500, err));
    });
};

exports.updatePoopsinEvent = (req, res) => {
  const { nickName, dataToUpdate } = req.query;
  const date = moment().format("YYYY-MM-DD");
  Event.findOneAndUpdate(
    {
      nickName: nickName,
      Date: date
    },
    { Poops: dataToUpdate },
    { upsert: true, new: true }
  )
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.send(errobj(500, err));
    });
};

exports.updateSnacksinEvent = (req, res) => {
  const { nickName, dataToUpdate } = req.query;
  const date = moment().format("YYYY-MM-DD");
  Event.findOneAndUpdate(
    {
      nickName: nickName,
      Date: date
    },
    { Snacks: dataToUpdate },
    { upsert: true, new: true }
  )
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.send(errobj(500, err));
    });
};

exports.updateMealsinEvent = (req, res) => {
  const { nickName, dataToUpdate } = req.query;
  const date = moment().format("YYYY-MM-DD");
  Event.findOneAndUpdate(
    {
      nickName: nickName,
      Date: date
    },
    { Meals: dataToUpdate },
    { upsert: true, new: true }
  )
    .then(result => {
      console.log(result);
      return res.send(result);
    })
    .catch(err => {
      return res.send(errobj(500, err));
    });
};

exports.saveDogTrip = (req, res) => {
  let coords = JSON.parse(req.query.coords);
  let distance = req.query.distance;
  let nickName = req.query.nickName;
  let coordsArr = [];
  coordsArr.push({ distance: distance });
  coords.map(coord => {
    coordsArr.push({
      longitude: coord.coordinate.longitude,
      latitude: coord.coordinate.latitude
    });
  });
  console.log(coordsArr);

  const date = moment().format("YYYY-MM-DD");
  Event.findOneAndUpdate(
    {
      nickName: nickName,
      Date: date
    },
    {
      $push: { Trips: [coordsArr] }
    },
    { upsert: true, new: true }
  )
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.send(errobj(500, err));
    });
};

exports.getEventsForDogForCurrentDate = (req, res) => {
  const nickName = req.query.nickName;
  const date = moment().format("YYYY-MM-DD");
  Event.find({
    nickName: nickName,
    Date: date
  })
    .then(result => {
      if (result.length > 0) {
        let numOfWalks = result[0].Trips.length;
        let sunOfKm = 0;
        result[0].Trips.map(arr => {
          if (arr[0].distance !== undefined && !isNaN(arr[0].distance)) {
            sunOfKm += Number(arr[0].distance);
            console.log(Number(arr[0].distance));
          }
        });
        resultToSend = {
          ...result,
          numOfWalks: numOfWalks,
          sunOfKm: sunOfKm
        };

        return res.send(resultToSend);
      } else {
        return res.send([]);
      }
    })
    .catch(err => {
      return res.send(errobj(500, err));
    });
};

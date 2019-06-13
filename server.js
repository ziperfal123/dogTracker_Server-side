const express = require("express");
const dogCtl = require("./controllers/dog.ctl");
const ownerCtl = require("./controllers/owner.ctl");
const eventCtl = require("./controllers/event.ctl");

const app = express();

const port = process.env.PORT || 3000;
app.set("port", port);
app.use("/", express.static("./public")); // for API
app.use(express.urlencoded());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  res.set("Content-Type", "application/json");
  next();
});

app.post("/isNickExists", dogCtl.isNickExists);
app.get("/getDogInfo", dogCtl.getDogInfoBynickName);
app.get("/getOwnerInfo", ownerCtl.getOwnerinfoByEmail);
app.post("/addOwnerToDog", ownerCtl.addOwnerToDog);
app.get("/getEventsForDog", eventCtl.getEventsForDog);
app.put("/updateTotalKmWalkedinEvent", eventCtl.updateTotalKmWalkedinEvent);
app.put("/updatePoopsinEvent", eventCtl.updatePoopsinEvent);
app.put("/updateSnacksinEvent", eventCtl.updateSnacksinEvent);
app.put("/updateMealsinEvent", eventCtl.updateMealsinEvent);
app.get(
  "/getEventsForDogForCurrentDate",
  eventCtl.getEventsForDogForCurrentDate
);
app.post("/ownersSignUp", ownerCtl.ownersSignUp);
app.post("/dogsSignUp", dogCtl.dogsSignUp);
app.get("/saveDogTrip", eventCtl.saveDogTrip);

app.listen(port, () => console.log(`listening on port ${port}`));

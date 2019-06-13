const schedule = require("node-schedule");
const Event = require("./models/event");
const moment = require("moment");
const errObj = require("./errObj");
moment().format();

schedule.scheduleJob("59 23 * * *", () => {
  Event.find({})
    .then(events => {
      let date2weekAgo = moment().subtract(2, "weeks");

      events.map(event => {
        let momentObj = moment(new Date(event.Date));
        if (momentObj.isBefore(date2weekAgo)) {
          Event.deleteOne({
            Date: event.Date
          }).catch(err => {
            return errObj(404, err);
          });
          console.log(`Event from ${event.Date} Deleted`);
        }
      });
    })
    .catch(err => {
      return errObj(404, err);
    });
});

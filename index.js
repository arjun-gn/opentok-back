const express = require("express");
const OpenTok = require("opentok");
const Nylas = require("nylas");
const app = express();
var bodyParser = require("body-parser");
var opentok;
const cors = require("cors");
app.use(cors());

const nylas_token = "5D9TvVPnV7cGgYG4Xwxci66cRiy1F";
const clientId = "";
const clientSecret = "";
Nylas.config({ clientId: "clientId", clientSecret: "clientSecret" });
const nylas = Nylas.with(nylas_token);

var apiKey = "47430891";
var apiSecret = "6ed3f337e6f7a5609761d60d03caf7e748a4dc21";

// var apiKey = process.env.API_KEY;
// var apiSecret = process.env.API_SECRET;
// export API_KEY=47430891
// export API_SECRET=6ed3f337e6f7a5609761d60d03caf7e748a4dc21

if (!apiKey || !apiSecret) {
  console.log("You must specify API_KEY and API_SECRET environment variables");
  process.exit(1);
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

function init() {
  app.listen(3000, function () {
    console.log("Your app is now ready at http://localhost:3000/");
  });
  nylas.contacts.list().then((contacts) => console.log(contacts));
}

opentok = new OpenTok(apiKey, apiSecret);

opentok.createSession({ mediaMode: "routed" }, function (err, session) {
  if (err) throw err;
  app.set("sessionId", session.sessionId);
  app.set("layout", "horizontalPresentation");
  init();
});

app.get("/", (req, res) => {
  var sessionId = app.get("sessionId");
  var token = opentok.generateToken(sessionId, {
    role: "moderator",
    initialLayoutClassList: ["focus"],
  });
  res.status(200).send({
    apiKey: apiKey,
    sessionId: sessionId,
    token: token,
    focusStreamId: app.get("focusStreamId") || "",
    layout: app.get("layout"),
  });
});

app.post("/start", function (req, res) {
  var hasAudio = req.body.hasAudio !== undefined;
  var hasVideo = req.body.hasVideo !== undefined;
  var outputMode = req.body.outputMode;
  var archiveOptions = {
    name: "Node Archiving Sample App",
    hasAudio: hasAudio,
    hasVideo: hasVideo,
    outputMode: outputMode,
  };
  if (outputMode === "composed") {
    archiveOptions.layout = { type: "horizontalPresentation" };
  }
  opentok.startArchive(
    app.get("sessionId"),
    archiveOptions,
    function (err, archive) {
      if (err) {
        return res.send(
          500,
          "Could not start archive for session " +
            app.get("sessionId") +
            ". error=" +
            err.message
        );
      }
      return res.json(archive);
    }
  );

  app.get("/stop/:archiveId", function (req, res) {
    var archiveId = req.params.archiveId;
    opentok.stopArchive(archiveId, function (err, archive) {
      if (err)
        return res.send(
          500,
          "Could not stop archive " + archiveId + ". error=" + err.message
        );
      return res.json(archive);
    });
  });
});

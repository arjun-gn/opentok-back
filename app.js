const express = require("express");
const OpenTok = require("opentok");

const app = express();
const cors = require("cors");
const nylasMessageRoute = require("./routes/nylasMessage");
const nylasContactsRoute = require("./routes/nylasContacts");
const boardRoutes = require("./routes/boardRoutes");
app.use(cors());
app.use(express.json());
require("dotenv").config();
var apiKey = process.env.OPENTOK_API_KEY;
var apiSecret = process.env.OPENTOK_API_SECRET;
var opentok = new OpenTok(apiKey, apiSecret);

function init() {
  app.use("/api/v1/messages", nylasMessageRoute);
  app.use("/api/v1/contacts", nylasContactsRoute);
  app.use("/api/v1/boards",boardRoutes)
}



//opentok

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

module.exports = app;

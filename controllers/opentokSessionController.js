const OpenTok = require("opentok");
var apiKey = process.env.OPENTOK_API_KEY;
var apiSecret = process.env.OPENTOK_API_SECRET;
var opentok = new OpenTok(apiKey, apiSecret);
const app = require("../app");
const sessionId = "";
const layout = "";
opentok.createSession({ mediaMode: "routed" }, function (err, session) {
  if (err) throw err;
  sessionId = session.sessionId;
  layout="horizontalPresentation";
  init();
});

exports.startSession = (req, res) => {
  var token = opentok.generateToken(sessionId, {
    role: "moderator",
    initialLayoutClassList: ["focus"],
  });
  res.status(200).send({
    apiKey: apiKey,
    sessionId: sessionId,
    token: token,
    focusStreamId: app.get("focusStreamId") || "",
    layout: layout,
  });
};

exports.startArchive = (req, res) => {
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
    sessionId,
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
};

exports.stopArchive = (req, res) => {
  var archiveId = req.params.archiveId;
  opentok.stopArchive(archiveId, function (err, archive) {
    if (err)
      return res.send(
        500,
        "Could not stop archive " + archiveId + ". error=" + err.message
      );
    return res.json(archive);
  });
};

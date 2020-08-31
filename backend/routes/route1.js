const { asyncWrap } = require("../utils/index");

module.exports.set = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));

  app.get("/urlParam", (req, res) => {
    console.log(req.query);
    res.send(true);
  });

  app.post(
    "/test",
    asyncWrap(async (req, res) => {
      console.log(req.body);

      const a = JSON.parse("SD");

      res.send({ friend: 1 });
    })
  );

  app.post("/test1", (req, res) => {
    console.log(req.body);

    const a = JSON.parse("ASD");

    res.send({ friend: 1 });
  });
};

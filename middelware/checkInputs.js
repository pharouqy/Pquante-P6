module.exports = (req, res, next) => {
  if (req.method === "PUT" && req.file === undefined) {
    const sauce = req.body;
    const { name, manufacturer, description, mainPepper } = sauce; // ES6 destructuring
    checkInput(req, res, next, name, manufacturer, description, mainPepper);
  } else {
    const sauce = JSON.parse(req.body.sauce);
    const { name, manufacturer, description, mainPepper } = sauce; // ES6 destructuration
    checkInput(req, res, next, name, manufacturer, description, mainPepper);
  }
  function checkInput(
    req,
    res,
    next,
    name,
    manufacturer,
    description,
    mainPepper
  ) {
    if (
      name.length >= 3 &&
      manufacturer.length >= 3 &&
      description.length >= 3 &&
      mainPepper.length >= 3
    ) {
      next();
    } else {
      res.status(400).json({
        message:
          "vous devez remplir tous les champs avec au moins 3caractéres !!!",
      });
    }
  }
};

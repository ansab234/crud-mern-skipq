const Url = require("../Model/Url");

const getUrl = async (req, res) => {
  try {
    const urls = await Url.find({user: req.user._id});
    res.json(urls);
  } catch (error) {
    res.json({
      Error: error.message,
    });
    console.log(error.message);
  }
};

const createUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const urlExists = await Url.findOne({ url });

    if (!url) {
      res.status(400);
      throw new Error("Please Enter Url");
    }
    if (urlExists) {
      res.status(404);
      throw new Error("Url already exists");
    }
    const createUrl = new Url({ user: req.user._id, url: req.body.url    });
    const createdUrl = await createUrl.save();
    res.status(201).json(createdUrl);
  } catch (error) {
    res.json({
      Error: error.message,
    });
    console.log(error.message);
  }
};

const updateUrl = async (req, res) => {
  try {
    const { url } = req.body;

    const updateUrl = await Url.findById(req.params.id);

    if (updateUrl) {
      updateUrl.url = url;

      const updatedUrl = await updateUrl.save();
      res.json(updatedUrl);
    } else {
      res.status(404);
      throw new Error("Url not found");
    }
  } catch (error) {
    res.json({
      Error: error.message,
    });
    console.log(error.message);
  }
};

const deleteUrl = async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    

    if (url) {
      await url.remove();
      res.json({ message: "Url Deleted" });
    } else {
      res.status(404);
      throw new Error("Url not Found");
    }
  } catch (error) {
    res.json({
      Error: error.message,
    });
    console.log(error.message);
  }
};

const getUrlbyId = async (req, res) => {
  const id = req.params.id;
  let url;
  try {
    url = await Url.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!url) {
    return res.status(404).json({ message: "No Url found" });
  }
  return res.status(200).json({ url });
};

module.exports = { getUrl, createUrl, updateUrl, deleteUrl, getUrlbyId };

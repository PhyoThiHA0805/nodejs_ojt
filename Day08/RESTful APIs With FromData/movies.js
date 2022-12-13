const express = require("express");
const router = express.Router();

const movies = [
  { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
  { id: 102, name: "Inception", year: 2010, rating: 8.7 },
  { id: 103, name: "The Dark Knight", year: 2008, rating: 9 },
  { id: 104, name: "12 Angry Men", year: 1957, rating: 8.9 },
];

router.get("/", (req, res) => {
  res.send(movies);
});

// GET Request
router.get("/:id([0-9]{3,})", (req, res) => {
  const currentMovie = movies.filter((movie) => movie.id == req.params.id);

  console.log("Movie :", currentMovie, req.params.id);
  if (currentMovie.length == 1) res.send(currentMovie[0]);
  else {
    res.status(404).json({ message: "Not Found" });
  }
});

// POST Request
router.post("/", (req, res) => {
  // Checking Fields are valid or not
  if (
    !req.body.name ||
    !req.body.year.toString().match(/^[0-9]{4}$/g) ||
    !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)
  ) {
    res.status(400).json({ message: "Bad Request" });
  } else {
    const newId = movies[movies.length - 1].id + 1;
    const newMovie = {
      id: newId,
      name: req.body.name,
      year: req.body.year,
      rating: req.body.rating,
    };

    movies.push(newMovie);

    res
      .status(200)
      .json({ message: "New movie created.", location: "/movies/" + newId });
  }
});

// PUT Request
router.put("/:id", (req, res) => {
  if (
    !req.body.name ||
    !req.body.year.toString().match(/^[0-9]{4}$/g) ||
    !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
    !req.params.id.toString().match(/^[0-9]{3,}$/g)
  ) {
    res.status(400);
    res.json({ message: "Bad Request" });
  } else {
    const updateIndex = movies.findIndex((movie) => movie.id == req.params.id);

    if (updateIndex === -1) {
      //Movie not found, create new
      movies.push({
        id: req.params.id,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating,
      });
      res.json({
        message: "New movie created.",
        location: "/movies/" + req.params.id,
      });
    }

    //Update existing movie
    movies[updateIndex] = {
      id: req.params.id,
      name: req.body.name,
      year: req.body.year,
      rating: req.body.rating,
    };
    res.json({
      message: "Movie id " + req.params.id + " updated.",
      location: "/movies/" + req.params.id,
    });
  }
});

// DELETE Request
router.delete("/:id", (req, res) => {
  const removeIndex = movies.findIndex((movie) => movie.id == req.params.id);
  console.log("RemoveIndex", removeIndex);

  if (removeIndex === -1) {
    res.status(404).send("Delete movie not found");
  } else {
    const deletedMovie = movies.splice(removeIndex, 1);
    res.json({
      message: "Movie deleted successfully",
      deleted_movie: deletedMovie,
    });
  }
});
module.exports = router;

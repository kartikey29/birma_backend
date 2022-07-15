const totalRating = (reviews) => {
  var ratingsTotal = 0;
  var result = 0;
  if (reviews.length > 0) {
    for (var i = 0; i < reviews.length; i++) {
      ratingsTotal += reviews[i].rating;
    }
    result = Math.round(ratingsTotal / reviews.length);
  }
  return result;
};

module.exports = totalRating;

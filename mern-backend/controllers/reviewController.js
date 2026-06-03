let reviewCounter = 1
const reviews = []

function createReview(data) {
  const review = {
    id: String(reviewCounter++),
    ...data,
    createdAt: new Date().toISOString(),
  }
  reviews.push(review)
  return review
}

exports.createReview = (req, res) => {
  const { name, property, rating, comment } = req.body

  if (!name || !property || !rating || !comment) {
    return res.status(400).json({ message: 'All review fields are required.' })
  }

  const review = createReview({ name, property, rating, comment })
  res.status(201).json(review)
}

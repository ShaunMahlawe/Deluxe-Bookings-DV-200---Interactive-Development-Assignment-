import ReviewForm from "../components/ReviewForm";


function ReviewPage() {
  return (
    <div className="review-page">

      <section className="review-hero">

        <div className="overlay">

          <h1>Share Your Experience</h1>

          <p>
            Tell us about your stay and help future
            travellers discover luxury accommodation.
          </p>

        </div>

      </section>

      <section className="review-section">

        <ReviewForm />

      </section>

    </div>
  );
}

export default ReviewPage;
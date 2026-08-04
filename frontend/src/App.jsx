import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [modules, setModules] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const fetchModules = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/modules/");
      setModules(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleSubmit = async (moduleId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/modules/${moduleId}/feedback/`,
        {
          name,
          rating,
          comment,
        }
      );

      fetchModules();
      setName("");
      setRating(5);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Course Assessment</h1>

      {modules.map((module) => (
        <div className="module-card" key={module.id}>
          <h2>{module.title}</h2>
          <p>{module.description}</p>

          <section className="feedback-section">
            <h3>Feedback</h3>

            {module.feedbacks.length ? (
              module.feedbacks.map((feedback) => (
               <div className="feedback-card" key={feedback.id}>
               <div className="feedback-top">
                 <strong>{feedback.name}</strong>
                 <span>⭐ {feedback.rating}/5</span>
               </div>

                 <p>{feedback.comment}</p>
               </div> 
              ))
            ) : (
              <p>No feedback yet.</p>
            )}
          </section>

          <section className="form-section">
            <h3>Add Feedback</h3>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>

            <textarea
              placeholder="Write your feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button onClick={() => handleSubmit(module.id)}>
              Submit Feedback
            </button>
          </section>
        </div>
      ))}
    </div>
  );
}

export default App;
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
    <div style={{ padding: "20px" }}>
      <h1>Course Assessment</h1>

      {modules.map((module) => (
        <div
          key={module.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <h2>{module.title}</h2>
          <p>{module.description}</p>

          <h3>Feedback</h3>

          {module.feedbacks.length > 0 ? (
            module.feedbacks.map((feedback) => (
              <div key={feedback.id}>
                <p>
                  <strong>Name:</strong> {feedback.name}
                </p>
                <p>
                  <strong>Rating:</strong> {feedback.rating}
                </p>
                <p>
                  <strong>Comment:</strong> {feedback.comment}
                </p>
                <hr />
              </div>
            ))
          ) : (
            <p>No feedback yet.</p>
          )}

          <h3>Add Feedback</h3>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />
          <br />

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>

          <br />
          <br />

          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <br />
          <br />

          <button onClick={() => handleSubmit(module.id)}>
            Submit Feedback
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
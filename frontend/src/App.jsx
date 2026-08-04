import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/modules/")
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Course Assessment</h1>

      {modules.map((module) => (
        <div key={module.id}>
          <h2>{module.title}</h2>
          <p>{module.description}</p>

          <h3>Feedback</h3>

          {module.feedbacks.length > 0 ? (
            module.feedbacks.map((feedback) => (
              <div key={feedback.id}>
                <p><strong>Name:</strong> {feedback.name}</p>
                <p><strong>Rating:</strong> {feedback.rating}</p>
                <p><strong>Comment:</strong> {feedback.comment}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No feedback yet.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
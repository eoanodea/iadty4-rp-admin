import React from "react";
import "./App.css";

import { useQuery, gql } from "@apollo/client";

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    getNote(id: "603bff2dffab1e542c7d498a") {
      id
      title
      markdown
      sanitizedHtml
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  const [title, setTitle] = React.useState("");
  const [markdown, setMarkdown] = React.useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log("data", data);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div>
          <h1>{data.getNote.title}</h1>
        </div>
        <div class="form-group">
          <label for="title">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            id="title"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="markdown">Markdown</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            required
            name="markdown"
            id="markdown"
            class="form-control"
          ></textarea>
        </div>

        <a href="/" class="btn btn-secondary">
          Cancel
        </a>
        <button type="submit" class="btn btn-primary">
          Save
        </button>
      </div>
    </>
  );
}

export default App;

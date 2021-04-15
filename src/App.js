import React from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const App = () => {
  return (
    <div className="app">
      <h1>Avi's Reading List</h1>
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;

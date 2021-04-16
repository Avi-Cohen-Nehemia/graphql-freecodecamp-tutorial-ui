import React, { useReducer } from "react";
// import apollo hooks and methods
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_ALL_AUTHORS, ADD_BOOK } from "../queries";

const AddBookInitialState = {
    title: "",
    genre: "",
    author: "",
}

const reducer = (state, action) => {
    switch (action.type) {
        case "HANDLE_CHANGE" : return {
            ...state,
            ...action.payload
        }
        default : return;
    }
};

const AddBook = () => {

    const [state, dispatch] = useReducer(reducer, AddBookInitialState);
    const { loading, error, data } = useQuery(GET_ALL_AUTHORS);
    // const [addTodo, { data }] = useMutation(ADD_BOOK);

    const handleChange = (e, input) => {
        let value = e.currentTarget.value;
        dispatch({
            type: "HANDLE_CHANGE",
            payload: {
                [input]: value
            }
        });
    }

    const handleSubmit = (e, input) => {
        let value = e.currentTarget.value;
        dispatch({
            type: "HANDLE_CHANGE",
            payload: {
                [input]: value
            }
        });
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <form className="add-book" onSubmit={handleSubmit}>
            <div className="field">
                <label>Book Title:</label>
                <input type="text" onChange={(e) => handleChange(e, "title")}/>
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => handleChange(e, "genre")}/>
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => handleChange(e, "author")}>
                    <option
                        value={""}
                        key={0}
                    >
                        Select Author
                    </option>
                    { data.authors.map((author, index) => (
                        <option
                            value={author.id}
                            key={index + 1}
                        >
                            {author.name}
                        </option>
                    )) }
                </select>
            </div>

            <button type="submit">+</button>
        </form>
    )
}

export default AddBook;

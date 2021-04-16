import React, { useReducer } from "react";
// import apollo hooks and methods
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_AUTHORS, ADD_BOOK, GET_ALL_BOOKS } from "../queries";

const AddBookInitialState = {
    title: "",
    genre: "",
    author_id: "",
}

const reducer = (state, action) => {
    switch (action.type) {
        case "HANDLE_CHANGE" : return {
            ...state,
            ...action.payload
        }
        default : return;
    }
}

const AddBook = () => {

    const [state, dispatch] = useReducer(reducer, AddBookInitialState);
    const { loading, error, data: authors } = useQuery(GET_ALL_AUTHORS);
    const [addBook] = useMutation(ADD_BOOK);

    const handleChange = (e, input) => {
        let value = e.currentTarget.value;
        dispatch({
            type: "HANDLE_CHANGE",
            payload: {
                [input]: value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook({
            variables: {
                title: state.title,
                genre: state.genre,
                author_id: state.author_id,
            },
            refetchQueries: [{query: GET_ALL_BOOKS}]
        });
        dispatch({
            type: "HANDLE_CHANGE",
            payload: {
                ...AddBookInitialState
            }
        });
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <form className="add-book" onSubmit={(e) => handleSubmit(e)}>
            <div className="field">
                <label>Book Title:</label>
                <input
                    type="text"
                    onChange={(e) => handleChange(e, "title")}
                    value={state.title}
                />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input
                    type="text"
                    onChange={(e) => handleChange(e, "genre")}
                    value={state.genre}
                />
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => handleChange(e, "author_id")}>
                    <option
                        value={""}
                        key={0}
                    >
                        Select Author
                    </option>
                    { authors.authors.map((author, index) => (
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

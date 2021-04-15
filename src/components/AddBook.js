import React from "react";
// import apollo hooks and methods
import { useMutation, gql } from '@apollo/client';

// create a new query (get all books in this instance)
const ADD_BOOK = gql`
    {
        mutation addBook {
            title
            genre
            author_id
        }  
    }
`;

const AddBook = () => {

    return (
        <form className="add-book">
            <div className="field">
                <label>Book Name:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Author:</label>
                <select>
                    <option>Select Author</option>
                </select>
            </div>

            <button></button>
        </form>
    )
}

export default AddBook;

import React from "react";
// import apollo hooks and methods
import { useQuery, useMutation, gql } from '@apollo/client';

// create a new query (get all books in this instance)
// const ADD_BOOK = gql`
//     {
//         mutation addBook($title: String!, $genre: String!, author_id: String!) {
//             title
//             genre
//             author_id
//         }  
//     }
// `;

const GET_ALL_AUTHORS = gql`
    {
        authors {
            id
            name
        }  
    }
`;


const AddBook = () => {

    const { loading, error, data } = useQuery(GET_ALL_AUTHORS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

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
                    { data.authors.map((author) => (
                        <option>{author.name}</option>
                    )) }
                </select>
            </div>

            <button type="submit">+</button>
        </form>
    )
}

export default AddBook;

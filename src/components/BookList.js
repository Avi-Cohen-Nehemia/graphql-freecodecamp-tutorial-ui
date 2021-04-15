import React from "react";
// import apollo hooks and methods
import { useQuery, gql } from '@apollo/client';

// create a new query (get all books in this instance)
const GET_ALL_BOOKS = gql`
    {
        books {
            title
            genre
            author{
                name
            }
        }  
    }
`;

const BookList = () => {

    const { loading, error, data } = useQuery(GET_ALL_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <ul className="book-list">
                { data.books.map((book, index) => (
                    <li key={index}>
                        <h3>{book.title}</h3>
                        <p>{`Genre: ${book.genre}`}</p>
                        <p>{`Author: ${book.author.name}`}</p>
                    </li>
                )) }
            </ul>
        </div>
    )
}

export default BookList;

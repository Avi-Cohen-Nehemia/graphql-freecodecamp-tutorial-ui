import React from "react";
// import apollo hooks and methods
import { useQuery } from '@apollo/client';
// import the queries we need
import { GET_ALL_BOOKS } from "../queries";

const BookList = () => {

    const { loading, error, data } = useQuery(GET_ALL_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data);

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

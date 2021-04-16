import React, { useState } from "react";
// import apollo hooks and methods
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_AUTHORS, ADD_BOOK, CACHE_NEW_BOOK } from "../queries";

const AddBook = () => {

    const [inputs, setInputs] = useState({
        title: "",
        genre: "",
        author_id: "",
    });

    const handleChange = (e, input) => {
        let value = e.currentTarget.value;
        setInputs({
            ...inputs,
            [input]: value
        });
    }

    const { loading, error, data: authors } = useQuery(GET_ALL_AUTHORS);
    const [addBook] = useMutation(ADD_BOOK, {
        // update cache to avoid using refetchQueries to update the component
        update(cache, {data: {addBook}}) {
            cache.modify({
                fields: {
                    books(existingBooks = []) {
                        const newBookRef = cache.writeFragment({
                            data: addBook,
                            fragment: CACHE_NEW_BOOK
                        });
                        return [...existingBooks, newBookRef];
                    }
                }
            });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook({
            variables: inputs,
        });
        setInputs({
            title: "",
            genre: "",
            author_id: "",
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
                    value={inputs.title}
                />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input
                    type="text"
                    onChange={(e) => handleChange(e, "genre")}
                    value={inputs.genre}
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

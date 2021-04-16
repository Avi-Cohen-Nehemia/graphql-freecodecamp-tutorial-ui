import { gql } from '@apollo/client';

export const GET_ALL_AUTHORS = gql`
    {
        authors {
            id
            name
        }  
    }
`;

export const GET_ALL_BOOKS = gql`
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

export const ADD_BOOK = gql`
    mutation($title: String!, $genre: String!, $author_id: ID!) {
        addBook(title: $title, genre: $genre, author_id: $author_id) {
            id
            title
            genre
            author {
                id
            }
        }  
    }
`;

export const CACHE_NEW_BOOK = gql`
fragment NewBook on Book {
    id
}
`;

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

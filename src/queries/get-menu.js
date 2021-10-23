import { gql } from "@apollo/client";

/**
 * GraphQL menu query.
 */

 export const GET_MENU = gql`query($id: ID!) {
  shop: productCategory(id: "75", idType: DATABASE_ID) {
    databaseId
    name
    slug
    children {
        nodes {
            name
            slug
        }
    }
}
workshop: productCategory(id: "72", idType: DATABASE_ID) {
    databaseId
    name
    slug
    children {
        nodes {
            name
            slug
        }
    }
}
journal: categories {
    nodes {
        name
        slug
        databaseId
    }
}
 }`;
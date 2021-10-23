import { gql } from "@apollo/client";

const SUBCATEGORIES = gql`query {
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
}
`;
export default SUBCATEGORIES;
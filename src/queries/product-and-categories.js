import { gql } from "@apollo/client";

/**
 * GraphQL categories and products query.
 */
const PRODUCTS_AND_CATEGORIES_QUERY = gql`query {
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
  
  heroCarousel: productCategories(where: {slug: "offers"}) {
    nodes {
      id
      children {
        nodes {
          id
          name
          slug
          databaseId
          description
          image {
            id
            sourceUrl
            srcSet
          }
        }
      }
    }
  }
  productCategories {
    nodes {
      id
      name
      slug
      image {
        id
        sourceUrl
        srcSet
      }
    }
  }
  products(first: 50) {
    nodes {
      id
      productId: databaseId
      averageRating
      slug
      description
      image {
        id
        altText
        sourceUrl
      }
      name
      ... on SimpleProduct {
        salePrice
        regularPrice
        id
      }
      ... on VariableProduct {
        salePrice
        id
        regularPrice
      }
      ... on ExternalProduct {
        salePrice
        id
        externalUrl
        regularPrice
      }
      ... on GroupProduct {
        id
        products {
          nodes {
            ... on SimpleProduct {
              id
              salePrice
              regularPrice
            }
          }
        }
      }
    }
  }
}
`;

export default PRODUCTS_AND_CATEGORIES_QUERY;

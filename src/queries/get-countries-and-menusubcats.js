import { gql } from "@apollo/client";

/**
 * GraphQL countries query.
 */
const GET_COUNTRIES_AND_MENUSUBCATS = gql`query GET_COUNTRIES{
  wooCountries {
    billingCountries {
      countryCode
      countryName
    }
    shippingCountries {
      countryCode
      countryName
    }
  }
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

export default GET_COUNTRIES_AND_MENUSUBCATS;

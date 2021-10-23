
import {gql} from "@apollo/client";

export const GET_JOURNAL = gql` query 
GET_JOURNAL($subslug: ID!) {
  post(id: $subslug, idType: SLUG) {
    title
    id
    slug
    databaseId
    excerpt
    content(format: RENDERED)
    featuredImage {
      node {
        id
        sourceUrl
        srcSet
        slug
        title
        uri
        altText
      }
    }
    tags {
      nodes {
        slug
      }
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

export const GET_JOURNAL_ITEMS = gql` query 
GET_JOURNAL_ITEMS($slug: ID!) {
    category(idType: SLUG, id: $slug) {
      name
      slug
      id
      databaseId
      posts {
        nodes {
          title
          id
          slug
          databaseId
          excerpt
          featuredImage {
            node {
              id
              sourceUrl
              srcSet
              slug
              title
              uri
              altText
            }
          }
        }
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
}
`;



export const GET_JOURNAL_CATS = gql`
query GET_JOURNAL_CATS {
  categories(where: {exclude: "1"}) {
    nodes {
      name
      slug
      id
      databaseId
      description
      posts(first: 4) {
        nodes {
          featuredImage {
            node {
              sourceUrl
              srcSet
              altText
              databaseId
            }
          }
        }
      }
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



export const GET_JOURNAL_SLUGS = gql`
query GET_JOURNAL_SLUGS {
    categories {
      nodes {
        slug
        databaseId
        posts{
          nodes {
            slug
          }
        }
      }
    }
}  
`;


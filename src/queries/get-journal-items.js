
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


export const GET_ALL_JOURNALS = gql`
query GET_ALL_JOURNALS {
  posts(first: 10, after: "") {
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
      categories {
        nodes {
          name
        }
      }
    }
  }
}
`
import {gql} from "@apollo/client";

export const SUBCATS_BY_SLUG = gql` query SUBCATS_BY_SLUG($slug: ID!) 
{
	productCategory(id: $slug, idType: SLUG) 
	{
		id
		name
		slug
		databaseId
	}

	shop: productCategory(id: "75", idType: DATABASE_ID) {
		databaseId
		name
		slug
		children {
		  nodes {
			name
			slug
			description
			products(first: 4) {
			  nodes {
				image {
				  sourceUrl
				  srcSet
				  uri
				  altText
				  databaseId
				}
			  }
			}
		  }
		}
	  }
    workshops: productCategory(id: "72", idType: DATABASE_ID) {
        databaseId
        name
        slug
        children {
			nodes {
			  name
			  slug
			  description
			  products(first: 4) {
				nodes {
				  image {
					sourceUrl
					srcSet
					uri
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
	
}
`;

export const CATEGORY_OR_JOURNAL_SLUGS = gql` query CATEGORY_OR_JOURNAL_SLUGS {
	shop: productCategory(id: "75", idType: DATABASE_ID) {
		databaseId
		name
		slug
	  }
    workshop: productCategory(id: "72", idType: DATABASE_ID) {
        databaseId
        name
        slug
    }
    journal: categories {
        nodes {
            name
            slug
            databaseId
        }
    }
}`;

import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY_AND_MENUSUBCATS = gql` query Product($slug: ID!) {
	product(id: $slug, idType: SLUG) {
		id
		name
		slug
		type
		productId: databaseId
		description
		shortDescription(format: RAW)
		attributes {
		  nodes {
			name
			scope
			options
		  }
		}
		... on VariableProduct {
			salePrice
			id
			regularPrice
			name
			variations {
			  nodes {
				id
				productId: databaseId
				slug
				name
				salePrice
				regularPrice
				type
				image {
					id
					sourceUrl
					srcSet
					altText
					title
				  }
			  }
			}
		  }
		upsell {
			nodes {
			  name
			  databaseId
			  slug
			}
		  }
		galleryImages {
			nodes {
				id
				title
				altText
				mediaItemUrl
			}
		}
		image {
			id
			uri
			title
			srcSet
			sourceUrl
		}
		... on SimpleProduct {
			salePrice
			id
			regularPrice
		}
		... on ExternalProduct {
			salePrice
			id
			regularPrice
			externalUrl
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

export const PRODUCT_SLUGS = gql` query Products {
  products(first: 5000) {
    nodes {
      id
      slug
    }
  }
}
`;

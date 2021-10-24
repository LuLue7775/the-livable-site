import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql` query Product($slug: ID!) {
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

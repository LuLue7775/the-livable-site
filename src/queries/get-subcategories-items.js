
import {gql} from "@apollo/client";

export const GET_SUBCATEGORIES_ITEMS = gql` 
query GET_SUBCATEGORIES_ITEMS($subslug: ID!) {
	productCategory(id: $subslug, idType: SLUG) {
	  name
	  databaseId
	  products 
	  {
			nodes 
			{
				id
				name
				databaseId
				slug
				description
				image {
					id
					uri
					title
					srcSet
					sourceUrl
				}
				... on SimpleProduct {
					salePrice
					regularPrice
					id
				}
				... on VariableProduct {
					salePrice
					regularPrice
					id
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
								regularPrice
								salePrice
								}
							}
					}
				}

				productCategories {
					nodes {
					  name
					  slug
					  databaseId
					  children {
						nodes {
						  name
						}
					  }
					}
				}
			}
	    }
	}
  }
`;

export const PRODUCT_SUBCATEGORIES_SLUGS = gql` query PRODUCT_SUBCATEGORIES_SLUGS  {
	productCategories(where: {slug: ["shop","workshops"]}) {
		nodes {
		  slug
		  name
		  children {
			nodes {
		      slug
			  name
			}
		  }
		}
	  }

}`;

import {gql} from "@apollo/client";

export const SUBCATS_BY_SLUG = gql` query SUBCATS_BY_SLUG($slug: ID!, $first: Int, $after: String) 
{
	productCategory(id: $slug, idType: SLUG) 
	{
		name
		slug
		databaseId
		id
		products ( first: $first, after: $after )
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
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
	
}
`;

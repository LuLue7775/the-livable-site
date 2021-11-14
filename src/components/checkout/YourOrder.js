import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ( { cart } ) => {

	return (
		<>
			{ cart ? (
				<>
					{/*Product Listing*/}
					<table className="checkout-cart table table-hover w-full mb-10">
						<thead>
						<tr className="woo-next-cart-head-container text-center">
							<th className="woo-next-cart-heading-el" scope="col"/>
							<th className="woo-next-cart-heading-el" scope="col">Product</th>
							<th className="woo-next-cart-heading-el" scope="col">Subtotal</th>
							<th className="woo-next-cart-heading-el" scope="col">Quantity</th>
							
						</tr>
						</thead>
						<tbody>
						{ cart.products.length && (
							cart.products.map( item => (
								<CheckoutCartItem key={ item.productId } item={ item } />
							) )
						) }
						{/*Total*/}
						<tr className="border border-green-light round-sm ">
							<td className=""/>
							<td className="woo-next-checkout-total font-normal text-xl">Total</td>
							<td className="woo-next-checkout-total font-bold font-body text-2xl">{ cart.totalProductsPrice }</td>
						</tr>
						{/* <tr className="">
							<td className=""/>
							<td className="woo-next-checkout-total">Total</td>
							<td className="woo-next-checkout-total">{ cart.totalProductsPrice }</td>
						</tr> */}
						</tbody>
					</table>
				</>
			) : '' }
		</>
	)
};

export default YourOrder;

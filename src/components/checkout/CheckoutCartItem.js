const CheckoutCartItem = ( { item } ) => {

	return (
		<tr className="woo-next-cart-item text-sm" key={ item.productId }>
			<td className="woo-next-cart-element">
				<img  className="object-cover h-64px w-64px" src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={item.image.title}/>
			</td>
			<td className="woo-next-cart-element">{ item.name }</td>
			<td className="woo-next-cart-element text-center">{ item.totalPrice }</td>
			<td className="woo-next-cart-element text-center">{ item.qty }</td>
		</tr>
	)
};

export default CheckoutCartItem;

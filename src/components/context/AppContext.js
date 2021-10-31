import React, { useState, useEffect, useRef } from 'react';
export const AppContext = React.createContext([
	{},
	() => {}
]); // define the shape of your context

export const MenuContext = React.createContext([ 
	false, 
	()=>{} 
]);

export const MobileDeviceContext = React.createContext( false ); 

export const UserContext = React.createContext([
	{},
	() => {}
]); 


export const AppProvider = ( props ) => {

	const [ cart, setCart ] = useState( null );

	const [ user, setUser ] = useState( null );

	const [ isMenuVisible, setMenuVisibility ] = useState(false);

	const [ isMobileDevice, setMobileDevice ] = useState(null) ;

	const isMounted = useRef(false); 
	useEffect(() => {
		if( isMounted.current ){}
		else{
			const isTouchDevice = () => {
				return (('ontouchstart' in window) ||
				(navigator.maxTouchPoints > 0) ||
				(navigator.msMaxTouchPoints > 0));
			}
			setMobileDevice(isTouchDevice());

			isMounted.current = true; 
		}

    },[]);


	useEffect( () => {

		if ( process.browser ) {

			let cartData = localStorage.getItem( 'woo-next-cart' );
			cartData = null !== cartData ? JSON.parse( cartData ) : '';
			setCart( cartData );

		}

	}, [] );

	return (
		<AppContext.Provider value={ [ cart, setCart ] }  >
			<MenuContext.Provider value={ [ isMenuVisible, setMenuVisibility ] }>
				<MobileDeviceContext.Provider value={ isMobileDevice }>
					<UserContext.Provider value={[ user, setUser ]}>
						{ props.children }
					</UserContext.Provider>
				</MobileDeviceContext.Provider>
			</MenuContext.Provider>
		</AppContext.Provider>
	);
};

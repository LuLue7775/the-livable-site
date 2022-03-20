import VertTop1 from './VertTop1';
import HorizWrap from './HorizWrap';
import VertTop2 from './VertTop2';
import Opening from '../Opening';
import { HomeOpeningContext } from '../context/AppContext';
import { useContext } from 'react';

export default function LandingPage () {


	const [isHomeLoaded, setHomeLoaded] = useContext(HomeOpeningContext);



	return (
		<>
			<Opening/>
			<div className={`${isHomeLoaded ? '' : 'h-screen overflow-hidden'}  w-reset-screen absolute z-0` }>
				<VertTop1/>
				<HorizWrap/> 
			</div>
			
			{/* <VertTop2/> */}
		</>
	)
}
import GET_MENU from "../src/queries/get-menu";
import Header from "../src/components/Header";
export default function Custom404() {
    // const { menu } = props || {};

    return(
        <>

            <div className="relative z-80 ">
                {/* <Header menu={ menu }/> */}
            </div>
            <h1> CUSTOM 404 </h1>
            <h1> - Page Not Found </h1>
        </>
        )
  }

// export async function getStaticProps () {

//     const { data } = await client.query( {
//         query: GET_MENU,
//     } );

//     return {
//         props: {
//             menu: 
//             [ 
//                 [ data?.shop ? data.shop : [] ] ,
//                 [ data?.workshop ? data.workshop : [] ] ,
//                 [ data?.journal ? data.journal : [] ] ,				
//             ]
//         },
//         revalidate: 1
//     }

// };

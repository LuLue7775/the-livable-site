import Link from "next/link";
const SeeWorkshop = ({product}) => {
    return (
    <>
        <p className="font-serif-ch text-sm"> And of course, you can aslo make it with us! </p>
        <div>
            <Link href={`/product/${product?.upsell?.nodes?.[0]?.slug}`}>
                <button
                    className="font-serif-ch custom-btn custom-btn-hover px-3 py-1 rounded-sm text-sm inline-block hover:text-green-1000 ">
                    See workshop
                </button>
            </Link>
        </div>
    </>
    )
}
export default SeeWorkshop;

const SubcatImageBorder = () => {
    return (
    <div className="subcat-image-borders w-5/4 ">
        <div className="subcat-image-border1 absolute w-px opacity-25 bg-black left-1/4 "></div>
        <div className="subcat-image-border2 absolute w-px opacity-25 bg-black hidden md:block md:left-1/2 "></div>
        <div className="subcat-image-border3 absolute w-px opacity-25 bg-black hidden md:block md:left-3/4"></div>
    </div>
    )
}
export default SubcatImageBorder;
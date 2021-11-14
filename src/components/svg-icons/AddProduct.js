function AddProduct({ mode }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill={`${mode==='dark' ? '#002c24' : '#fff'}`} viewBox="0 0 24 24"><polygon points="13 11 13 0 11 0 11 11 0 11 0 13 11 13 11 24 13 24 13 13 24 13 24 11 13 11"/></svg>
        );
  }
  
  export default AddProduct;
  
  
import Button from "../Elements/Button";

const CardProduct = (props) => {
    const {children} = props;
    return (
        <div className="w-full max-w-xs bg-gray-800 border border-gray-700 rounded-lg shadow flex flex-col justify-between mx-2 my-2">
            {children}  
        </div>
    );
}   

const Header = (props) => {
    const {image} = props;
    return (
        <a href="">
            <img 
            src={image} 
            alt="product" 
            className="p-8 rounded-t-lg w-full h-80 object-cover"
            />
        </a>  
    );
}

const Body = (props) => {
    const {children, name} = props;
    return (
        <div className="px-5 pb-5 h-full">
            <a href="">
                <h5 className="text-xl font-semibold tracking-tight text-white">
                    {name.substring(0, 20)} ...
                </h5>
                <p className="text-s text-white">
                    {children.substring(0, 100)} ...
                </p>
            </a>
        </div>
    );
}

const Footer = (props) => {
    const {price, handleAddToCart, id} = props;
    return (
        <div className="flex justify-between items-center px-5 pb-5">
            <span className="text-xl font-bold text-white">Rp. {price.toLocaleString('id-ID')}</span>
            <Button variant="bg-blue-600" onClick={() => handleAddToCart(id)}>Add to Cart</Button>
        </div>
    )
}

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
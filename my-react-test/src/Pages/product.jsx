import { useEffect, useRef, useState } from "react";
import Button from "../components/Elements/Button";
import CardProduct from "../components/Fragments/CardProduct";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { getProducts } from "../services/product.service";
import Dropdown from "../components/Fragments/DropDown";

const queryClient = new QueryClient();

const email = localStorage.getItem('email');

const ProductsPage = () => {

    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')) || []);
    }, []);


    const { data, isLoading, error } = useQuery('product', getProducts);
    
    useEffect(() => {
        
        if (isLoading) {
        console.log('Loading...');
        } else {
            setProducts(data);
        }
    
        if (error) {
        console.error('Error:', error);
        }
        
    }, [data, isLoading, error]);
      
    useEffect(() => {
        if(products.length > 0 && cart.length > 0 ){
            const total = cart.reduce((acc, item) => {
                const product = products.find(p => p.id === item.id);
                return acc + product.price * item.qty
            }, 0);
            setTotalPrice(total);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    },[cart, products]);

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        window.location.href = '/login'; 
    };

    const handleAddToCart = (id) => {
        if(!cart.find(item => item.id === id)){
            setCart([
                ...cart, 
                {
                id, 
                qty: 1
                }
            ])
        } else {
            setCart(cart.map(item => item.id === id ? {...item, qty: item.qty + 1} : item))
        }
    }

    const cartRef = useRef(JSON.parse(localStorage.getItem('cart')) || []);

    const handleAddToCartRef = (id) => {
        cartRef.current  = [...cartRef.current, {
            id, qty: 1
        }];
        localStorage.setItem('cart', JSON.stringify(cartRef.current));
    }

    const totalPriceRef = useRef(null);

    useEffect(() => {
        if(cart.length > 0){
            totalPriceRef.current.style.display = "table-row";
        }else{
            totalPriceRef.current.style.display = "none";
        }
    }, [cart]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-5">
                <Dropdown onSelectCategory={handleCategorySelect} />
                {email}
                <Button variant="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
            </div>
            <div className="flex justify-center py-5">
                <div className="w-4/6 flex flex-wrap">
                {products.length > 0 && products.map((product) => (
                    (!selectedCategory || selectedCategory === product.category) && (
                        <CardProduct key={product.id}>
                            <CardProduct.Header image={product.image}/>
                            <CardProduct.Body name={product.title}>
                                {product.description}
                            </CardProduct.Body>
                            <CardProduct.Footer 
                                price={product.price} 
                                handleAddToCart={handleAddToCart}
                                id={product.id}
                            />
                        </CardProduct>
                    )
                ))}

                </div>
                <div className="w-2/6">
                    <h1 className="text-3xl font-bold text-blue-600 ml-5 mb-2">Cart</h1>
                    <table className="table-auto text-left border-separate border-spacing-x-5">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 && cart.map((item) => {
                                const product = products.find(p => p.id === item.id);
                                return (
                                    <tr key={item.id}>
                                        <td>{product.title.substr(0, 20)}...</td>
                                        <td>Rp. {product.price.toLocaleString('id-ID')}</td>
                                        <td>{item.qty}</td>
                                        <td>Rp. {(product.price * item.qty).toLocaleString('id-ID')}</td>
                                    </tr>
                                );
                            })}
                            <tr ref={totalPriceRef}>
                                <td colSpan={3}>
                                    <b>Total Price</b>
                                </td>
                                <td>
                                    <b>
                                        Rp. {totalPrice.toLocaleString('id-ID')}
                                    </b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ProductsPage;
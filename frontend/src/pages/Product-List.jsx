import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import NavBar from "../components/navigation";
import Footer from '../components/footer';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/list-products/') // Replace with your actual API endpoint
      .then(response => {
        const productsArray = response.data.products || [];
  
        const mappedProducts = productsArray.map(product => ({
          slug: product.slug,
          name: product.name,
          price: `$${parseFloat(product.price).toFixed(2)}`,
          imageSrc: product.img_url || 'default_image_url',
          imageAlt: product.description,
        }));
  
        setProducts(mappedProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  

  return (
    <div className="bg-white">
      <div className='bg-white bg-opacity-10 backdrop-blur-md backdrop-filter'>
        <div className='bg-gray-900'><NavBar /></div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.slug} to={`/product/${product.slug}`} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom';
import Axios from 'axios';
import NavBar from '../components/navigation';
import Footer from '../components/footer';
import { addToCart } from '../redux/actions/cartActions';
import { Dialog, Disclosure, Popover, RadioGroup, Tab, Transition } from '@headlessui/react';
import { Bars3Icon, HeartIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
} 

export default function Product() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const handleAddToCart = (event) => {
    event.preventDefault();
  
    dispatch(addToCart({ ...product, quantity: Math.floor(product.quantity) + 1 }));
    console.log('Add to cart button used.');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!slug) {
          console.error('Product slug is missing');
          return;
        }
  
        const response = await Axios.get(`http://127.0.0.1:8000/api/get-product/${slug}/`);
  
        const responseData = response.data;
  
        if (!responseData || !responseData.product) {
          console.error('Invalid product data received');
          return;
        }
  
        const { product_id, name, price, quantity, img_url, description, weight, stock } = responseData.product;
  
        setProduct({
          product_id,
          name,
          price,
          quantity,
          description,
          weight,
          images: [{ id: 1, src: img_url, alt: name }],
        });
  
      } catch (error) {
        console.error('Error fetching product:', error);
        
      }
    };
  
    fetchProduct();
  }, [slug]);
  

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="bg-white">
      <NavBar />
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {product ? (
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image gallery */}
              <Tab.Group as="div" className="flex flex-col-reverse">
                {/* Image selector */}
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                  <Tab.List className="grid grid-cols-4 gap-6">
                    {product.images.map((image) => (
                      <Tab
                        key={image.id}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only">{image.name}</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <img src={image.src} alt="" className="h-full w-full object-cover object-center" />
                            </span>
                            <span
                              className={classNames(
                                selected ? 'ring-indigo-500' : 'ring-transparent',
                                'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>

                <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                  {product.images.map((image) => (
                    <Tab.Panel key={image.id}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover object-center sm:rounded-lg"
                      />
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>
                </div>

                {/* Reviews */}
                <div className="mt-3">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>

                  <div
                    className="space-y-6 text-base text-gray-700"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                <form className="mt-6" onSubmit={handleAddToCart}>
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm text-gray-600">Color</h3>
                    {/* Include your color options here */}
                  </div>

                  <div className="mt-10 flex">
                    <button
                      type="submit"
                      className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      Add to cart
                    </button>

                    <button
                      type="button"
                      className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                      <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                      <span className="sr-only">Add to favorites</span>
                    </button>
                  </div>
                </form>

                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Additional details
                  </h2>

                  <div className="divide-y divide-gray-200 border-t">
                    {/* Include your additional details here */}
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <p>Loading product...</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

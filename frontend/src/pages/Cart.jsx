import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/footer';
import NavBar from '../components/navigation';
import { useNavigate } from 'react-router';
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid';
import { removeFromCart, decreaseQuantity, addToCart } from '../redux/actions/cartActions';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Cart() {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.cart.items);
  const navigateTo = useNavigate();

  const navigateToCheckout = () => {
    navigateTo('/checkout');
  };

  const handleRemoveClick = (product) => {
    const productId = product.product_id;
    const newQuantity = Math.max(product.quantity - 1, 0);
  
    if (newQuantity === 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(decreaseQuantity(productId));
    }
  };
  
  const handleAddClick = (product) => {
    dispatch(addToCart({ ...product, quantity: product.quantity + 1 }));
  };
  

  const shippingRate = 0.1;

  const totalWeight = userCart.reduce((total, product) => {
    return total + parseFloat(product.weight) * parseFloat(product.quantity);
  }, 0);

  const shippingEstimate = totalWeight * shippingRate;

  const subtotal = userCart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const taxRate = 0.0832; 
  const tax = subtotal * taxRate;
  const orderTotal = subtotal + shippingEstimate + tax;


  return (
    <div className="bg-white">
      <NavBar />

      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {userCart.map((product) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.color}</p>
                          {product.size ? (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${product.id}`} className="sr-only">
                          Quantity, {product.name}
                        </label>
                        <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleAddClick(product)}
                          className="w-8 h-8 flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-full"
                        >
                          <span className="text-lg">+</span>
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveClick(product)}
                          className="w-8 h-8 flex items-center justify-center text-white bg-red-500 hover:bg-red-600 rounded-full"
                        >
                          <span className="text-lg">-</span>
                        </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                      )}

                      <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

           {/* Order summary */}
           <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how shipping is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">${shippingEstimate.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how tax is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">${orderTotal.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                onClick={navigateToCheckout}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

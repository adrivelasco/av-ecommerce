import Homepage from './homepage';
import Product from './product';
import NotFound from './not-found';
import Cart from './cart';

const views = [
  {
    path: '/',
    exact: true,
    title: Homepage.title,
    component: Homepage.component
  },
  {
    path: '/:productId-:productName',
    exact: true,
    title: Product.title,
    component: Product.component
  },
  {
    path: '/cart',
    exact: true,
    title: Cart.title,
    component: Cart.component
  },
  {
    path: '*',
    exact: false,
    title: NotFound.title,
    component: NotFound.component
  }
];

export default views;

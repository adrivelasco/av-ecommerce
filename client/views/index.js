import Homepage from './homepage';
import Product from './product';

const views = [
  {
    path: '/',
    exact: true,
    title: Homepage.title,
    component: Homepage.component
  },
  {
    path: '/product',
    exact: true,
    title: Product.title,
    component: Product.component
  }
];

export default views;

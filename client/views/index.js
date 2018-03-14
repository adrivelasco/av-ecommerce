import Homepage from './homepage';
import Product from './product';
import NotFound from './not-found';

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
    path: '*',
    exact: false,
    title: NotFound.title,
    component: NotFound.component
  }
];

export default views;

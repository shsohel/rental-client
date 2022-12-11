// ** Router Components
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import ProductList from '../views/rent/List/ProductList';
// ** Routes & Default Routes

const MainRouter = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;

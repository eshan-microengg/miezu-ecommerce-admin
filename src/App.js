import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/login";
import HomePage from './pages/homepage';
import AboutUsPage from './pages/aboutUs';
import WaterTypePage from './pages/waterType';
import SolutionPage from './pages/solution';
import Products from './pages/products';
import Orders from './pages/orders';

import Reviews from './pages/reviews&ratings';
import AddProductsPage from './pages/addProduct';
import EditProductsPage from './pages/editProduct';
import ViewOrdersPage from './pages/viewOrders';
import TestimonialPage from './pages/testimonial';
import ContactUsPage from './pages/contactUs';
import Employe from './pages/Employee';
import AddEmployeePage from './pages/addEmployee';
import DemoPage from "./pages/demos"
import Coupons from "./pages/coupons";
import Blogs from "./pages/blogs";
import AddBlogs from "./pages/blogs/addBlogs";
import Others from './pages/others';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/water-type" element={<WaterTypePage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/employee" element={<Employe />} />
      <Route path="/faq" element={<SolutionPage />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/reviews-and-ratings" element={<Reviews />} />
      <Route path="/testimonial" element={<TestimonialPage />} />
      {/* <Route path="/coupon-code" element={<Coupon_Code/>}/> */}
      <Route path="/add-products" element={<AddProductsPage />} />
      <Route path="/add-employee" element={<AddEmployeePage />} />
      <Route path="/edit-product/:id" element={<EditProductsPage />} />
      <Route path="/view-order/:id" element={<ViewOrdersPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/coupons" element={<Coupons />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<AddBlogs />} />
      <Route path="/others" element={<Others />} />
    </Routes>
  );
}

export default App;

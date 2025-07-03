import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Admin_page from './pages/Admin_page';
import Customer from './pages/Customer';
import UsersManagement from './pages/UsersManagement';
import ProductManagement from './pages/ProductManagement';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import SearchProduct from './pages/SearchProduct';
import DeleteProduct from './pages/DeleteProduct';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/admin" element={<Admin_page />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/admin/productmanagement" element={<ProductManagement />} />
      <Route path="/admin/usersmanagement" element={<UsersManagement />} />
      <Route path="/admin/productmanagement/add" element={<AddProduct />} />
      <Route path="/admin/productmanagement/update" element={<UpdateProduct />} />
      
      <Route path="/admin/productmanagement/search" element={<SearchProduct />} />
      <Route path="/admin/productmanagement/delete" element={<DeleteProduct />} />
    </Routes>
  );
}

export default App;

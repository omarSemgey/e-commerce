import "./App.css";
import { Route, Routes } from "react-router-dom";

//signing

import Sign from "./components/Sign/Sign";

//users

import Users from "./components/Users/Users";
import Home from "./components/Users/Home/Home";
import Item from "./components/Users/Item/Item";
import Search from "./components/Users/Search/Search";
import Contact from "./components/Users/Contact/Contact";
import Shop from "./components/Users/Shop/Shop";
import Cart from "./components/Users/Cart/Cart";
import Profile from "./components/Users/Profile/Profile";
import Edit from "./components/Users/Profile/Edit/Edit";
import Order from "./components/Users/Profile/Order/Order";

//dashboard

import Dashboard from "./components/Dashboard/Dashboard";
import Main from "./components/Dashboard/Main/Main";
import List from "./components/Dashboard/List/List";
import Form from "./components/Dashboard/Form/Form";
import Show from "./components/Dashboard/Show/Show";

//protected routes

import DashboardRoutes from "./protected routes/DashboardRoutes";
import UserRoutes from "./protected routes/UserRoutes";
import AdminRoutes from "./protected routes/AdminRoutes";
import Error from "./components/Error/Error";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Error></Error>}/>
        <Route path="/sign" element={<Sign></Sign>} />
        <Route element={<DashboardRoutes />}>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}>
            <Route index element={<Main></Main>} />
            //admin
            <Route element={<AdminRoutes></AdminRoutes>}>
              <Route path="users" element={<List></List>} />
              <Route path="users/:page" element={<List></List>} />
              <Route path="users/create" element={<Form></Form>} />
              <Route path="users/edit/:id" element={<Form type="edit"></Form>} />
              <Route path="admins" element={<List></List>} />
              <Route path="admins/:page" element={<List></List>} />
              <Route path="admins/create" element={<Form></Form>} />
              <Route path="admins/edit/:id" element={<Form type="edit"></Form>} />
              <Route path="sellers" element={<List></List>} />
              <Route path="sellers/:page" element={<List></List>} />
              <Route path="sellers/create" element={<Form></Form>} />
              <Route path="sellers/edit/:id" element={<Form type="edit"></Form>} />
              <Route path="categories" element={<List></List>} />
              <Route path="categories/create" element={<Form></Form>} />
              <Route path="categories/edit/:id" element={<Form type="edit"></Form>}/>
              <Route path="orders" element={<List></List>} />
              <Route path="orders/show/:id" element={<Show></Show>} />
            </Route>

            {/* seller and admin */}

            <Route path="companies" element={<List></List>} />
            <Route path="companies/create" element={<Form></Form>} />
            <Route path="companies/edit/:id" element={<Form type="edit"></Form>} />
            <Route path="items" element={<List></List>} />
            <Route path="items/:page" element={<List></List>} />
            <Route path="items/create" element={<Form></Form>} />
            <Route path="items/edit/:id" element={<Form type="edit"></Form>} />
          </Route>
        </Route>
        <Route element={<UserRoutes />}>
          <Route path="/" element={<Users></Users>}>
            <Route index element={<Home></Home>} />
            <Route path="/items/:id" element={<Item></Item>} />
            <Route path="/search/:search" element={<Search></Search>} />
            <Route path="/contact" element={<Contact></Contact>} />
            <Route path="/shop" element={<Shop></Shop>} />
            <Route path="/shop/:page" element={<Shop></Shop>} />
            <Route path="/shop/categories/:category" element={<Shop></Shop>} />
            <Route path="/shop/categories/:category/:page" element={<Shop></Shop>} />
            <Route path="/cart" element={<Cart></Cart>} />
            <Route path="/profile" element={<Profile></Profile>} />
            <Route path="/profile/edit" element={<Edit></Edit>} />
            <Route path="/profile/orders/:id" element={<Order></Order>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;

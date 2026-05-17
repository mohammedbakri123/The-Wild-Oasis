//libraries
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Pages
import Dashboard from "../core/pages/Dashboard";
import Account from "../features/authentication/pages/Account";
import Bookings from "../features/bookings/pages/Bookings";
import Booking from "../features/bookings/pages/Booking";

import Cabins from "../features/cabins/Cabins";
import Login from "../features/authentication/pages/Login";
import PageNotFound from "../core/pages/PageNotFound";
import Settings from "../features/settings/Settings";
import NewUsers from "../features/authentication/pages/Users";
import GlobalStyles from "../core/styles/GlobalStyles";
import Layout from "../core/layout/layout";
import ToastProvider from "../core/ui/ToastProvider";
import Checkin from "../features/check-in-out/pages/checkin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

//For react query devtools

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Dashboard />} /> */}
          <Route element={<Layout />}>
            <Route index element={<Navigate replace to="dashboard" />} />

            <Route path="dashboard" element={<Dashboard />} />

            <Route path="account" element={<Account />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:bookingId" element={<Booking />} />
            <Route path="checkin/:bookingId" element={<Checkin />} />
            <Route path="cabins" element={<Cabins />} />

            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<NewUsers />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastProvider />
    </QueryClientProvider>
  );
}
export default App;

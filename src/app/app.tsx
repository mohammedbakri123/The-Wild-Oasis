//libraries
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Pages
import Dashboard from "../core/pages/Dashboard";
import Account from "../core/pages/Account";
import Bookings from "../core/pages/Bookings";
import Cabins from "../features/cabins/Cabins";
import Login from "../core/pages/Login";
import PageNotFound from "../core/pages/PageNotFound";
import Settings from "../core/pages/Settings";
import NewUsers from "../core/pages/Users";
import GlobalStyles from "../core/styles/GlobalStyles";
import Layout from "../core/layout/layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retryDelay: (attempt) => attempt * 1000,
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
            <Route path="cabins" element={<Cabins />} />
            <Route path="login" element={<Login />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<NewUsers />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;

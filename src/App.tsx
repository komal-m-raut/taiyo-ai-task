import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ContactsPage from "./pages/ContactsPage";
import ChartPage from "./pages/ChartPage";
import Sidebar from "./components/Sidebar";
import store from "./store/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-grow p-4 bg-gray-100">
              <Routes>
                <Route path="/" element={<ContactsPage />} />
                <Route path="/charts" element={<ChartPage />} />
                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

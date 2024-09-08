import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ContactsPage from "./pages/ContactsPage";
import ChartPage from "./pages/ChartPage";
import Sidebar from "./components/Sidebar";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<ContactsPage />} />
              <Route path="/charts" element={<ChartPage />} />
              <Route
                path="*"
                element={
                  <div>
                    404 Not Found <br />
                    <a href="/">Go back to Contacts</a>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

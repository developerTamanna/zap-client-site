import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './App.css';
import 'aos/dist/aos.css';
import Aos from 'aos';
import AuthProvider from './contexts/AuthCOntext/AuthProvider.jsx';
import './index.css';
import { router } from './router/router.jsx';
Aos.init();
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="font_urbanist">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);

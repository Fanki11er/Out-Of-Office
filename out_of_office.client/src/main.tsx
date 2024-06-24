import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./styles/GlobalStyle.tsx";
import { ThemeProvider } from "styled-components";

import { theme } from "./styles/theme.ts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider.tsx";
import AppRouter from "./router/router.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);

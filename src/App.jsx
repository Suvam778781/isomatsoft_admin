import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChakraProvider>
      <BrowserRouter>
        <Sidebar />
        <Box
          p={4}
          width={"100%"}
          minHeight="100vh"
          bg="rgba(255, 255, 255, 0.9)"
          borderRadius="md"
         
        >
          <AppRoutes />
        </Box>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;

import { ChakraProvider } from "@chakra-ui/react";
import PokemonCard from "./pages/PokemonCard";
import PokemonDetail from "./pages/PokemonDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MyPokemon from "./pages/MyPokemonList";
import { useSelector, useDispatch } from "react-redux";

function App() {
  // Global state
  const global = useSelector((state) => {
    return state.pokemon;
  });

  const dispatch = useDispatch();
  console.log("Global", global);
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PokemonCard />}></Route>
          <Route path="/detail/:id" element={<PokemonDetail />}></Route>
          <Route path="/my-pokemon" element={<MyPokemon />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

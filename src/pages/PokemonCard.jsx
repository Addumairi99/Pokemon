import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PokemonCard() {
  const [listPokemon, setListPokemon] = useState([]);
  const [offset, setOffset] = useState(20);

  let navigate = useNavigate();

  useEffect(() => {
    const pokeFun = async () => {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=20`
      );
      getPokemon(res.data.results);
    };
    pokeFun();
  }, []);

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setListPokemon((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  const formatPokemonId = (id) => {
    if (id < 10) return `#00${id}`;
    else if (id >= 10 && id < 99) return `#0${id}`;
    else return `#${id}`;
  };
  // const fetchData = () => {
  //   console.log("Fetch More");
  // };

  const fetchComments = async () => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=20`
    );
    getPokemonNew(res.data.results);
  };

  const getPokemonNew = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setListPokemon((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  const fetchData = async () => {
    fetchComments();
    setOffset(offset + 20);
  };

  console.log(listPokemon);
  const renderPokemon = () => {
    return listPokemon.map((val, index) => {
      return (
        <Center key={index} py={16}>
          <Box
            role={"group"}
            m={1}
            p={6}
            w={"full"}
            bg={"white"}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={1}
          >
            <Box
              rounded={"lg"}
              mt={-20}
              pos={"relative"}
              _after={{
                transition: "all .3s ease",
                content: '""',
                w: "full",
                h: "full",
                pos: "absolute",
                top: 5,
                left: 0,
                filter: "blur(15px)",
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: "blur(20px)",
                },
              }}
            >
              <Image
                rounded={"lg"}
                height={200}
                width={282}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${val.id}.svg`}
              />
            </Box>
            <Stack pt={10} align={"center"}>
              <Text
                color={"gray.500"}
                fontSize={"sm"}
                textTransform={"uppercase"}
              >
                {formatPokemonId(val.id)}
              </Text>
              <Heading
                fontSize={"2xl"}
                fontFamily={"body"}
                fontWeight={500}
                textTransform={"capitalize"}
              >
                {val.name}
              </Heading>
              <Stack direction={"row"} align={"center"}>
                <Text
                  fontSize={"sm"}
                  fontWeight={500}
                  bg={"green.50"}
                  p={2}
                  px={3}
                  color={"green.500"}
                  rounded={"full"}
                >
                  Owned : 0
                </Text>
              </Stack>

              <Button
                onClick={() => {
                  navigate(`/detail/${val.id}`);
                }}
                w={"full"}
                mt={8}
                bg={"blue.800"}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Detail
              </Button>
            </Stack>
          </Box>
        </Center>
      );
    });
  };

  return (
    <InfiniteScroll
      dataLength={listPokemon.length} //This is important field to render the next data
      next={fetchData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Flex justifyContent={"center"} wrap="wrap">
        {renderPokemon()}
      </Flex>
    </InfiniteScroll>
  );
}

export default PokemonCard;

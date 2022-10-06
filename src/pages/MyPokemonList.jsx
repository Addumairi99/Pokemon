import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdCatchingPokemon } from "react-icons/md";

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";

function MyPokemon() {
  const [listPokemon, setListPokemon] = useState([]);

  const formatPokemonId = (id) => {
    if (id < 10) return `#00${id}`;
    else if (id >= 10 && id < 99) return `#0${id}`;
    else return `#${id}`;
  };

  // global state
  const pokemon = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();

  useEffect(() => {
    pokemon.map(async (item) => {
      const result = await axios.get(item.url);
      setListPokemon((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  }, [pokemon]);

  const onButtonRealese = (id) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
  };

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
              <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                {val.name}
              </Heading>

              <Button
                onClick={() => onButtonRealese(val.name)}
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
                RELEASE
              </Button>
            </Stack>
          </Box>
        </Center>
      );
    });
  };

  return (
    <Flex justifyContent={"center"} wrap="wrap">
      {pokemon.length ? (
        renderPokemon()
      ) : (
        <Box textAlign="center" py={10} px={6}>
          <Icon as={MdCatchingPokemon} h={32} w={32} alignSelf={"center"} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            You have no pokemon
          </Heading>
        </Box>
      )}
    </Flex>
  );
}

export default MyPokemon;

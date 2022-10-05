import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  useToast,
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";

export default function PokemonDetail() {
  const [pokemon, setPokemon] = useState("");
  const [eggGroup, setEggGroup] = useState([]);
  const [growRate, setGrowrate] = useState({});
  const [habitat, setHabitat] = useState({});
  const [text, setText] = useState("");
  const [shape, setShape] = useState({});
  const params = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  const pokeFun = async () => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${params.id}/`
    );

    setPokemon(res.data);
    setEggGroup(res.data.egg_groups);
    setGrowrate(res.data.growth_rate);
    setHabitat(res.data.habitat);
    setText(res.data.flavor_text_entries[0].flavor_text);
    setShape(res.data.shape);
  };

  useEffect(() => {
    pokeFun();
  }, []);

  const formatPokemonId = (id) => {
    if (id < 10) return `#00${id}`;
    else if (id >= 10 && id < 99) return `#0${id}`;
    else return `#${id}`;
  };

  const onCatch = () => {
    const random = Math.floor(Math.random() * pokemon.capture_rate);
    console.log(random);
    if (random > 25) {
      dispatch({
        type: "ADD_FAVORITE",
        payload: {
          id: pokemon.id,
          name: pokemon.name,
          url: `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`,
        },
      });
      toast({
        title: "Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg					`}
            // fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              textTransform={"capitalize"}
            >
              {pokemon.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {formatPokemonId(pokemon.id)}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{text}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Egg Groups
              </Text>
              {eggGroup.map((val, index) => {
                return (
                  <SimpleGrid
                    key={index}
                    columns={{ base: 1, md: 2 }}
                    spacing={10}
                  >
                    <List spacing={2}>
                      <ListItem></ListItem>
                      <ListItem textTransform={"capitalize"}>
                        {val.name}
                      </ListItem>{" "}
                    </List>
                  </SimpleGrid>
                );
              })}
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Pokemon Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} textTransform={"capitalize"}>
                    Capture rate: {pokemon.capture_rate}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text as={"span"} textTransform={"capitalize"}>
                    Base happiness: {pokemon.base_happiness}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text as={"span"} textTransform={"capitalize"}>
                    Grow Rate: {growRate.name}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text as={"span"} textTransform={"capitalize"}>
                    Shape: {shape.name}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text as={"span"} textTransform={"capitalize"}>
                    Habitat: {habitat.name}
                  </Text>
                </ListItem>
              </List>
            </Box>
          </Stack>
          <Flex justifyContent={"center"}>
            <Button
              onClick={onCatch}
              position={"unset"}
              rounded={"full"}
              w={"40"}
              h={"40"}
              mt={8}
              size={"lg"}
              py={"7"}
              // objectFit={'cover'}

              bg={useColorModeValue("blue.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Catch
            </Button>
          </Flex>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

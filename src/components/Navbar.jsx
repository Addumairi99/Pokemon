import {
  Icon,
  Box,
  Flex,
  HStack,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";

import { SiPokemon } from "react-icons/si";
import { GiSchoolBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isOpen } = useDisclosure();
  let navigate = useNavigate();

  return (
    <>
      <Box bg={useColorModeValue("white", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Icon as={SiPokemon} h={32} w={32} alignSelf={"center"} />
          </HStack>
          <Flex alignItems={"center"}>
            <HStack spacing={8} alignItems={"center"}>
              <Icon
                onClick={() => {
                  navigate(`/my-pokemon/`);
                }}
                _hover={{
                  background: "white",
                  color: "teal.500",
                }}
                as={GiSchoolBag}
                h={10}
                w={10}
                alignSelf={"center"}
              />
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}></Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

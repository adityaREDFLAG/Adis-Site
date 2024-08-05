import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const App = () => {
  const [input, setInput] = useState('');
  const bg = useColorModeValue('gray.100', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const buttonBg = useColorModeValue('gray.200', 'gray.600');

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput('Error');
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <Center minH="100vh" bg={bg} p={4}>
      <VStack spacing={4}>
        <Heading mb={4}>Calculator</Heading>
        <Box
          w="100%"
          maxW="400px"
          bg={boxBg}
          p={4}
          borderRadius="md"
          boxShadow="md"
        >
          <Box
            bg="gray.300"
            p={4}
            mb={4}
            borderRadius="md"
            textAlign="right"
            fontSize="2xl"
            minH="50px"
          >
            {input}
          </Box>
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            {['7', '8', '9', '/'].map((value) => (
              <GridItem key={value}>
                <Button
                  w="100%"
                  h="60px"
                  bg={buttonBg}
                  onClick={() => handleClick(value)}
                >
                  {value}
                </Button>
              </GridItem>
            ))}
            {['4', '5', '6', '*'].map((value) => (
              <GridItem key={value}>
                <Button
                  w="100%"
                  h="60px"
                  bg={buttonBg}
                  onClick={() => handleClick(value)}
                >
                  {value}
                </Button>
              </GridItem>
            ))}
            {['1', '2', '3', '-'].map((value) => (
              <GridItem key={value}>
                <Button
                  w="100%"
                  h="60px"
                  bg={buttonBg}
                  onClick={() => handleClick(value)}
                >
                  {value}
                </Button>
              </GridItem>
            ))}
            {['0', '.', 'C', '+'].map((value) => (
              <GridItem key={value}>
                <Button
                  w="100%"
                  h="60px"
                  bg={buttonBg}
                  onClick={() => handleClick(value)}
                >
                  {value}
                </Button>
              </GridItem>
            ))}
            <GridItem colSpan={4}>
              <Button
                w="100%"
                h="60px"
                bg="blue.500"
                color="white"
                onClick={() => handleClick('=')}
              >
                =
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </Center>
  );
};

export default Calculator;

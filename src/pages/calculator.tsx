import * as React from 'react';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Box, Button, Center, Heading, Input, VStack, useColorMode } from '@chakra-ui/react';
import type { NextPage } from 'next';

const Calculator: NextPage = () => {
  const [input, setInput] = useState<string>('');
  const { colorMode } = useColorMode();

  const handleClick = (value: string) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput('Error');
    }
  };

  const bgColor = { light: 'gray.50', dark: 'gray.900' };
  const textColor = { light: 'black', dark: 'white' };
  const buttonBgColor = { light: 'yellow.400', dark: 'yellow.300' };

  return (
    <>
      <NextSeo title="Calculator" titleTemplate="%s" />
      <Box minH="100vh" bg={bgColor[colorMode]} p={8}>
        <Center flexDirection="column" minH="100vh">
          <Box p={8} borderRadius="lg" shadow="md" bg={bgColor[colorMode]}>
            <Heading mb={4} color={textColor[colorMode]}>Calculator</Heading>
            <VStack spacing={4}>
              <Input
                value={input}
                readOnly
                size="lg"
                textAlign="right"
                mb={4}
                color={textColor[colorMode]}
                bg={bgColor[colorMode]}
              />
              <Box>
                <Button onClick={() => handleClick('1')} bg={buttonBgColor[colorMode]} m={1}>1</Button>
                <Button onClick={() => handleClick('2')} bg={buttonBgColor[colorMode]} m={1}>2</Button>
                <Button onClick={() => handleClick('3')} bg={buttonBgColor[colorMode]} m={1}>3</Button>
                <Button onClick={() => handleClick('+')} bg={buttonBgColor[colorMode]} m={1}>+</Button>
              </Box>
              <Box>
                <Button onClick={() => handleClick('4')} bg={buttonBgColor[colorMode]} m={1}>4</Button>
                <Button onClick={() => handleClick('5')} bg={buttonBgColor[colorMode]} m={1}>5</Button>
                <Button onClick={() => handleClick('6')} bg={buttonBgColor[colorMode]} m={1}>6</Button>
                <Button onClick={() => handleClick('-')} bg={buttonBgColor[colorMode]} m={1}>-</Button>
              </Box>
              <Box>
                <Button onClick={() => handleClick('7')} bg={buttonBgColor[colorMode]} m={1}>7</Button>
                <Button onClick={() => handleClick('8')} bg={buttonBgColor[colorMode]} m={1}>8</Button>
                <Button onClick={() => handleClick('9')} bg={buttonBgColor[colorMode]} m={1}>9</Button>
                <Button onClick={() => handleClick('*')} bg={buttonBgColor[colorMode]} m={1}>*</Button>
              </Box>
              <Box>
                <Button onClick={handleClear} bg={buttonBgColor[colorMode]} m={1}>C</Button>
                <Button onClick={() => handleClick('0')} bg={buttonBgColor[colorMode]} m={1}>0</Button>
                <Button onClick={handleCalculate} bg={buttonBgColor[colorMode]} m={1}>=</Button>
                <Button onClick={() => handleClick('/')} bg={buttonBgColor[colorMode]} m={1}>/</Button>
              </Box>
            </VStack>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default Calculator;

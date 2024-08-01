import React, { useState } from 'react';
import { Box, Center, Heading, Text, VStack, Button, Spinner, useColorMode } from '@chakra-ui/react';

const SpeedTest = () => {
  const [speed, setSpeed] = useState<number | null>(null);
  const [testing, setTesting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { colorMode } = useColorMode();
  
  const bgColor = { light: 'gray.50', dark: 'gray.900' };
  const textColor = { light: 'red.500', dark: 'red.200' };
  const boxBgColor = { light: 'red.100', dark: 'red.700' };
  const buttonBgColor = { light: 'yellow.400', dark: 'yellow.300' };

  const testSpeed = async () => {
    setTesting(true);
    setSpeed(null);
    setError(null);

    try {
      const startTime = Date.now();

      // Fetch a large amount of dummy data
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const endTime = Date.now();

      const duration = endTime - startTime; // Time in milliseconds
      setSpeed(duration);
    } catch (err) {
      setError('Failed to measure speed. Please try again.');
    }

    setTesting(false);
  };

  return (
    <Center minH="100vh" flexDirection="column" p={8} bg={bgColor[colorMode]}>
      <Box bg={boxBgColor[colorMode]} p={8} borderRadius="lg" shadow="md">
        <Heading mb={4} color={textColor[colorMode]}>Internet Speed Test</Heading>
        <VStack spacing={4}>
          <Text fontSize="8xl" color={textColor[colorMode]}>
            {speed !== null ? `${speed} ms` : '0 ms'}
          </Text>
          {error && <Text color="red.500">{error}</Text>}
          <Button
            onClick={testSpeed}
            isDisabled={testing}
            bg={buttonBgColor[colorMode]}
            size="lg"
          >
            {testing ? <Spinner size="lg" /> : 'Test Speed'}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default SpeedTest;

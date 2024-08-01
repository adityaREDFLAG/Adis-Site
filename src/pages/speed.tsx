import React, { useState } from 'react';
import { Box, Center, Heading, Text, VStack, Button, Spinner } from '@chakra-ui/react';

const SpeedTest = () => {
  const [speed, setSpeed] = useState<number | null>(null);
  const [testing, setTesting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    <Center minH="100vh" flexDirection="column" p={8} bg="#1a202c">
      <Heading mb={4} color="#FF4545">Speed Test</Heading>
      <VStack spacing={4}>
        <Text fontSize="8xl" color="gray.300">
          {speed !== null ? `${speed} ms` : '0 ms'}
        </Text>
        {error && <Text color="red.500">{error}</Text>}
        <Button
          onClick={testSpeed}
          isDisabled={testing}
          bg="#FF4545"
          color="white"
          size="lg"
          _hover={{ bg: "#FF4545" }}
        >
          {testing ? <Spinner size="lg" color="white" /> : 'Test Again'}
        </Button>
      </VStack>
    </Center>
  );
};

export default SpeedTest;

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

      const duration = (endTime - startTime) / 1000; // Time in seconds
      const dataSize = JSON.stringify(data).length / (1024 * 1024); // Size in MB

      const speed = dataSize / duration; // Speed in MBps
      setSpeed(speed);
    } catch (err) {
      setError('Failed to measure speed. Please try again.');
    }

    setTesting(false);
  };

  return (
    <Center minH="100vh" flexDirection="column" p={8} bg="white">
      <Heading mb={4}>Speed Test</Heading>
      <VStack spacing={4}>
        <Text fontSize="8xl" color="gray.300">
          {speed !== null ? speed.toFixed(2) : 0}
        </Text>
        {error && <Text color="red.500">{error}</Text>}
        <Button
          onClick={testSpeed}
          isDisabled={testing}
          colorScheme="orange"
          size="lg"
        >
          {testing ? <Spinner size="lg" /> : 'Test Again'}
        </Button>
      </VStack>
    </Center>
  );
};

export default SpeedTest;

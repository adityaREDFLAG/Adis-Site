import React, { useState } from 'react';
import { Box, Center, Heading, Text, VStack, Button, Spinner } from '@chakra-ui/react';

const SpeedTest = () => {
  const [speed, setSpeed] = useState(null);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState(null);

  const testSpeed = async () => {
    setTesting(true);
    setSpeed(null);
    setError(null);

    try {
      const startTime = Date.now();

      // Fetch a large file to measure download speed
      const response = await fetch('https://speed.hetzner.de/100MB.bin');
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const endTime = Date.now();

      const duration = (endTime - startTime) / 1000; // Time in seconds
      const dataSize = blob.size / (1024 * 1024); // Size in MB

      const downloadSpeed = dataSize / duration; // Speed in MBps
      setSpeed(downloadSpeed);
    } catch (err) {
      setError('Failed to measure speed. Please try again.');
    }

    setTesting(false);
  };

  return (
    <Center minH="100vh" flexDirection="column" p={8} bg="#f0f4f8">
      <Box bg="#FF4545" p={8} borderRadius="lg" boxShadow="xl">
        <Heading mb={4} color="white">Internet Speed Test</Heading>
        <VStack spacing={4}>
          {speed !== null && (
            <Text fontSize="3xl" color="white">
              Download Speed: {speed.toFixed(2)} MBps
            </Text>
          )}
          {error && <Text color="red.500">{error}</Text>}
          <Button onClick={testSpeed} isDisabled={testing} colorScheme="yellow" size="lg">
            {testing ? <Spinner size="lg" /> : 'Test Speed'}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default SpeedTest;

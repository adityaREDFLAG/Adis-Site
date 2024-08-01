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
      const response = await fetch('https://ash-speed.hetzner.com/1GB.bin');
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
    <Center minH="100vh" flexDirection="column" p={8} bg="#1A202C">
      <Box bg="#2D3748" p={8} borderRadius="lg" boxShadow="xl" width="100%" maxWidth="500px">
        <Heading mb={4} color="#E53E3E" textAlign="center">Internet Speed Test</Heading>
        <VStack spacing={4}>
          {speed !== null && (
            <Text fontSize="3xl" color="white" textAlign="center">
              Download Speed: {speed.toFixed(2)} MBps
            </Text>
          )}
          {error && <Text color="#E53E3E" textAlign="center">{error}</Text>}
          <Button onClick={testSpeed} isDisabled={testing} colorScheme="red" size="lg">
            {testing ? <Spinner size="lg" /> : 'Test Speed'}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default SpeedTest;

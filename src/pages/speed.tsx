import React, { useState } from 'react';
import { Box, Center, Heading, Text, VStack, Button, Spinner } from '@chakra-ui/react';

const SpeedTest = () => {
  const [speed, setSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [ping, setPing] = useState(null);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState(null);

  const testSpeed = async () => {
    setTesting(true);
    setSpeed(null);
    setUploadSpeed(null);
    setPing(null);
    setError(null);

    try {
      const result = await fetch('/api/speedtest');
      const data = await result.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSpeed(data.download.bandwidth / 125000); // Convert from bits per second to MBps
        setUploadSpeed(data.upload.bandwidth / 125000); // Convert from bits per second to MBps
        setPing(data.ping.latency);
      }
    } catch (err) {
      setError('Failed to measure speed. Please try again.');
    }

    setTesting(false);
  };

  return (
    <Center minH="100vh" flexDirection="column" p={8} bg="white">
      <Heading mb={4}>Internet Speed Test</Heading>
      <VStack spacing={4}>
        {speed !== null && <Text fontSize="3xl">Download Speed: {speed.toFixed(2)} MBps</Text>}
        {uploadSpeed !== null && <Text fontSize="3xl">Upload Speed: {uploadSpeed.toFixed(2)} MBps</Text>}
        {ping !== null && <Text fontSize="3xl">Ping: {ping} ms</Text>}
        {error && <Text color="red.500">{error}</Text>}
        <Button onClick={testSpeed} isDisabled={testing} colorScheme="orange" size="lg">
          {testing ? <Spinner size="lg" /> : 'Test Speed'}
        </Button>
      </VStack>
    </Center>
  );
};

export default SpeedTest;

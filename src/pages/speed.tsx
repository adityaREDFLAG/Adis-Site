import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Center, Box, Heading, Text, Button, VStack, Spinner, useColorMode } from '@chakra-ui/react';
import type { NextPage } from 'next';

const SpeedTest: NextPage = () => {
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
      const dataSizeInBytes = JSON.stringify(data).length; // Size in bytes
      const durationInSeconds = duration / 1000; // Convert milliseconds to seconds
      const speedInBps = dataSizeInBytes / durationInSeconds * 8; // Convert bytes to bits and calculate bits per second

      setSpeed(speedInBps);
    } catch (err) {
      setError('Failed to measure speed. Please try again.');
    }

    setTesting(false);
  };

  const formatSpeed = (speed: number | null) => {
    if (speed === null) return '0 bps';
    if (speed >= 1e9) return `${(speed / 1e9).toFixed(2)} Gbps`;
    if (speed >= 1e6) return `${(speed / 1e6).toFixed(2)} Mbps`;
    if (speed >= 1e3) return `${(speed / 1e3).toFixed(2)} Kbps`;
    return `${speed.toFixed(2)} bps`;
  };

  return (
    <>
      <NextSeo title="Internet Speed Test" titleTemplate="%s" />
      <Box minH="100vh" bg={bgColor[colorMode]} p={8}>
        <Center flexDirection="column" minH="100vh">
          <Box bg={boxBgColor[colorMode]} p={8} borderRadius="lg" shadow="md">
            <Heading mb={4} color={textColor[colorMode]}>Internet Speed Test</Heading>
            <VStack spacing={4}>
              <Text fontSize="8xl" color={textColor[colorMode]}>
                {formatSpeed(speed)}
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
      </Box>
    </>
  );
};

export default SpeedTest;

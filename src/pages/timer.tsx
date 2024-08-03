import React, { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Center, Box, Heading, Input, Button, VStack, HStack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import type { NextPage } from 'next';

const Timer: NextPage = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('black', 'white');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft !== null && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(null);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (time: number) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <NextSeo title="Timer" titleTemplate="%s" />
      <Center minH="100vh" p={8} bg={bg} color={textColor}>
        <Box textAlign="center" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" bg={useColorModeValue('white', 'gray.700')}>
          <Heading as="h1" size="xl" mb={6}>
            Timer
          </Heading>
          <VStack spacing={4} mb={6}>
            <HStack spacing={4}>
              <Input
                type="number"
                placeholder="Hours"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />
              <Input
                type="number"
                placeholder="Minutes"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
              <Input
                type="number"
                placeholder="Seconds"
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
              />
            </HStack>
            <Text fontSize="2xl">
              {timeLeft !== null ? formatTime(timeLeft) : '00:00:00'}
            </Text>
          </VStack>
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={startTimer} isDisabled={isRunning}>
              Start
            </Button>
            <Button colorScheme="red" onClick={stopTimer} isDisabled={!isRunning}>
              Stop
            </Button>
            <Button colorScheme="yellow" onClick={resetTimer}>
              Reset
            </Button>
          </HStack>
          <Button mt={4} onClick={toggleColorMode}>
            Toggle {useColorModeValue('Dark', 'Light')} Mode
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default Timer;

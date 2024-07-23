import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

const HeadsOrTails: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<string | null>(null);

  useEffect(() => {
    if (outcome) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const headsImage = new Image();
      const tailsImage = new Image();

      headsImage.src = '/Heads.png';
      tailsImage.src = '/Tails.png';

      const image = outcome === 'Heads' ? headsImage : tailsImage;

      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the coin image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Add blur effect
        ctx.filter = 'blur(2px)';

        // Draw the text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 50px Arial';
        ctx.fillText(outcome, canvas.width / 2 - ctx.measureText(outcome).width / 2, canvas.height / 2 + 15);
      };
    }
  }, [outcome]);

  const flipCoin = () => {
    if (spinning) return;
    setSpinning(true);

    const spinDuration = 1000; // duration of the spin in ms
    const outcomes = ['Heads', 'Tails'];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];

    setTimeout(() => {
      setOutcome(result);
      setSpinning(false);
    }, spinDuration);
  };

  return (
    <Center minH="100vh" flexDirection="column" p={8}>
      <NextSeo title="Heads or Tails" />
      <Heading mb={4}>Heads or Tails</Heading>
      <VStack mb={4} spacing={4}>
        <Button onClick={flipCoin} isDisabled={spinning} backgroundColor="#FF4545" color="white">
          Flip Coin
        </Button>
      </VStack>
      <Box position="relative">
        <canvas ref={canvasRef} width={300} height={300} style={{ transition: 'transform 1s ease-out' }} />
      </Box>
      {outcome && (
        <Box mt={4} p={4} backgroundColor="#FF4545" color="white" borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">
            Outcome: {outcome}
          </Text>
        </Box>
      )}
    </Center>
  );
};

export default HeadsOrTails;

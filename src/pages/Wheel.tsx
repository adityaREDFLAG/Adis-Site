import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

const WheelSpinner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [names, setNames] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [spinning, setSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);

  const addName = () => {
    if (name.trim() !== '') {
      setNames([...names, name]);
      setName('');
    }
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numSegments = names.length;
    const angleStep = (2 * Math.PI) / numSegments;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rotate the entire wheel
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation * Math.PI / 180); // Rotate by the current rotation state
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    names.forEach((name, index) => {
      const angle = index * angleStep;

      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        angle,
        angle + angleStep
      );
      ctx.closePath();

      ctx.fillStyle = `hsl(${(360 / numSegments) * index}, 70%, 60%)`;
      ctx.fill();

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle + angleStep / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(name, 0, -canvas.height / 2 + 20);
      ctx.restore();
    });

    ctx.restore(); // Restore to remove rotation effect for the arrow

    // Draw the arrow at the top
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(0, -canvas.height / 2);
    ctx.lineTo(-15, -canvas.height / 2 + 30);
    ctx.lineTo(15, -canvas.height / 2 + 30);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();
  };

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const spinDuration = 3000; // duration of the spin in ms
    const spinAngle = Math.random() * 360 + 720; // random angle between 720 and 1080 degrees

    let start = 0;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / spinDuration, 1);
      const easing = progress * (2 - progress);
      const angle = easing * spinAngle;

      setRotation(angle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const numSegments = names.length;
        const winningIndex = Math.floor(
          ((angle % 360) / 360) * numSegments
        );
        setWinner(names[winningIndex]);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    drawWheel();
  }, [names, rotation]);

  return (
    <Center minH="100vh" flexDirection="column" p={8}>
      <NextSeo title="Wheel Spinner" />
      <Heading mb={4}>Wheel Spinner</Heading>
      <VStack mb={4} spacing={4}>
        <HStack>
          <Input
            placeholder="Enter a name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={addName} backgroundColor="#FF4545" color="white">
            Add Name
          </Button>
        </HStack>
        <Button onClick={spinWheel} isDisabled={spinning} backgroundColor="#FF4545" color="white">
          Spin Wheel
        </Button>
      </VStack>
      <Box position="relative">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
        />
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          <Text fontSize="2xl" fontWeight="bold" color="#FF4545">
            ▼
          </Text>
        </Box>
      </Box>
      {winner && (
        <Box mt={4} p={4} backgroundColor="#FF4545" color="white" borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">
            Winner: {winner}
          </Text>
        </Box>
      )}
    </Center>
  );
};

export default WheelSpinner

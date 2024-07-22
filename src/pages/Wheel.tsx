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
  List,
  ListItem,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

const WheelSpinner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [names, setNames] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [spinning, setSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);

  const addName = () => {
    if (name.trim() !== '') {
      setNames([...names, name]);
      setName('');
    }
  };

  const removeName = (nameToRemove: string) => {
    setNames(names.filter((n) => n !== nameToRemove));
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numSegments = names.length;
    const angleStep = (2 * Math.PI) / numSegments;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      ctx.translate(
        canvas.width / 2 +
          (canvas.width / 2.5) * Math.cos(angle + angleStep / 2),
        canvas.height / 2 +
          (canvas.height / 2.5) * Math.sin(angle + angleStep / 2)
      );
      ctx.rotate(angle + angleStep / 2 + Math.PI / 2);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(name, -ctx.measureText(name).width / 2, 0);
      ctx.restore();
    });
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

      canvas.style.transform = `rotate(${angle}deg)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const numSegments = names.length;
        const winningIndex = Math.floor(
          (numSegments - (angle % 360) / (360 / numSegments)) % numSegments
        );
        setWinner(names[winningIndex]);

        const finalAngle = (360 - (angle % 360)) + 90; // Adjust the final angle to ensure the winning segment is at the top
        canvas.style.transform = `rotate(${finalAngle}deg)`;
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    drawWheel();
  }, [names]);

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
      <List spacing={3} mb={4}>
        {names.map((name, index) => (
          <ListItem key={index} display="flex" alignItems="center">
            <Text flex="1">{name}</Text>
            <Button
              aria-label={`Remove ${name}`}
              size="sm"
              onClick={() => removeName(name)}
              backgroundColor="#FF4545"
              color="white"
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      <Box position="relative">
        <canvas ref={canvasRef} width={500} height={500} style={{ transition: 'transform 3s ease-out' }} />
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%) rotate(90deg)">
          <Text fontSize="lg" fontWeight="bold">
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

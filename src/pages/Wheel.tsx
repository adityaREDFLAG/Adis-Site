import * as React from 'react'; //idk really what i am doing lol
import { useRef, useState, useEffect } from 'react'; 
import { Box, Button, Center, Heading, Input, VStack, HStack, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

const WheelSpinner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [names, setNames] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [winner, setWinner] = useState<string>('');

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
    if (canvas && names.length > 0) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const numOfNames = names.length;
        const angle = (2 * Math.PI) / numOfNames;
        const radius = canvas.width / 2;
        const colors = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#955251', '#B565A7', '#009B77'];

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        names.forEach((name, index) => {
          const startAngle = index * angle;
          const endAngle = startAngle + angle;
          ctx.beginPath();
          ctx.moveTo(radius, radius);
          ctx.arc(radius, radius, radius, startAngle, endAngle);
          ctx.fillStyle = colors[index % colors.length];
          ctx.fill();
          ctx.stroke();

          ctx.save();
          ctx.translate(radius, radius);
          ctx.rotate(startAngle + angle / 2);
          ctx.textAlign = 'right';
          ctx.fillStyle = '#000000';
          ctx.font = '16px Arial';
          ctx.fillText(name, radius - 10, 10);
          ctx.restore();
        });

        // Draw the arrow
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(radius - 15, 30);
        ctx.lineTo(radius + 15, 30);
        ctx.closePath();
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }
    }
  };

  const spinWheel = () => {
    if (names.length > 0) {
      const randomIndex = Math.floor(Math.random() * names.length);
      setWinner(names[randomIndex]);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const totalSpins = 5; // Total spins before stopping
          const spinDuration = 4000; // Total spin duration in ms
          const start = performance.now();

          const animate = (time: number) => {
            const elapsed = time - start;
            const progress = Math.min(elapsed / spinDuration, 1);
            const angle = (progress * totalSpins * 2 * Math.PI) + (2 * Math.PI / names.length * randomIndex);

            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angle);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            drawWheel();
            ctx.restore();

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setWinner(names[randomIndex]);
            }
          };

          requestAnimationFrame(animate);
        }
      }
    }
  };

  useEffect(() => {
    drawWheel();
  }, [names]);

  return (
    <>
      <NextSeo title="Wheel Spinner" titleTemplate="%s" />
      <Center minH="100vh" flexDirection="column" p={8}>
        <Box textAlign="center" p={4} mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            Wheel Spinner
          </Heading>
          <Text fontSize="lg" mb={6}>
            Add names and spin the wheel to pick a winner!
          </Text>
        </Box>

        <VStack spacing={8} maxW="container.md" align="center">
          <Box textAlign="left" width="100%">
            <HStack>
              <Input
                placeholder="Enter a name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button onClick={addName} backgroundColor="#FF6F61" color="white">
                Add Name
              </Button>
            </HStack>
            {names.map((name) => (
              <HStack key={name} justifyContent="space-between" mt={2}>
                <Text>{name}</Text>
                <Button size="sm" colorScheme="red" onClick={() => removeName(name)}>
                  Remove
                </Button>
              </HStack>
            ))}
          </Box>

          <canvas ref={canvasRef} width={300} height={300} style={{ border: '2px solid #FFFFFF' }} />

          <Button onClick={spinWheel} backgroundColor="#FF6F61" color="white">
            Spin Wheel
          </Button>

          {winner && (
            <Box textAlign="center" mt={4}>
              <Text fontSize="2xl" fontWeight="bold">
                Winner: {winner}
              </Text>
            </Box>
          )}
        </VStack>
      </Center>
    </>
  );
};

export default WheelSpinner

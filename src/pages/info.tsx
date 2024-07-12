import * as React from 'react';
import { NextSeo } from 'next-seo';
import { Center, Box, Heading, Text, Link, Button, VStack, Image, SimpleGrid } from '@chakra-ui/react';
import type { NextPage } from 'next';

const ContentPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Info" titleTemplate="%s" />
      <Center minH="100vh" flexDirection="column" p={8}>
        <Box textAlign="center" p={4} mb={8}>
          <Heading as="h1" size="xl" mb={4}>
            What's Adi's Studio
          </Heading>
          <Text fontSize="lg" mb={6}>
            Adi's studio is an upcoming studio! We are currently developing a bot and this site.
          </Text>
        </Box>

        <VStack spacing={8} maxW="container.md" align="center">
          <Box textAlign="left" width="100%">
            <Heading as="h2" size="lg" mb={4}>About Us</Heading>
            <Text fontSize="md">
              Adi's Studio is dedicated to creating innovative solutions. Our mission is to provide top-notch services and products that exceed expectations.
            </Text>
          </Box>

          <Box textAlign="center" width="100%">
            <Heading as="h2" size="lg" mb={4}>Meet the Team</Heading>
            <SimpleGrid columns={1} spacing={8}>
              <Box textAlign="center">
                <Image 
                  borderRadius="full" 
                  boxSize="150px" 
                  src="/Owner.png" 
                  alt="Aditya" 
                  mb={4} 
                  mx="auto" // Centers the image horizontally
                />
                <Text fontSize="md">Aditya</Text>
                <Text fontSize="sm" color="gray.500">Owner</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>

        <Box textAlign="center" mt={8}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button backgroundColor="#FF4545" color="white">
              Go Back
            </Button>
          </Link>
        </Box>
      </Center>
    </>
  );
};

export default ContentPage

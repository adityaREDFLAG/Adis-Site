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
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button backgroundColor="#FF4545" color="white" mb={6}>
              Go Back
            </Button>
          </Link>
        </Box>

        <VStack spacing={8} maxW="container.md">
          <Box textAlign="left">
            <Heading as="h2" size="lg" mb={4}>About Us</Heading>
            <Text fontSize="md">
              Adi's Studio is dedicated to creating innovative solutions. Our mission is to provide top-notch services and products that exceed expectations.
            </Text>
          </Box>

          <Box textAlign="left">
            <Heading as="h2" size="lg" mb={4}>Meet the Team</Heading>
            <SimpleGrid columns={1} spacing={8}>
              <Box textAlign="center">
                <Image borderRadius="full" boxSize="150px" src="/favicon.png" alt="Aditya" mb={4} />
                <Text fontSize="md">Aditya</Text>
                <Text fontSize="sm" color="gray.500">Owner</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Center>
    </>
  );
};

export default ContentPage

import * as React from 'react';
import { NextSeo } from 'next-seo';
import { Center, Box, Heading, Text, Link, Button } from '@chakra-ui/react';
import type { NextPage } from 'next';

const ContentPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Info" titleTemplate="%s" />
      <Center minH="100vh">
        <Box textAlign="center" p={4}>
          <Heading as="h1" size="xl" mb={4}>
            What's Adi's Studio
          </Heading>
          <Text fontSize="lg" mb={6}>
            Adi's studio is an upcoming studio! We are currently developing a bot and this site.
          </Text>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button colorScheme="#FF4545">Go Back</Button>
          </Link>
        </Box>
      </Center>
    </>
  );
};

export default ContentPage

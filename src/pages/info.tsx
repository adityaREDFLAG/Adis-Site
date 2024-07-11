import * as React from 'react';
import { NextSeo } from 'next-seo';
import { Center, Box, Heading, Text, Button } from '@chakra-ui/react';

import type { NextPage } from 'next';

const ContentPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Info" titleTemplate="%s"/>
      <Center minH="100vh" position="relative">
        <Box textAlign="center" p={4}>
          <Heading as="h1" size="xl" mb={4}>
            What's Adi's Studio
          </Heading>
          <Text fontSize="lg">
            Adi's studio is an upcoming studio! We are currently developing a bot and this site.
          </Text>
        </Box>
        <Box position="absolute" bottom={4} left={4}>
          <Button
            as="a"
            bg="transparent"
            border="1px solid"
            borderColor={siteConfig.themeColor}
            href="/"
          >
            Go Back
          </Button>
        </Box>
      </Center>
    </>
  );
}

export default ContentPage

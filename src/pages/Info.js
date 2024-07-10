import React from 'react';
import { NextSeo } from 'next-seo';
import { Box, Heading, Text } from '@chakra-ui/react';

const InfoPage: React.FC = () => {
  return (
    <> {/* Opening JSX tag */}
      <NextSeo title="Info Page" />
      <Box p={4} maxW="container.lg">
        <Heading as="h2" size="lg">
          Welcome to the Information Page
        </Heading>
        <Text mt={4}>
          This is a basic information page created using Next.js and Chakra UI.
          You can replace this content with any information you want to display
          on your website.
        </Text>
      </Box>
    </> {/* Closing JSX tag - Make sure it's after the last element */}
  );
};

export default InfoPage;

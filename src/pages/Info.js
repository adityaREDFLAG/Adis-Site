import React from 'react';
import { NextSeo } from 'next-seo';
import { Box, Heading, Text } from '@chakra-ui/react';

const InfoPage: React.FC = () => {
  return (
    <>
      <NextSeo title="Info Page" />
      <Box p={4} maxW="container.lg">
        <Heading as="h2" size="lg">
          Welcome to the Information Page
        </Heading>
        <Text mt={4}>
         Upcoming studio
        </Text>
      </Box>
    </>
  );
};

export default InfoPage;

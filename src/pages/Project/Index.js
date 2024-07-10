import { useState } from 'react';
import {
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import Cards from '../../components/Card';
import Container from '../../components/Container';
import Head from 'next/head';

export default function Projects({ projects }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Assuming projects is an array of project objects
  const filteredProjects = projects.filter((project) => {
    // Customize filtering logic based on your project data structure
    // Example: filter by project title (case-insensitive)
    return project.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <Container>
        <Head>
          <title>Adis Studio</title>
          <meta content="upcoming studio" name="title" />
          <meta content="..." name="description" />
        </Head>
        <Stack spacing={4}>
          <Heading>Projects</Heading>
          <InputGroup>
            <Input
              placeholder="Search projects..."
              value={query}
              onChange={handleChange}
            />
            <InputRightElement children={<FaSearch />} />
          </InputGroup>
          <Divider />
          {filteredProjects.length > 0 ? (
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {filteredProjects.map((project) => (
                <Cards key={project.id} project={project} /> // Assuming Cards handles project data
              ))}
            </SimpleGrid>
          ) : (
            <Text>No projects found matching your search.</Text>
          )}
        </Stack>
      </Container>
    </>
  );
}

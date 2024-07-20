import * as React from 'react';
import { HStack, Link, useColorMode, VStack, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useSocials } from '@/hooks/app';
import siteConfig from '~/site-config';

export const Navbar: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const socials = useSocials();

  return (
    <HStack as="nav" fontSize="md" p={4} spacing={0}>
      <Link fontWeight="bold" href="/" p={4} variant="link">
        {siteConfig.title}
      </Link>

      <HStack flexGrow={1} justify="flex-end" p={4} spacing={{ base: 0, sm: 2 }}>
        <Menu>
          <MenuButton as={Button} variant="link">
            Projects
          </MenuButton>
          <MenuList>
            <NextLink href="/to-do" passHref>
              <MenuItem as={Link}>To-Do↗</MenuItem>
            </NextLink>
          </MenuList>
        </Menu>

        <Link href="https://status.uptime-monitor.io/669b90860cf6e5ca54b87cac?_gl=1*vyk1f*_gcl_au*MjE0NzczNTY0LjE3MjE0NzA4NzU.*_ga*MTg3MTAyMjQwMS4xNzIxNDcwODc1*_ga_Z8TT3FLVJQ*MTcyMTQ3MDg3NC4xLjEuMTcyMTQ3MTA5MS41OC4wLjA." isExternal>
          Uptime↗
        </Link>
        
        <IconButton
          aria-label="toggle dark mode"
          color="currentColor"
          icon={<Icon as={FaMoon} boxSize={5} />}
          onClick={toggleColorMode}
          variant="link"
          />
      </HStack>
    </HStack>
  );
};

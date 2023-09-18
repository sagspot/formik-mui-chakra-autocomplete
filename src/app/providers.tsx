'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import {
  ChakraProvider,
  defineStyleConfig,
  extendTheme,
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const Button = defineStyleConfig({
  defaultProps: { colorScheme: 'messenger' },
});

const Link = { baseStyle: { _hover: { textDecoration: 'none' } } };

const theme = extendTheme({ components: { Link, Button } });

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}

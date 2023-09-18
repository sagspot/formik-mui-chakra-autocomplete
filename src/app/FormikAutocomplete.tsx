import { addQueryParamsToPath } from '@/lib/addQueryParamsToPath';
import { fetcher } from '@/lib/fetcher';
import {
  Box,
  BoxProps,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  ListItem,
  ListProps,
  Spinner,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { useDebouncedValue } from '@mantine/hooks';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { useQuery } from '@tanstack/react-query';
import { FieldAttributes, useField } from 'formik';
import { FC, useState } from 'react';
import { BrowserType } from './api/browsers/route';

type FormikAutocompleteProps = Record<
  string,
  number | string | Record<string, string> | any
> &
  FieldAttributes<BrowserType | {}> & { path: string };

type AutocompleteProps = Record<
  string,
  number | string | Record<string, string> | any
> &
  FieldAttributes<BrowserType> & { path: string };

const optionListProps = {
  pos: 'absolute',
  left: 0,
  right: 0,
  p: 2,
  my: 3,
  maxWidth: '320px',
  rounded: 'lg',
  bg: 'gray.100',
  boxShadow: 'md',
  zIndex: 1,
} satisfies BoxProps | ListProps;

const FormikAutocomplete: FC<FormikAutocompleteProps> = (props) => {
  const [field, meta, helpers] = useField(props as AutocompleteProps);
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue] = useDebouncedValue(inputValue, 500);

  const { data, isFetching, error, isError } = useQuery<BrowserType[]>({
    queryKey: [props.path, debouncedValue],
    queryFn: () =>
      fetcher(addQueryParamsToPath(props.path, { s: debouncedValue })),
    enabled: debouncedValue.length >= 1,
  });

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: field.name,
    isOptionEqualToValue: (option, value) => option.id === value.id,
    options: data || [],
    value: meta.value,
    onChange: (event, newValue) => helpers.setValue(newValue!),
    inputValue,
    onInputChange: (event, newInputValue) => {
      helpers.setTouched(true);
      setInputValue(newInputValue);
    },
  });

  return (
    <Stack>
      <Stack spacing={4}>
        <Box as="pre" color="red.600">
          meta.value:{' '}
          <Box as="code" rounded="lg" py="2" px="4" color="green.400">
            {meta.value ? JSON.stringify(meta.value, null, 2) : ' '}
          </Box>
        </Box>
        <Box as="pre" color="red.600">
          inputValue:{' '}
          <Box as="code" rounded="lg" py="2" px="4" color="green.400">
            {inputValue ?? ' '}
          </Box>
        </Box>
      </Stack>

      <FormControl
        pos="relative"
        id={field.name}
        isDisabled={!!props.isDisabled}
        isRequired={!!props.isRequired}
        isInvalid={!!meta.error && meta.touched}
      >
        {props.label && <FormLabel>{props.label}</FormLabel>}
        <Flex
          {...getRootProps()}
          fontWeight={400}
          rounded="lg"
          border="1px solid"
          boxShadow={focused ? 'sm' : 'md'}
          borderColor={focused ? 'blue.400' : 'inherit'}
          gap="5px"
          overflow="hidden"
          w="320px"
          _hover={{ borderColor: 'blue.400' }}
          _focusVisible={{ outline: 0 }}
        >
          <Input
            {...getInputProps()}
            fontSize="0.875rem"
            fontWeight={400}
            lineHeight={1.5}
            py={4}
            px={6}
            outline={0}
            flex={'1 0 auto'}
            size="md"
          />
        </Flex>

        {isFetching ? (
          <HStack {...optionListProps} justify="center" spacing={4}>
            <Spinner />
            <Text>Loading...</Text>
          </HStack>
        ) : isError && !!error ? (
          <HStack {...optionListProps} justify="center" spacing={4}>
            <Text textAlign="center" color={'red'} fontSize={'sm'}>
              {(error as any).message || 'Something went wrong'}
            </Text>
          </HStack>
        ) : null}

        {groupedOptions.length > 0 ? (
          <UnorderedList
            {...getListboxProps()}
            {...optionListProps}
            boxSizing={'border-box'}
            overflow="auto"
            maxHeight="300px"
          >
            {(groupedOptions as BrowserType[]).map((option, index) => (
              <ListItem
                {...getOptionProps({ option, index })}
                key={index}
                listStyleType="none"
                p="8px"
                rounded="md"
                cursor="default"
                _last={{ borderBottom: 'none' }}
                _hover={{ cursor: 'pointer', bg: 'gray.300' }}
                _focus={{ bg: 'blue.100', color: 'blue.900' }}
                _focusVisible={{
                  bg: 'blue.100',
                  color: 'blue.900',
                  boxShadow: 'md',
                }}
              >
                {option.label}
              </ListItem>
            ))}
          </UnorderedList>
        ) : null}

        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
};

export default FormikAutocomplete;

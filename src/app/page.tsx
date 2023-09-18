'use client';

import { Box, Button, Container, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import FormikAutocomplete from './FormikAutocomplete';
import { BrowserType } from './api/browsers/route';

type InitialValues = { browser: BrowserType | null };

const initialValues: InitialValues = {
  browser: null,
};

const validationSchema = yup.object().shape({
  browser: yup.object().shape({
    id: yup.string().required('Required field'),
    label: yup.string().required('Required field'),
  }),
});

export default function Home() {
  const submitHandler = (values: InitialValues) => {
    console.log('🚀 ~ file: page.tsx:24 ~ submitHandler ~ values:', values);
  };

  return (
    <Container maxW="6xl" py={12}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <Stack spacing={4}>
              <FormikAutocomplete
                path="/api/browsers"
                name="browser"
                label="Browser"
                placeholder="Browser"
                isRequired
              />
              <Box>
                <Button type="submit">Submit</Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
}


'use client'
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
  Box,
  Image,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { TwitterButton } from './TwitterButton';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import React from 'react';
import classes from './login.module.css';


const AuthenticationForm = (props) => {

  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 5 ? 'Password should include at least 6 characters' : null),
    }
  });

  const handleLoginSubmit = (values) => {
    console.log(values);
    fetch('http://localhost:5500/user/authenticate', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Login Successfull');

          response.json()
            .then((data) => {
              sessionStorage.setItem('user', JSON.stringify(data));
              router.push('/user/profile');
            })

        } else {
          toast.error('Invalid Credentials');
        }
      }).catch((err) => {
        console.log(err);
        toast.error('Something went wrong');
      });
  }

  return (
    <Box my={200} >
      <Container>
        <Group size='md' display='flex' justify='center'>
          <Paper radius="md" p="xl" withBorder {...props} style={{ width: 500 }}>
            <Text size="lg" fw={500}>
              Welcome to Site-Map, Login with
            </Text>

            <Group grow mb="md" mt="md">
              <GoogleButton radius="xl">Google</GoogleButton>
              <TwitterButton radius="xl">Twitter</TwitterButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <form onSubmit={form.onSubmit(handleLoginSubmit)}>
              <Stack>


                <TextInput
                  required
                  // type='email'
                  label="Email"
                  placeholder="hello@mantine.dev"
                  value={form.values.email}
                  onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                  error={form.errors.email && 'Invalid email'}
                  radius="md"
                />
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                  error={form.errors.password && 'Password should include at least 6 characters'}
                  radius="md"
                />

              </Stack>

              <Group justify="space-between" mt="xl">
                <Anchor component={Link} type="button" c="dimmed" href={'/signup'} size="xs">
                  Don't have an account? Register
                </Anchor>
                <Button type="submit" color='indigo' radius="xl">
                  Login
                </Button>
              </Group>
            </form>
          </Paper>
          <Paper radius="md" p="xl" style={{ width: 410 }}>
            <Image src='/login.svg' className={classes.image} />
          </Paper>
        </Group>
      </Container>
    </Box>
  );
}

export default AuthenticationForm;
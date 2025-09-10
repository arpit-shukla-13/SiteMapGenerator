'use client'
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Image,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import Link from 'next/link';
import * as Yup from "yup";
import { useFormik } from 'formik';
import toast from 'react-hot-toast';


const SignupSchema = Yup.object().shape({
    name: Yup.string().min(6, 'too Short!').required("Required"),
    contact: Yup.string().min(10, 'too Short!').required("Required").max(10, 'phone no. invalid!'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Password is required').min(6, "Too short")
});

export function AuthenticationTitle() {

    const signupForm = useFormik({
        initialValues: {
            name: '',
            contact: '',
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            console.log(values);
            // send values to backend

            fetch('http://localhost:5500/user/add',
                {
                    method: 'POST', body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 200) {
                        toast.success('User Registered Successfully');
                    }
                    else {
                        toast.error('User Registration Failed');
                    }
                }).catch((err) => {
                    console.log(err);
                    toast.error('Server Error')
                });
        },
        validationSchema: SignupSchema
    })

    return (
        <Container mt={100} mb={200}>
            <Title ta="center" className={classes.title}>
                Welcome
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Anchor size="sm" component={Link} href={'/login'}>
                    Login
                </Anchor>
            </Text>
            <Group size='md' display='flex' justify='center' my={20} gap={15}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ width: 500 }}>
                    <form onSubmit={signupForm.handleSubmit}>
                        <TextInput error={signupForm.touched.name && signupForm.errors.name} label="Name" placeholder="Your Name" type='text' id='name' onChange={signupForm.handleChange} value={signupForm.values.name} />
                        <TextInput error={signupForm.touched.contact && signupForm.errors.contact} label="Contact No." placeholder="Your contact no." type='number' id='contact' onChange={signupForm.handleChange} value={signupForm.values.contact} />
                        <TextInput error={signupForm.touched.email && signupForm.errors.email} label="Email" placeholder="you@mantine.dev" type='email' id='email' onChange={signupForm.handleChange} value={signupForm.values.email} />
                        <PasswordInput error={signupForm.touched.password && signupForm.errors.password} label="Password" placeholder="Your password" mt="md" type='password' id='password' onChange={signupForm.handleChange} value={signupForm.values.password} />
                        <Button fullWidth mt="xl" type='submit'>Sign Up</Button>
                    </form>
                </Paper>
                <Paper radius="md" p="xl" style={{ width: 410 }}>
                    <Image src='/signup.svg' className={classes.image} />
                </Paper>
            </Group>
        </Container>
    );
}
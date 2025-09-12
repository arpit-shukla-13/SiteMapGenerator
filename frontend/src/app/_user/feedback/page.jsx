'use client'
import React, { useState, useEffect } from 'react'
import classes from './feedback.module.css';
import { Container, Group, Rating, Textarea, Text, Button, Loader } from '@mantine/core'
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

const Feedback = () => {

    const [rating, setRating] = useState(4);
    // 1. Initialize currentUser as null
    const [currentUser, setCurrentUser] = useState(null);

    // 2. Safely get user data from sessionStorage on the client-side
    useEffect(() => {
        const userJson = sessionStorage.getItem('user');
        if (userJson) {
            setCurrentUser(JSON.parse(userJson));
        }
    }, []);

    const feedbackForm = useFormik({
        initialValues: {
            user: '', // Initialize with an empty string
            rating: '',
            feedback: ''
        },
        onSubmit: (values) => {
            // 3. Add the user ID and rating just before submitting
            values.rating = rating;
            values.user = currentUser._id;
            
            console.log(values);

            // 4. Use the environment variable for the API URL
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback/add`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 200) {
                        toast.success('Feedback Submitted');
                        // No need to process the response further unless you need the data
                    } else {
                        toast.error('Submission Failed');
                    }
                }).catch((err) => {
                    console.log(err);
                    toast.error('An error occurred.');
                })

        }
    })

    // 5. Show a loading state until the user data is available
    if (!currentUser) {
        return (
            <Container size='xs' mt={100} style={{ textAlign: 'center' }}>
                <Loader />
                <Text>Loading form...</Text>
            </Container>
        );
    }

    return (
        <div>
            <Container size='xs' mt={100}>
                <Group justify='center'>
                    <Text fw={990} size='37px' pb='lg' className={classes.highlight}>Give us your feedback</Text>
                </Group>
                <form onSubmit={feedbackForm.handleSubmit}>
                    <Group justify='center' mt={50}>
                        <Textarea autosize minRows={4} maxRows={8} w={'70%'} id="feedback" onChange={feedbackForm.handleChange} value={feedbackForm.values.feedback}></Textarea>
                    </Group>
                    <Group justify='center' mt={20}>
                        <Rating size='xl' onChange={setRating}></Rating>
                    </Group>
                    <Group justify='center' mt={20}><Button type='submit'>Submit</Button></Group>
                </form>
            </Container>
        </div>
    )
}

export default Feedback;
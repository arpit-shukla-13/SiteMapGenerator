'use client'
import React, { useState } from 'react'
import classes from './feedback.module.css';
import { Container, Flex, Group, Rating, Textarea, Text, Button } from '@mantine/core'
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

const Feedback = () => {

    const [rating, setRating] = useState(4);
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const feedbackForm = useFormik({
        initialValues: {
            user: currentUser._id,
            rating: '',
            feedback: ''
        },
        onSubmit: (values) => {
            values.rating = rating;
            console.log(values);
            fetch('http://localhost:5500/feedback/add', {
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
                        response.json()
                            .then((data) => {
                                console.log(data);

                            })
                    } else {
                        console.log('Failed');
                    }
                }).catch((err) => {
                    console.log(err);
                })

        }
    })

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

export default Feedback
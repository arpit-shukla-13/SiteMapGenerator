
'use client'
import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  Container,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import { ContactIconsList } from './ContactIcons';
import classes from './ContactUs.module.css';
import * as Yup from "yup";
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

const ContactSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().min(6, 'too Short!').required("Required"),
  message: Yup.string().required('message is required').min(6, "Too short")
});

export function ContactUs() {
  const icons = social.map((Icon, index) => (
    <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
      <Icon size="1.4rem" stroke={1.5} />
    </ActionIcon>
  ));


  const ContactForm = useFormik({
    initialValues: {
      email: '',
      name: '',
      message: '',
    },
    onSubmit: (values) => {
      console.log(values);
      // send values to backend

      fetch('http://localhost:5500/contact/add',
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
    validationSchema: ContactSchema
  })

  return (
    <Container my={120}>
      <div className={classes.wrapper}>
        <Container size='md'>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
            <div>
              <Title className={classes.title}>Contact us</Title>
              <Text className={classes.description} mt="sm" mb={30}>
                Leave your email and we will get back to you within 24 hours
              </Text>

              <ContactIconsList />

              <Group mt="xl">{icons}</Group>
            </div>
            <div className={classes.form}>
              <form onSubmit={ContactForm.handleSubmit}>
                <TextInput
                  onChange={ContactForm.handleChange} value={ContactForm.values.email}
                  label="Email"
                  placeholder="your@email.com"
                  required
                  classNames={{ input: classes.input, label: classes.inputLabel }}
                />
                <TextInput
                  onChange={ContactForm.handleChange} value={ContactForm.values.name}
                  label="Name"
                  placeholder="John Doe"
                  mt="md"
                  classNames={{ input: classes.input, label: classes.inputLabel }}
                />
                <Textarea
                  onChange={ContactForm.handleChange} value={ContactForm.values.message}
                  label="Your message"
                  placeholder="I want to order your goods"
                  minRows={4}
                  mt="md"
                  classNames={{ input: classes.input, label: classes.inputLabel }}
                />

                <Group justify="flex-end" mt="md">
                  <Button className={classes.control} type='submit'>Send message</Button>
                </Group>
              </form>
            </div>
          </SimpleGrid>
        </Container>
      </div>
    </Container>
  );
}
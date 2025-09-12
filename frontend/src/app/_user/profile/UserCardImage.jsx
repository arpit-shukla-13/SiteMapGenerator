'use client'
import { Card, Avatar, Text, Group, Button, Loader } from '@mantine/core';
import classes from './UserCardImage.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // 1. Import useEffect

const stats = [
    { value: '34K', label: 'Followers' },
    { value: '187', label: 'Follows' },
    { value: '1.6K', label: 'Posts' },
];

export function UserCardImage() {
    // 2. Initialize state as null
    const [currentUser, setCurrentUser] = useState(null);

    // 3. Use useEffect to safely access sessionStorage on the client-side
    useEffect(() => {
        const userJson = sessionStorage.getItem('user');
        if (userJson) {
            setCurrentUser(JSON.parse(userJson));
        }
    }, []); // Empty array means this runs only once

    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text ta="center" fz="lg" fw={500}>
                {stat.value}
            </Text>
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
                {stat.label}
            </Text>
        </div>
    ));

    // 4. Add a loading state to prevent errors while data is being fetched
    if (!currentUser) {
        return (
            <Card withBorder padding="xl" radius="md" className={classes.card} h={400}>
                <Group justify="center" mt="lg">
                    <Loader color="blue" />
                    <Text>Loading Profile...</Text>
                </Group>
            </Card>
        );
    }

    return (
        <Card withBorder padding="xl" radius="md" className={classes.card}>
            <Card.Section
                h={350}
                style={{
                    backgroundSize: 'cover',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
                }}
            />
            <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                size={200}
                radius={100}
                mx="auto"
                mt={-90}
                className={classes.avatar}
            />
            <Text ta="center" fz="xl" fw={600} mt="md">
                {currentUser.name}
            </Text>
            <Text ta="center" fz="lg" c="dimmed">
                {currentUser.email}
            </Text>
            <Group mt="xl" justify="center" gap={40}>
                {items}
            </Group>
            <Link href='./editprofile' style={{ textDecoration: 'none' }}>
                <Button fullWidth radius="md" mt="xl" size="md" variant="default" bg='blue'>
                    Edit Profile
                </Button>
            </Link>
        </Card>
    );
}
'use client'
import { Card, Avatar, Text, Group, Button } from '@mantine/core';
import classes from './UserCardImage.module.css';
import Link from 'next/link';
import { useState } from 'react';

const stats = [
    { value: '34K', label: 'Followers' },
    { value: '187', label: 'Follows' },
    { value: '1.6K', label: 'Posts' },
];

export function UserCardImage() {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

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

    return (
        <Card withBorder padding="xl" radius="md" className={classes.card}>
            <Card.Section
                h={350}
                style={{
                    backgroundSize: 'cover',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
                    // backgroundColor: 'cyan'
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
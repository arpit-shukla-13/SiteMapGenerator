'use client'
import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { useState, useEffect } from 'react';

export function UserButton() {

    // 1. Initialize currentUser as null
    const [currentUser, setCurrentUser] = useState(null);

    // 2. Safely load user data from sessionStorage on the client-side
    useEffect(() => {
        const userJson = sessionStorage.getItem('user');
        if (userJson) {
            setCurrentUser(JSON.parse(userJson));
        }
    }, []);

    // 3. Show a placeholder or nothing while loading
    if (!currentUser) {
        return null; // Or return a loading skeleton
    }

    return (
        <UnstyledButton className={classes.user}>
            <Group>
                <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                    radius="xl"
                />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {currentUser.name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {currentUser.email}
                    </Text>
                </div>

                {/* <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} /> */}
            </Group>
        </UnstyledButton>
    );
}
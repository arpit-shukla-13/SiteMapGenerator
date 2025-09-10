'use client'
import cx from 'clsx';
import { useState, useEffect } from 'react';
import { Table, Checkbox, ScrollArea, Group, Avatar, Text, rem, Loader, Center } from '@mantine/core';
import classes from './TableSelection.module.css';

export function TableSelection() {
    const [selection, setSelection] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch the list of users from your backend when the component loads
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch users:", err);
                setLoading(false);
            });
    }, []); // Empty array ensures this runs only once

    // Bug Fix: Added the 'id' parameter
    const toggleRow = (id) =>
        setSelection((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );

    const toggleAll = () =>
        setSelection((current) => (current.length === users.length ? [] : users.map((item) => item._id)));

    const rows = users.map((item) => {
        const selected = selection.includes(item._id);
        return (
            <Table.Tr key={item._id} className={cx({ [classes.rowSelected]: selected })}>
                <Table.Td>
                    <Checkbox checked={selection.includes(item._id)} onChange={() => toggleRow(item._id)} />
                </Table.Td>
                <Table.Td>
                    <Group gap="sm">
                        <Avatar size={26} radius={26} />
                        <Text size="sm" fw={500}>
                            {item.name}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>{item.email}</Table.Td>
                <Table.Td>{item.contact}</Table.Td>
            </Table.Tr>
        );
    });

    // Show a loading spinner while fetching data
    if (loading) {
        return (
            <Center h={400}>
                <Loader />
            </Center>
        );
    }

    return (
        <ScrollArea>
            <Table miw={800} verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ width: rem(40) }}>
                            <Checkbox
                                onChange={toggleAll}
                                checked={users.length > 0 && selection.length === users.length}
                                indeterminate={selection.length > 0 && selection.length !== users.length}
                            />
                        </Table.Th>
                        <Table.Th>User</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Contact</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
}
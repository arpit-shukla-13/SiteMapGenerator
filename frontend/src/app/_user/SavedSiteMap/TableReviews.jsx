'use client'
import { Table, Progress, Anchor, Text, Group, Button, Center, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { json2xml } from 'xml-js';

export function TableReviews() {

    const [data, setData] = useState([]);
    // 1. Initialize currentUser as null
    const [currentUser, setCurrentUser] = useState(null);

    // 2. Safely load user data from sessionStorage on the client-side
    useEffect(() => {
        const userJson = sessionStorage.getItem('user');
        if (userJson) {
            setCurrentUser(JSON.parse(userJson));
        }
    }, []);

    // 3. Fetch sitemap data only AFTER currentUser has been loaded
    useEffect(() => {
        const fetchSitemapData = () => {
            // 4. Use the environment variable for the API URL
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/sitemap/getbyuser/${currentUser._id}`)
                .then((response) => response.json())
                .then(data => {
                    console.log(data);
                    setData(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        // Only run the fetch if currentUser is not null
        if (currentUser) {
            fetchSitemapData();
        }
    }, [currentUser]); // This useEffect hook runs whenever currentUser changes

    const loadSitemap = async (directory) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${directory}`);
        const data = await res.json();
        return JSON.stringify(data);
    };

    const convertToXml = async (directory) => {
        const sitemapJSON = await loadSitemap(directory);
        if (!sitemapJSON) return '';
        return json2xml(sitemapJSON, { compact: true, spaces: 4 });
    };

    const downloadXML = async (sitemap) => {
        const blob = new Blob([await convertToXml(sitemap.file)], { type: 'text/xml;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xml');
        link.click();
    };

    const deleteSitemap = (id) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/sitemap/delete/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if(response.status === 200){
                    // Refetch data by filtering it from the current state
                    setData(currentData => currentData.filter(item => item._id !== id));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // 5. Add a loading state for when user is not yet loaded
    if (!currentUser) {
        return (
            <Center h={400}>
                <Loader />
            </Center>
        );
    }

    const displayData = data.map((row) => {
        return (
            <Table.Tr key={row._id}>
                <Table.Td>
                    {row.url}
                </Table.Td>
                <Table.Td>
                    {new Date(row.createdAt).toDateString()}
                </Table.Td>
                <Table.Td>
                    {row.file}
                </Table.Td>
                <Table.Td>
                    <Group gap={15}>
                        <Button size='xs' color='red' onClick={() => { deleteSitemap(row._id) }}>Delete</Button>
                        <Button size='xs' px={5} onClick={() => { downloadXML(row) }}>Download</Button>
                    </Group>
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing='xl'>
                <Table.Thead>
                    <Table.Tr fz={25} px='xl'>
                        <Table.Th>SiteMap URL</Table.Th>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>File Name </Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{displayData}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
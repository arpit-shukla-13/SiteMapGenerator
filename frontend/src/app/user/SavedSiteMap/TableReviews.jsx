'use client'
import { Table, Progress, Anchor, Text, Group, Button, Center } from '@mantine/core';
import classes from './TableReviews.module.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { json2xml } from 'xml-js';

export function TableReviews() {

    const [Data, setData] = useState([])

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const fetchSitemapData = () => {
        fetch('http://localhost:5500/sitemap/getbyuser/' + currentUser._id)
            .then((response) => {
                console.log(response);
                response.json()
                    .then(data => {
                        console.log(data);
                        setData(data)
                    })
            }).catch((err) => {
                console.log(err);
            });
    }

    const loadSitemap = async (directory) => {
        const res = await fetch(`http://localhost:5500/${directory}`);
        const data = await res.json();
        console.log(data);
        return JSON.stringify(data);
    }

    const convertToXml = async (directory) => {
        const sitemapJSON = await loadSitemap(directory);
        if (!sitemapJSON) return '';
        return json2xml(sitemapJSON, { compact: true, spaces: 4 })
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
        fetch('http://localhost:5500/sitemap/delete/' + id, {
            method: 'DELETE',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                fetchSitemapData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchSitemapData()
    }, [])

    const displayDAta = Data.map((row) => {
        return (
            <Table.Tr key={row.title}>
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
                        <Button size='xs' px={5} onClick={async () => { await downloadXML(row) }}>Download</Button>
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
                        <Table.Th>SiteMap Title</Table.Th>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>File Name </Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{displayDAta}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
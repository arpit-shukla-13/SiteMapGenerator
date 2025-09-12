'use client';
import React, { useRef, useState, useEffect } from 'react';
import { TextInput, ActionIcon, useMantineTheme, rem, Container, Text, Box, Textarea, SimpleGrid, Group, Button, Loader, Center } from '@mantine/core';
import { IconSearch, IconArrowRight, IconDownload } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { ButtonCopy } from './ButtonCopy';
import { json2xml } from 'xml-js';

const SitemapGenerator = () => {
    const theme = useMantineTheme();
    const inputRef = useRef();

    // 1. Initialize currentUser as null
    const [currentUser, setCurrentUser] = useState(null);
    const [sitemapJSON, setSitemapJSON] = useState('');

    // 2. Safely get user data from sessionStorage
    useEffect(() => {
        const userJson = sessionStorage.getItem('user');
        if (userJson) {
            setCurrentUser(JSON.parse(userJson));
        }
    }, []);

    const saveSitemap = (filename) => {
        // 3. Use environment variable for API URL
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/sitemap/add`, {
            method: 'POST',
            body: JSON.stringify({
                user: currentUser._id,
                title: inputRef.current.value,
                url: inputRef.current.value,
                file: filename
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.status === 200) {
                    toast.success('Sitemap saved successfully!');
                } else {
                    toast.error('Failed to save sitemap.');
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Server Error');
            });
    }

    const loadSitemap = (directory) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/${directory}/crawl.json`)
            .then(res => res.json())
            .then(data => {
                setSitemapJSON(JSON.stringify(data, null, 2)); // formatted JSON
            })
    }

    const convertToXml = () => {
        if (!sitemapJSON) return '';
        return json2xml(sitemapJSON, { compact: true, spaces: 4 });
    };

    const downloadFile = (content, fileName, contentType) => {
        const blob = new Blob([content], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        link.click();
        window.URL.revokeObjectURL(url); // Clean up
    };

    const generateSitemap = () => {
        toast.loading('Generating sitemap...');
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/sitemap/generate`, {
            method: 'POST',
            body: JSON.stringify({ url: inputRef.current.value }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((data) => {
                toast.dismiss();
                if (data.outputDir) {
                    toast.success('Generation complete!');
                    loadSitemap(data.outputDir);
                    saveSitemap(data.outputDir + '/crawl.json');
                } else {
                    toast.error('Generation failed.');
                }
            })
            .catch((err) => {
                toast.dismiss();
                toast.error('An error occurred.');
                console.log(err);
            });
    }

    // 4. Add a loading state
    if (!currentUser) {
        return (
            <Center h={500}>
                <Loader />
            </Center>
        )
    }

    return (
        <Box>
            <Container py='xl'>
                <Text fw={990} size='37px' pb='lg'>Just enter your website URL to create a sitemap</Text>
                <TextInput
                    ref={inputRef}
                    radius="xl"
                    size="md"
                    placeholder="https://example.com"
                    rightSectionWidth={42}
                    leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                    rightSection={
                        <ActionIcon onClick={generateSitemap} size={32} radius="xl" color={theme.primaryColor} variant="filled">
                            <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </ActionIcon>
                    }
                />
            </Container>
            <Container size='xl'>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20} >
                    <Group>
                        <Group justify='flex-end' w={'100%'}>
                            <ButtonCopy text={sitemapJSON}></ButtonCopy>
                            <Button
                                radius="xl" size='sm'
                                styles={{ root: { paddingRight: rem(14), height: rem(40) }, section: { marginLeft: rem(22) } }}
                                onClick={() => downloadFile(sitemapJSON, 'sitemap.json', 'application/json')}
                                rightSection={<IconDownload size={14} />}
                            >
                                Download JSON
                            </Button>
                            <Textarea w={'100%'} rows={28} value={sitemapJSON} readOnly />
                        </Group>
                    </Group>
                    <Group>
                        <Group justify='flex-end' w={'100%'}>
                            <ButtonCopy text={convertToXml()}></ButtonCopy>
                            <Button
                                onClick={() => downloadFile(convertToXml(), 'sitemap.xml', 'text/xml;charset=utf-8')}
                                size='sm' radius='xl' rightSection={<IconDownload size={14} />}
                            >
                                Download XML
                            </Button>
                            <Textarea w={'100%'} rows={28} value={convertToXml()} readOnly />
                        </Group>
                    </Group>
                </SimpleGrid>
            </Container>
        </Box >
    )
}

export default SitemapGenerator;
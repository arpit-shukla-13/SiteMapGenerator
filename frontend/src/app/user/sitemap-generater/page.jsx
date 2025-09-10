
'use client';
import React, { useRef, useState } from 'react';
import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem, Container, Text, Box, Textarea, Grid, SimpleGrid, Group, Button, Flex } from '@mantine/core';
import { IconSearch, IconArrowRight, IconDownload } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { Demo } from './Demo';
import { ButtonCopy } from './ButtonCopy';
import { json2xml } from 'xml-js';

const SitemapGenerator = () => {

    const theme = useMantineTheme();
    const inputRef = useRef();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [sitemapUrl, setSitemapUrl] = useState('');
    const [sitemapJSON, setSitemapJSON] = useState('');
    const [sitemapXML, setSitemapXML] = useState('');

    const saveSitemap = (filename) => {
        fetch('http://localhost:5500/sitemap/add',
            {
                method: 'POST', body: JSON.stringify({
                    user: currentUser._id,
                    title: inputRef.current.value,
                    url: inputRef.current.value,
                    file: filename
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    toast.success('Site-map Generation in Process');
                }
                else {
                    toast.error('Process  Failed! Try Again Later');
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Server Error')
            });
    }

    const loadSitemap = (directory) => {
        fetch(`http://localhost:5500/${directory}/crawl.json`)
            .then(res => res.json())
            .then(data => {
                setSitemapJSON(JSON.stringify(data));
            })
    }

    const convertToXml = () => {
        if (!sitemapJSON) return '';
        return json2xml(sitemapJSON, { compact: true, spaces: 4 })
    };

    const downloadXML = () => {
        const blob = new Blob([convertToXml()], { type: 'text/xml;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xml');
        link.click();
    };

    const downloadJSON = () => {
        const blob = new Blob([sitemapJSON], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.JSON');
        link.click();
    }

    // Example usage:
    // const jsonData = { some: "data", to: "download" };
    // downloadJSON(jsonData, 'mydata.json');


    const generateSitemap = () => {
        fetch('http://localhost:5500/sitemap/generate', {
            method: 'POST',
            body: JSON.stringify({
                url: inputRef.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                // saveSitemap();
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // setSitemapUrl(data);
                loadSitemap(data.outputDir)
                saveSitemap(data.outputDir + '/crawl.json')
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <Box>
            <Container py='xl'>
                <Text fw={990} size='37px' pb='lg'>Just enter your website URL to create a sitemap</Text>
                <TextInput
                    ref={inputRef}
                    radius="xl"
                    size="md"
                    placeholder="Search questions"
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
                            {/* <Demo></Demo> */}
                            <ButtonCopy text={sitemapJSON}></ButtonCopy>
                            <Button
                                radius="xl"
                                size='sm'
                                styles={{
                                    root: { paddingRight: rem(14), height: rem(40) },
                                    section: { marginLeft: rem(22) },
                                }} onClick={downloadJSON} rightSection={<IconDownload size={14} />}>Download</Button>
                            <Textarea w={'100%'} rows={28} value={sitemapJSON}
                                // onChange={(event) => sitemapJSON.useSitemapJSON(event.currentTarget.value)}
                                readOnly
                            />
                        </Group>
                    </Group>
                    <Group>
                        <Group justify='flex-end' w={'100%'}>
                            <ButtonCopy text={convertToXml()}></ButtonCopy>
                            {/* <Demo></Demo> */}
                            <Button onClick={downloadXML} size='sm' radius='xl' rightSection={<IconDownload size={14} />}>Download</Button>
                            <Textarea w={'100%'} rows={28}
                                value={convertToXml()}
                            />
                        </Group>
                    </Group>
                </SimpleGrid>
            </Container>
        </Box >
    )
}

export default SitemapGenerator;
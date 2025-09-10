'use client'
import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
// import image from '/image.svg';
import classes from './HeroBullets.module.css';
import Link from 'next/link';

export function HeroBullets() {
    return (
        <Container size="lg">
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Title className={classes.title}>
                        Generate <span className={classes.highlight}>visual sitemap</span> with meta tags and create sitemap XML for free
                    </Title>
                    <Text c="dimmed" mt="md">
                        We created a fast and very simple visual sitemap generator with meta tags to help you visualize website structure and create sitemap XML. Change and create sitemaps, improve UX Architecture and SEO
                    </Text>

                    <List
                        mt={30}
                        spacing="sm"
                        size="sm"
                        icon={
                            <ThemeIcon size={20} radius="xl">
                                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                            </ThemeIcon>
                        }
                    >
                        <List.Item>
                            <b>TypeScript based</b> – build type safe applications, all components and hooks
                            export types
                        </List.Item>
                        <List.Item>
                            <b>Free and open source</b> – all packages have MIT license, you can use Mantine in
                            any project
                        </List.Item>
                        <List.Item>
                            <b>No annoying focus ring</b> – focus ring will appear only when user navigates with
                            keyboard
                        </List.Item>
                    </List>

                    <Group mt={30}>
                        <Link href='/login'><Button radius="xl" size="md" className={classes.control}>
                            Get started
                        </Button>
                        </Link>
                        {/* <Button variant="default" radius="xl" size="md" className={classes.control}>
                            Source code
                        </Button> */}
                    </Group>
                </div>
                <Image src='/homeimage.svg' className={classes.image} />
            </div>
        </Container>
    );
}
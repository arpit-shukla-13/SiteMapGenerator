
'use client'
import { Image, Card, Text, Group, Button, rem, Container } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconStar } from '@tabler/icons-react';
import classes from './CarouselCard.module.css';

const images = [
    'https://mahihub.com/wp-content/uploads/2024/01/xml-sitemaps-1.webp',
    'https://static.octopus.do/media/08/sitemap-generator.png',
    'https://api.backlinko.com/app/uploads/2024/02/best-sitemap-generator-tools-featured.webp',
    'https://clickseotools.com/wp-content/uploads/2021/09/Build-Submit-a-Sitemap.png',
];

export function CarouselCard() {
    const slides = images.map((image) => (
        <Carousel.Slide key={image}>
            <Image src={image} height={320} />
        </Carousel.Slide>
    ));

    return (
        <Container>

            <Card radius="md" withBorder padding="xl">
                <Card.Section>
                    <Carousel
                        withIndicators
                        loop
                        classNames={{
                            root: classes.carousel,
                            controls: classes.carouselControls,
                            indicator: classes.carouselIndicator,
                        }}
                    >
                        {slides}
                    </Carousel>
                </Card.Section>

                {/* <Group justify="space-between" mt="lg">
                    <Text fw={500} fz="lg">
                        Forde, Norway
                    </Text>

                    <Group gap={5}>
                        <IconStar style={{ width: rem(16), height: rem(16) }} />
                        <Text fz="xs" fw={500}>
                            4.78
                        </Text>
                    </Group>
                </Group> */}

                {/* <Text fz="sm" c="dimmed" mt="sm">
                    Relax, rejuvenate and unplug in this unique contemporary Birdbox. Feel close to nature in
                    ultimate comfort. Enjoy the view of the epic mountain range of Blegja and the Førdefjord.
                </Text> */}

                {/* <Group justify="space-between" mt="md">
                    <div>
                        <Text fz="xl" span fw={500} className={classes.price}>
                            397$
                        </Text>
                        <Text span fz="sm" c="dimmed">
                            {' '}
                            / night
                        </Text>
                    </div>

                    <Button radius="md">Book now</Button>
                </Group> */}
            </Card>
        </Container>
    );
}
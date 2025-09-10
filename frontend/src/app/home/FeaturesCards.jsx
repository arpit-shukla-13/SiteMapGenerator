
'use client'
import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';

const mockdata = [
    {
        title: 'Reliability',
        description:
            'Our service sees your site as it is seen by live visitors and search engine crawlers. Processes websites running on any platform, programming language, or CMS.',
        icon: IconGauge,
    },
    {
        title: 'Efficiency',
        description:
            'The average load that our service creates during the processing of the website is commensurate with the simultaneous work of only three active visitors.',
        icon: IconUser,
    },
    {
        title: 'No third parties',
        description:
            'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
        icon: IconCookie,
    },

];

export function FeaturesCards() {
    const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            <feature.icon
                style={{ width: rem(50), height: rem(50) }}
                stroke={2}
                color={theme.colors.blue[6]}
            />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>

    ));

    return (
        <Container size="lg" py="xl">
            <Group justify="center">
                <Badge variant="filled" size="lg">
                    Best company ever
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
                Integrate effortlessly with any technology stack
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
                hunger drives it to try biting a Steel-type Pokémon.
            </Text>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                {features}
            </SimpleGrid>
        </Container>
    );
}
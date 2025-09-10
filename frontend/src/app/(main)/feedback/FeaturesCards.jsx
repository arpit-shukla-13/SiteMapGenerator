
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
    Rating,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';
import { useEffect, useState } from 'react';

const mockdata = [
    {
        title: 'Extreme performance',
        description:
            'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
        icon: IconGauge,
    },
    {
        title: 'Privacy focused',
        description:
            'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
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

    const [feedbackList, setFeedbackList] = useState([]);

    const fetchFeedback = () => {
        fetch('http://localhost:5500/feedback/getall')
            .then((response) => {
                console.log(response);
                response.json()
                    .then(data => {
                        console.log(data);
                        setFeedbackList(data);
                    })
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchFeedback();
    }, [])

    const theme = useMantineTheme();
    const features = feedbackList.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            <Rating value={feature.rating} />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.user.name}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.feedback}
            </Text>

            <Text fz="sm" c="dimmed" mt="sm">
                {new Date(feature.createdAt).toDateString()}
            </Text>
        </Card>

    ));

    return (
        <Container size="lg" py="xl">
            <Group justify="center">
                <Badge variant="filled" size="xl">
                    Feedback
                </Badge>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
                They love us. You will too.
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                {/* Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
                hunger drives it to try biting a Steel-type Pokémon. */}
            </Text>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                {features}
            </SimpleGrid>
        </Container>
    );
}
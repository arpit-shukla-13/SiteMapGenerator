'use client'
import { Text, Box, Stack, rem } from '@mantine/core';
import { IconSun, IconPhone, IconMapPin, IconAt } from '@tabler/icons-react';
import classes from './ContactIcons.module.css';


// interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
//     icon: typeof IconSun;
//     title: React.ReactNode;
//     description: React.ReactNode;
// }

function ContactIcon({ icon: Icon, title, description, ...others }) {
    return (
        <div className={classes.wrapper} {...others}>
            <Box mr="md">
                <Icon style={{ width: rem(24), height: rem(24) }} />
            </Box>

            <div>
                <Text size="xs" className={classes.title}>
                    {title}
                </Text>
                <Text className={classes.description}>{description}</Text>
            </div>
        </div>
    );
}

const MOCKDATA = [
    { title: 'Email', description: 'avijeet7505@gmail.com', icon: IconAt },
    { title: 'Phone', description: '+917505201075', icon: IconPhone },
    { title: 'Address', description: '844 Vikasnagar Lucknow ', icon: IconMapPin },
    { title: 'Working hours', description: '8 a.m. – 11 p.m.', icon: IconSun },
];

export function ContactIconsList() {
    const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />);
    return <Stack>{items}</Stack>;
}
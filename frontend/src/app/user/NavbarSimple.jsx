'use client'
import { useState } from 'react';
import { Group, Code, } from '@mantine/core';
import {
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconSwitchHorizontal,
    IconLogout,
    IconHome,
    IconClipboard,
    IconMap,
    IconUser,
    IconSquareChevronsDownFilled,
    IconSquareChevronsDown,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavbarSimple.module.css';
import { Text } from '@mantine/core';
import { UserButton } from './UserButton';
import Link from 'next/link';
import { IconUserCircle } from '@tabler/icons-react';

const data = [
    // { link: './home', label: 'Dashboard', icon: IconHome },
    { link: 'profile', label: 'Profile', icon: IconUser },
    { link: 'sitemap-generater', label: 'Site-Map Generator', icon: IconMap },
    { link: 'feedback', label: 'Feedback', icon: IconClipboard },
    { link: 'SavedSiteMap', label: 'Generated Site-map', icon: IconSquareChevronsDown },
];

export function NavbarSimple() {
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                // event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                    {/* <Group h="100%" gap={0} ><img src="/logo.png" style={{ height: 60, width: 60 }} alt="" /><Text fw={800} size='18px' >SiteMap</Text></Group> */}
                    {/* <MantineLogo size={28} /> */}
                    {/* <Code fw={700}>v3.1.2</Code> */}
                    <UserButton></UserButton>
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <Link href="/login" className={classes.link}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </Link>

                <Link href="/" className={classes.link}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </Link>
            </div>
        </nav>
    );
}
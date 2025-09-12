
'use client'
import React from 'react'
import { CollapseDesktop } from './CollapseDesktop'
import { NavbarSimple } from './NavbarSimple'
import { useDisclosure } from '@mantine/hooks'
import { AppShell, Burger, Group, Skeleton, Text } from '@mantine/core'

const UserLayout = ({ children }) => {

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <Group h="100%" px="lg">
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="lg" />
                        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="lg" />
                        <Group h="100%" gap={0} ><img src="/logo.png" style={{ height: 60, width: 60 }} alt="" /><Text fw={800} size='18px' >SiteMap</Text></Group>
                        {/* <ActionToggle ></ActionToggle> */}
                        {/* <MantineLogo size={30} /> */}
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar>
                    <NavbarSimple />
                </AppShell.Navbar>
                <AppShell.Main>
                    {children}
                </AppShell.Main>
            </AppShell>
        </>
    )
}

export default UserLayout;
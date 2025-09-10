'use client'
import { ActionIcon, Button, rem, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import React, { useRef, useState } from 'react';

export function ButtonCopy({ text }) {

    const clipboard = useClipboard();
    return (
        <Tooltip
            label="Code copied!"
            offset={5}
            position="bottom"
            radius="xl"
            transitionProps={{ duration: 100, transition: 'slide-down' }}
            opened={clipboard.copied}
        >
            <Button
                variant="light"
                rightSection={
                    clipboard.copied ? (
                        <IconCheck style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    ) : (
                        <IconCopy style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    )
                }
                radius="xl"
                size='sm'
                styles={{
                    root: { paddingRight: rem(14), height: rem(40) },
                    section: { marginLeft: rem(22) },
                }}
                onClick={() => clipboard.copy(text)}
            >
                Copy Code
            </Button>
        </Tooltip>
    );
}
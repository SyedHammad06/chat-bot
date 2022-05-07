import type { NextPage } from 'next';
import {
  Button,
  Dialog,
  Text,
  TextInput,
  Group,
  Paper,
  AppShell,
  Navbar,
  Header,
  Footer,
  Avatar,
  MantineProvider,
  UnstyledButton,
  CloseButton,
  Tooltip,
  Input,
  ThemeIcon,
} from '@mantine/core';
import { useState } from 'react';

import styles from './Right.module.scss';
import { Menu, Menu2, MessageCircle, Robot, Send, X } from 'tabler-icons-react';

export const Right: NextPage = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Tooltip
        className={styles.Tooltip}
        label='Click to open chat'
        withArrow
        opened={!open}
      >
        <Button
          radius='xl'
          p='xs'
          size='xl'
          variant='white'
          className={styles.Btn}
          onClick={() => setOpen(!open)}
        >
          <Robot size='xl' color='#1d76b0' />
        </Button>
      </Tooltip>

      <Dialog
        opened={open}
        transition='pop-bottom-right'
        onClose={() => setOpen(false)}
        size={700}
        p='0'
        radius='lg'
        position={{ top: 60, right: 100 }}
      >
        <AppShell
          header={
            <Header className={styles.Header} height={75} p='lg'>
              <Text
                size='xl'
                weight={700}
                style={{
                  fontSize: '100',
                  fontFamily: 'Ubuntu, sans-serif',
                  color: '#1d76b0',
                }}
              >
                StarBot
              </Text>
              <UnstyledButton onClick={() => setOpen(!open)}>
                <X size={35} strokeWidth={3} color={'#1d76b0'} />
              </UnstyledButton>
            </Header>
          }
          footer={
            <Footer className={styles.Footer} height={85} p='lg'>
              <form>
                <div>
                  <Input
                    radius='xl'
                    size='md'
                    placeholder='type here...'
                    icon={<MessageCircle />}
                  />
                </div>
                <Button type='submit' size='md' variant='white' radius={50}>
                  <Send />
                </Button>
              </form>
            </Footer>
          }
        >
          <div className={styles.MessageArea}></div>
        </AppShell>
      </Dialog>
    </div>
  );
};

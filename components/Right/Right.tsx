import type { NextPage } from 'next';
import {
  Button,
  Dialog,
  Text,
  AppShell,
  Header,
  Footer,
  UnstyledButton,
  Tooltip,
  Input,
  MediaQuery,
  Loader,
} from '@mantine/core';
import { FormEvent, useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser';

import styles from './Right.module.scss';
import Bot from '../../public/bot.png';
import Image from 'next/image';
import { MessageCircle, Robot, Send, X } from 'tabler-icons-react';
import { Response, ResponseInterface } from '../../utils/Response';

export const Right: NextPage = () => {
  const [open, setOpen] = useState(true);
  const [options, setOptions] = useState<String[]>([]);
  const [currentMessage, setCurrentMessage] = useState<String>('');
  const [userMessageId, setUserMessageId] = useState<number[]>([]);
  const [list, setList] = useState<String[]>([
    'Hey, I am starBot. Before we start can you tell me your name',
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [disableInp, setDisableInp] = useState<boolean>(false);

  const scrollToBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [list]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      inputRef.current &&
      currentMessage === 'Ask a question about any programming language'
    ) {
      setLoading(true);
      try {
        const { message, options }: ResponseInterface = await Response(
          'Ask a question about any programming language',
          inputRef.current.value
        );
        if (message && options) {
          setLoading(false);
          setDisableInp(true);
          setCurrentMessage(inputRef.current.value);
          setOptions(options);
          setList([...list, inputRef.current.value, ...message]);
          inputRef.current.value = '';
          return;
        }
      } catch (err) {
        setLoading(false);
        setDisableInp(true);
        setCurrentMessage(inputRef.current.value);
        setOptions(['Yes', 'No']);
        setList([
          ...list,
          inputRef.current.value,
          "couldn't connect to the services",
        ]);
        inputRef.current.value = '';
        return;
      }
    }
    if (inputRef.current) {
      const { message, options }: ResponseInterface = await Response(
        inputRef.current.value
      );
      setDisableInp(true);
      setCurrentMessage(inputRef.current.value);
      setOptions(options);
      setList([...list, inputRef.current.value, ...message]);
      inputRef.current.value = '';
    }
  };

  const optionClicked = async (response: String) => {
    if (response === 'Ask a question about any programming language') {
      setOptions([]);
      setCurrentMessage(response);
      setList([...list, response, 'Please enter your question']);
      setDisableInp(false);
      return;
    }
    const { message, options }: ResponseInterface = await Response(response);
    setOptions(options);
    setCurrentMessage(response);
    setList([...list, response, ...message]);
  };

  const messageFunc = (el: string, i: number) => {
    if (i === 0) {
      return <p className={styles.Message__text}>{parse(el)}</p>;
    }
    if (el === currentMessage || userMessageId.includes(i)) {
      userMessageId.includes(i)
        ? null
        : setUserMessageId([...userMessageId, i]);
      return <p className={styles.Message__text__user}>{parse(el)}</p>;
    }
    return <p className={styles.Message__text__extend}>{parse(el)}</p>;
  };

  return (
    <div className={styles.Right}>
      <div className={styles.ActionIcons}>
        <Tooltip
          className={styles.Tooltip}
          label='Click to open chat'
          withArrow
          opened={!open}
        >
          <MediaQuery
            query='(max-width: 500px)'
            styles={{ width: 40, height: 40 }}
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
          </MediaQuery>
        </Tooltip>
      </div>

      <Dialog
        opened={open}
        transition='pop-bottom-right'
        onClose={() => setOpen(false)}
        className={styles.Dialog}
        p='0'
        radius='lg'
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
              <form onSubmit={(e) => submitHandler(e)}>
                <div>
                  <Input
                    radius='xl'
                    size='md'
                    disabled={disableInp}
                    autoFocus
                    placeholder='type here...'
                    icon={<MessageCircle />}
                    ref={inputRef}
                  />
                </div>
                <Button type='submit' size='md' variant='white' radius={50}>
                  <Send />
                </Button>
              </form>
            </Footer>
          }
        >
          {!loading ? (
            <div className={styles.MessageArea}>
              {list.map((el, i) => (
                <div className={styles.Message} key={i}>
                  {i === 0 ? (
                    <Image src={Bot} alt='Bot' width={50} height={50} />
                  ) : null}
                  {messageFunc(el as string, i)}
                  <div ref={scrollToBottomRef}></div>
                </div>
              ))}
              <div className={styles.Options}>
                {options.map((el, i) => (
                  <Button
                    onClick={() => optionClicked(el)}
                    key={i}
                    variant='outline'
                  >
                    {el}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.MessageArea}>
              <Loader />
            </div>
          )}
        </AppShell>
      </Dialog>
    </div>
  );
};

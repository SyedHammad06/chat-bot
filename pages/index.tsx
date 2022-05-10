import type { NextPage } from 'next';
import Head from 'next/head';
import { Left } from '../components/Left/Left';
import { Right } from '../components/Right/Right';

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Chat Bot</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Left />
      <Right />
    </main>
  );
};

export default Home;

import type { NextPage } from 'next';
import { Left } from '../components/Left/Left';
import { Right } from '../components/Right/Right';

const Home: NextPage = () => {
  return (
    <main>
      <Left />
      <Right />
    </main>
  );
};

export default Home;

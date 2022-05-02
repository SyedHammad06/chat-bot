import type { NextPage } from 'next';
import Image from 'next/image';

import Bot from '../../public/bot.png';
import styles from './Left.module.scss';

export const Left: NextPage = () => {
  return (
    <div className={styles.Left}>
      <div className={styles.Heading}>
        <h1 className={styles.Heading__text}>StarBot</h1>
        <Image src={Bot} alt='Bot' width={80} height={80} />
      </div>

      <div className={styles.Content}>
        <ul className={styles.List}>
          <li className={styles.Item}>
            <h2 className={styles.SubHeading}>Smart</h2>
            <p className={styles.Details}>
              It uses conversations artificial intelligence (AI) technology to
              stimulate a discussion (or a chat) with a user in natural
              language.
            </p>
          </li>
          <li className={styles.Item}>
            <h2 className={styles.SubHeading}>Less human interaction</h2>
            <p className={styles.Details}>
              A chatbot can enhance and engage customer interaction with less
              human interaction.
            </p>
          </li>
          <li className={styles.Item}>
            <h2 className={styles.SubHeading}>Remove barriers</h2>
            <p className={styles.Details}>
              It removes barriers to customer support that can occur when demand
              outpaces resources.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

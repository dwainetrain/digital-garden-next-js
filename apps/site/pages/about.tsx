import { GetStaticProps } from 'next';
import styles from './about.module.css';

/* eslint-disable-next-line */
export interface AboutProps {
  name: string
}

export function About({ name }: AboutProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome {name}</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
  return {
    props: {
      name: 'Dwaine'
    }
  }
}

export default About;

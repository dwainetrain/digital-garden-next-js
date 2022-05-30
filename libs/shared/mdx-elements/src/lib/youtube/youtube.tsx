import styles from './youtube.module.css';

/* eslint-disable-next-line */
export interface YoutubeProps {
  uid: string,
  title: string
}

export function Youtube(props: YoutubeProps) {
  return (
    <div>
      <iframe src={`https://www.youtube.com/embed/${props.uid}`} width="100%" height="500px" title={props.title}></iframe>
    </div>
  );
}

export default Youtube;

import PostFeed from '../components/PostFeed';
import jazInSummer from '../data/jazInSummer.json';

function JazInSummerPage() {
  return (
    <PostFeed
      title="Jaz in Summer"
      intro="A collection of my GoPro montages."
      embedVideos
      posts={jazInSummer}
    />
  );
}

export default JazInSummerPage;

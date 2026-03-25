import PostFeed from '../components/PostFeed';
import jazSpottings from '../data/jazSpottings.json';

function JazSpottingsPage() {
  return (
    <PostFeed
      title="Jaz Spottings"
      posts={jazSpottings}
    />
  );
}

export default JazSpottingsPage;

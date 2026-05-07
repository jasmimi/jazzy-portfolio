import PostFeed from '../components/PostFeed';
import jazSpottings from '../data/jazSpottings.json';

function JazSpottingsPage() {
  return (
    <PostFeed
      title="Jaz Spottings"
      intro="A little shelf for panels, events, local arts, and the moments I want to remember."
      posts={jazSpottings}
    />
  );
}

export default JazSpottingsPage;

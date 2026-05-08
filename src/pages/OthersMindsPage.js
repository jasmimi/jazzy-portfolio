import PostFeed from '../components/PostFeed';
import OthersMinds from '../data/othersMinds.json';

function OthersMindsPage() {
  return (
    <PostFeed
      title="Others' Minds"
      intro="Insights and perspectives I've appreciated."
      posts={OthersMinds}
    />
  );
}

export default OthersMindsPage;

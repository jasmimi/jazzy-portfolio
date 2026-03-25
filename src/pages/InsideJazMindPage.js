import PostFeed from '../components/PostFeed';
import insideJazMind from '../data/insideJazMind.json';

function InsideJazMindPage() {
  return (
    <PostFeed
      title="Inside Jazs Mind"
      posts={insideJazMind}
    />
  );
}

export default InsideJazMindPage;

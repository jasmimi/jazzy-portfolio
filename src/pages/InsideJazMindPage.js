import PostFeed from '../components/PostFeed';
import insideJazMind from '../data/insideJazMind.json';

function InsideJazMindPage() {
  return (
    <PostFeed
      title="Inside Jaz's Mind"
      intro="Brain dumps, reflections, and thoughts that needed somewhere softer than a notes app."
      posts={insideJazMind}
    />
  );
}

export default InsideJazMindPage;

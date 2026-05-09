import PostFeed from '../components/PostFeed';
import insideJazMind from '../data/insideJazMind.json';

function InsideJazMindPage() {
  return (
    <PostFeed
      title="Inside Jaz's Mind"
      intro="Brain dumps, reflections, and thoughts in a published notes app. Accompanied by photos of my own or from Creative Commons sources."
      posts={insideJazMind}
    />
  );
}

export default InsideJazMindPage;

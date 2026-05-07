function HomePage() {
  return (
    <section className="page-section">
      <header className="section-header">
        <h1>Home</h1>
        <p>
          Kia ora! Welcome to my corner of the internet. When Instagram Reels taught me that
          static websites can be freely deployed on GitHub, I felt compelled to give it a go. I
          learned that very employable people in tech have blogs and finished personal projects.
          Sounds ambitious, but I'm having a go. Enjoy my brain dumps.
        </p>
      </header>

      <div className="reading-note">
        <p className="note-label">Reading status</p>
        <h2>Active Auckland Libraries member</h2>
        <p>
          My ideal website should feel a bit like a borrowed book, a journal page, and a tiny
          shelf of things I keep meaning to tell people about.
        </p>
      </div>

      <section className="about-card">
        <h2>Beyond the screen</h2>
        <p>
          I like to be a full and well-rounded person. When I'm not losing my eyesight staring at a
          screen, the following activities keep me busy:
        </p>
        <ul>
          <li>Reading books: I'm a very active Auckland Libraries member</li>
          <li>Enjoying live music: I like to support the local arts</li>
          <li>
            Gymming: I am also a very active CityFitness member, despite receiving several payment
            failed emails from them in the past years
          </li>
          <li>
            Journalling: Since I was 16! If we hang out, and I don't take any small souvenir to
            stick in my junk journal... it's bad news for us
          </li>
          <li>Instant film: The most expensive form of wallpaper, but these create lifetime memories</li>
          <li>
            GoPro Summer Montages: A tradition that I've trapped myself in. Spread among Facebook
            and Instagram are videos of my summer adventures from the ripe age of 16. 16 year old
            Jaz knew what was up
          </li>
          <li>
            Walking in the New Zealand bush: Good news is that there is a lot of it. This hobby is
            growing as a result of low finances and the desire to explore my country some more
          </li>
          <li>
            Swimming in the ocean: The ocean heals all. Unless it's been raining heavily recently.
            Or you live near Moa Point.
          </li>
        </ul>
      </section>

      <section className="about-card">
        <h2>Where I've been</h2>
        <p>
          I was very luckily born in Wellington, New Zealand. If there's a city-equivalent to
          patriotic, that's me. Although, I've ended up in Tamaki Makaurau Auckland! After 13 years
          of schooling at Miramar Central School, Evans Bay Intermediate School, and Wellington East
          Girls' College, I relocated to Auckland to study. Through AUT, I completed a Bachelor of
          Engineering (Honours) majoring in Software Engineering and minoring in Artificial
          Intelligence. I gratefully interned as a Data Engineer at Spark (Summer 22/23), an
          Application Developer at Treasury (Summer 23/24), and a Software Engineer at Immersve
          (Summer 24/25). I'm currently working as a Microservices Engineer at Araraurangi Air New
          Zealand through their ELEVATE Digital Graduate programme.
        </p>
      </section>

      <footer className="page-footer">
        <p>Made by Jasmine Amohia.</p>
        <ul>
          <li>
            <a href="https://github.com/jasmineamohia" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jasmineamohia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href="mailto:jasmine_amohia@hotmail.com" target="_blank" rel="noopener noreferrer">
              Email
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default HomePage;

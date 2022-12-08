import React from "react";
import "../styles/home.scss";
import Countdown from "react-countdown-simple";
import QuickAbout from "../components/about/QuickAbout";
import Schedule from "./Schedule";
import { Link } from "react-router-dom";
import AboutCamping from "../camping/AboutCamping";
import NewsStories from "../components/news/NewsStories";
import stories from "../assets/newstories.json";
function Home({ articleIngo }) {
  const ShortText = {
    about: (
      <p>
        Welcome to FooFest! <br />
        <br /> We are an annual music festival that celebrates the best in music
        and entertainment. Our mission is to create a fun, safe, and memorable
        experience for everyone. We feature national and international acts, as
        well as smaller, up-and-coming acts.
        <br />
        <br /> We strive to provide a safe, welcoming environment and to reduce
        our carbon footprint. We also have plenty of other attractions including
        food and drinks, interactive activities, and more!
        <br />
        <br /> Join us for an unforgettable experience!
      </p>
    ),
    camping: (
      <p>
        Camping at FooFest offers great experiences – take advantage of the
        atmosphere, make friends, and enjoy the festival. We have 5 camping
        areas around the festival square, each with food, small shops, toilets,
        showers, and interactive activities. Add camping to your festival ticket
        for just 99,- for even more benefits!
      </p>
    ),
  };

  const oneHour = new Date(
    new Date().setHours(new Date().getHours() + 100)
  ).toISOString();

  return (
    <>
      <section id="first-section">
        <Countdown targetDate={oneHour} />
        <Link to="/tickets">
          <button className="btn">Buy Now</button>
        </Link>
      </section>
      <NewsStories
        articleIngo={articleIngo}
        stories={stories.slice(0, 3)}
        newsHeadline={
          <h2>
            <Link to="/news">News Feed</Link>
          </h2>
        }
        /* newButton={
          <Link href="/news">
            <button className="btn">Read More</button>
          </Link>
        } */
      />
      <Schedule />
      <QuickAbout
        text={ShortText.about}
        button={
          <Link href="/about">
            <button className="btn">Read More</button>
          </Link>
        }
      />
      <AboutCamping
        text={ShortText.camping}
        button={
          <Link to="/Camping">
            <button className="btn">Read More</button>
          </Link>
        }
      />
    </>
  );
}

export default Home;

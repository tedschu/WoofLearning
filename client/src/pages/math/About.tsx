import woofMathLogo from "../assets/woofmath_logo_1.png";
import { Link } from "react-router-dom";

type AboutProps = {
  isLoggedIn: boolean;
};

function About({ isLoggedIn }: AboutProps) {
  console.log(isLoggedIn);

  return (
    <>
      <div className="aboutContainer">
        <div className="aboutHeader">
          {isLoggedIn ? (
            <Link to={"/me"}>
              <div> Go back</div>
            </Link>
          ) : (
            <Link to={"/welcome"}>
              <div> Go back</div>
            </Link>
          )}
          <div className="aboutHeaderImgContainer">
            <Link to={"/welcome"}>
              <img src={woofMathLogo} className="aboutHeaderImg" alt="" />
            </Link>
          </div>
        </div>
        <h1>Welcome to Woof Math. Here's more about us.</h1>

        <div className="aboutContentContainer">
          <h2>The backstory</h2>
          <p>
            Sometimes we'll be driving in the car, and one of my kids will ask
            me to ask them some sort of math problem. I'll say something like,
            "what's 5 times 6?" and wait for the response. This could, believe
            it or not, go on for an hour. It's not that they have a particular,
            burning love of math, but rather that in those moments, it becomes
            like a game. They want to see how many they can get in a row. Who
            can answer faster. All that good stuff.
          </p>
          <p>
            Woof Math also came along at a fortunate time. It just so happened
            that I was looking for a project to work on at the same time that my
            kids were let out of school for the summer. Seemingly within days
            they'd forgotten how to read, or how to do basic math. I am of
            course exaggerating a bit, but if you're a parent, you may have some
            sense of what I mean.
          </p>
          <p>
            Woof Math has been an incredibly rewarding project to work on, and I
            like the idea that it may make practicing (or, playing) math fun for
            my kids and for any other kid that would like to try it out. It is
            meant to be simple, fun, and free of distractions (like ads). I'd
            like to keep it that way at its core, even as we explore ways to
            make it more fun and useful.
          </p>
          <p>
            Finally, what about the "woof" in Woof Math? Well, candidly, it's a
            bit of an homage to our dog Charlie. You may even notice a cat
            sneaking in there (our cat Eli). But really, it was just a way to
            make it more of a game, and keep it loose.
          </p>
          <p>
            I hope that Woof Math is a good experience for anyone that would
            like to use it. Please feel free to reach out to me with feedback or
            suggestions at any time. Thanks!
          </p>
          <p>Ted Schuster</p>
          <p>Founder and developer, Woof Math</p>
          <p>Built in Illinois</p>
          <p>WoofLearning@gmail.com</p>
        </div>
        <div className="aboutContentContainer">
          <h2>Privacy policy</h2>
          <p>
            Woof Math does not presently have advertising on this site nor does
            it sell or share any information gathered with any third party, such
            as an advertising network.{" "}
          </p>
          <p>
            Woof Math does ask for a reasonable amount of personal information
            during the sign up (account creation) process, which is detailed
            below, in order to operate the Woof Math game.
          </p>
          <p>
            You may both review all information that you've shared with Woof
            Math at any time (in the Account page), and you may also delete your
            Woof Math account at any time, which will permanently remove all
            information shared with Woof Math as well as other data such as your
            scores.
          </p>

          <h4>
            Below is the information that is required to create a Woof Math
            account:
          </h4>
          <ul>
            {/* <li>
              <span className="bold">First name:</span> We ask for a first name
              to help us find your username if you forget it.
            </li> */}
            {/* <li>
              <span className="bold">Birth year:</span> This is the only bit of
              "analytics" that we may use as the creators of Woof Math. Quite
              simply, we would be interested to know which age groups get the
              most usage out of the app. We can then use this information to
              help improve the app in the future. As noted above, this
              information is not shared with any third parties.
            </li> */}
            <li>
              <span className="bold">"Your parent's email":</span> We ask for a
              parent email, not a child's email, to help us identify you when
              you can't find your username or password. To clarify, Woof Math
              will NOT email you as a part of this process - it is simply a way
              for us to verify that you are who you say you are. If in the
              future we decide to send out emails with updates to the site, for
              example, we will explicitly ask for your permission in the app.
            </li>
            <li>
              <span className="bold">Username:</span> This is how game players
              will be referred to during game play.
            </li>
            <li>
              <span className="bold">Password:</span> Your password will be
              encrypted, and you can reset it at any time.
            </li>
            <li>
              <span className="bold">Security questions:</span> We ask for a few
              "security questions" when you sign up for a Woof Math account.
              This is also purely for the purposes of helping to get you access
              to your account again if you forget your username or password.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;

import woofMathLogo from "../assets/woofmath_logo_1.png";
import { Link } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// TODO: UPDATE THIS TO REFLECT BOTH GAMES

type AboutProps = {
  isLoggedIn: boolean;
};

function About({ isLoggedIn }: AboutProps) {
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
        <h1>Welcome to Woof Learning. Here's more about us.</h1>

        <div className="aboutContentContainer">
          <h2 className="math-font">The backstory</h2>
          <p>
            As a parent of two grade school-aged kids, we try to make sure that
            they have good habits around reading and math skills. This means
            homework, reading interesting books, random math questions while
            driving in the car (I promise, they enjoy this), etc. They love
            books, and they love solving problems, and they also love screens.
            While there are plenty of computer- and app-based educational games
            out there, many of them are a bit heavy on the "game" and light on
            the learning. I tried with Woof Learning to stick to the
            fundamentals: reading and math.
          </p>
          <p>
            The fun is in the practice itself, and the positive feedback both
            from the points and doggy badges that you can win as you play. The
            focus isn't on "right" or "wrong," but in helping to build
            understanding and reinforcing learning.
          </p>
          <p>
            <b>Woof Reading</b> builds reading comprehension skills in kids from
            Kindergarten through 5th grade (and beyond). During gameplay, it
            lets you pick a story topic and a story type (ex. story, poem), and
            then it "writes" a story for you. Once you've read through it,
            there's a few questions at the bottom that you can answer to win
            points and dog badges. The cool thing here is that, whether the
            answers you give are spot-on or maybe a bit off, Woof Reading will
            provide helpful feedback with text evidence and will point the
            reader to the part of the story where they could find the answer. We
            do this by integrating with a brilliant AI technology that can
            understand the story, the questions, and the resposnes...and then to
            give substantive, relevant feedback. See more on the use of AI
            below.
          </p>
          <p>
            <b>Woof Math</b> has a similar gameplay experience, but is simpler:
            you select the type of math that you want to play (ex. addition,
            subtraction, division, multiplication) and how challenging the
            questions should be, and away you go.
          </p>

          <p>
            Finally, what about the "woof" in Woof Math? Well, candidly, it's a
            bit of an homage to our dog Charlie. You may even notice a cat
            sneaking in there (our cat Eli). But really, it was just a way to
            make it more of a game, and keep it loose.
          </p>

          <p>Ted Schuster</p>
          <p>Founder and developer, Woof Learning</p>
          <p>Built in Illinois</p>
          <p>WoofLearning@gmail.com</p>
        </div>

        <div className="aboutContentContainer">
          <h2 className="math-font">
            Woof Reading uses AI (artificial intelligence) to generate stories{" "}
            <AutoAwesomeIcon style={{ fontSize: "22px" }} />
          </h2>
          <p>
            Woof Reading uses an AI assistant called{" "}
            <Link className="promptsLinks" to={"http://claude.ai"}>
              Claude
            </Link>{" "}
            from Anthropic to (1) generate story ideas and questions about those
            stories, and (2) to evaluate the answers to those questions. The
            "evaluations" do not just say "right" or "wrong," but also provide
            contextual feedback to help the reader's understanding.
          </p>
          <h3>Why are you using AI?</h3>
          <p>
            This technology is particularly good at taking prompts - for
            example, "write a poem about my dog Charlie," and then constructing
            stories that are not just legible, but also quite interesting.
            Similarly, if you're asking about real-world information ("write a
            story about Abraham Lincoln") - you'll also find the responses to be
            reliably accurate. The technology also does an impressive job of
            making sense of information and providing feedback that is easy to
            understand, and conversational in tone.
          </p>
          <p>
            Woof Reading is NOT intended to replace live instruction, or reading
            with a parent or tutor - it is simply a way to supplement and
            hopefully strengthen these efforts. It is also NOT intended to
            replace the beauty and originality of books and storytelling. The
            stories that Claude creates are fun (and sometimes witty), but are
            meant to be rather straightforward. The idea here is not to produce
            profound literature, but to simply help with reading comprehension.
          </p>
          <h3>What are you doing to make this app safe to use?</h3>
          <p>
            AI tools are very "intelligent," but are guided by what a user asks
            them to do. Woof Reading, for this reason, does not allow you to
            freely ask for any story idea. Instead, it relies on two simple
            inputs: (1) the type of content to create (ex. "poem," "story"), and
            (2) a fixed set of prompts (story ideas) that we have selected, and
            which a user can choose in the app. So for instance, during the
            game, you may ask Woof Reading to write a "poem" about "space
            travel." You can{" "}
            <Link className="promptsLinks" to={"/prompts"}>
              see all of the pre-set prompts for Woof reading here
            </Link>
            . Put simply, we set the type of stories that can be created so that
            all topics are safe and, ideally, interesting. We also have
            additional safeguards in place to ensure that appropriate language
            is used.
          </p>
          <p>
            Anthropic (the maker of Claude) also details their user safety
            approach{" "}
            <Link
              className="promptsLinks"
              to={
                "https://support.anthropic.com/en/articles/8106465-our-approach-to-user-safety"
              }
            >
              here
            </Link>
            .
          </p>
          <p>
            If you have any feedback on the prompts, or further questions on the
            use of AI in Woof Reading, please contact us at
            WoofLearning@gmail.com.
          </p>
        </div>

        <div className="aboutContentContainer">
          <h2>Privacy policy</h2>
          <p>
            Woof Learning (Woof Math, Woof Reading) does not presently have
            advertising on this site nor does it sell or share any information
            gathered with any third party, such as an advertising network.{" "}
          </p>
          <p>
            Woof Learning does ask for a reasonable amount of personal
            information during the sign up (account creation) process, which is
            detailed below, in order to operate the Woof Reading game. Note that
            none of this data is shared with Anthropic ("Claude").
          </p>
          <p>
            You may both review all information that you've shared with Woof
            Reading at any time (in the Account page), and you may also delete
            your Woof Reading account at any time, which will permanently remove
            all information shared with Woof Reading as well as other data such
            as your scores.
          </p>

          <h4>
            Below is the information that is required to create a Woof Learning
            account:
          </h4>
          <ul>
            {/* <li>
              <span className="bold">First name:</span> We ask for a first name
              to help us find your username if you forget it.
            </li> */}
            {/* <li>
              <span className="bold">Birth year:</span> This is the only bit of
              "analytics" that we may use as the creators of Woof Reading. Quite
              simply, we would be interested to know which age groups get the
              most usage out of the app. We can then use this information to
              help improve the app in the future. As noted above, this
              information is not shared with any third parties.
            </li> */}
            <li>
              <span className="bold">"Your parent's email":</span> We ask for a
              parent email, not a child's email, to help us identify you when
              you can't find your username or password. To clarify, Woof
              Learning will NOT email you as a part of this process. If in the
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
              "security questions" when you sign up for a Woof Learning account.
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

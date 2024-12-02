import React from "react";

import woofMathLogo from "../assets/woofmath_logo_1.png";
import { Link } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function About({ isLoggedIn }) {
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
        <h1>Welcome to Woof Reading. Here's more about us.</h1>

        <div className="aboutContentContainer">
          <h2>The backstory</h2>
          <p>
            As with{" "}
            <Link style={{ color: "inherit" }} to={"http://woofmath.com/about"}>
              Woof Math
            </Link>
            , this project was inspired both by my kids as well as a personal
            desire to make simple, fun games online to help practice reading and
            math that actually focus on, well...reading and math. One of the
            helpful tools we've used as a family over the years, particularly in
            the summer months, are reading comprehension workbooks. The kids
            will read a passage and then answer a few questions or solve a
            puzzle afterwards. Woof Reading is intended to emulate that
            experience, but to make it also a bit more fun by allowing them to
            choose a topic and a type of story, whether that be a short story,
            poem, or ballad. They can, of course, also win animal badges as they
            answer questions correctly and score points. So that's pretty cool,
            too.
          </p>
          <p>
            Finally, I thought that some of the recent advances in AI platforms
            would be particularly suited for helping kids with their reading. As
            a developer, I was curious to see how the technology would handle
            this use case: would it be clunky, awkward, or completely unusable?
            As a dad, I was very intent on building something with strict
            parameters so that I could be confident that it was safe. After
            trying it out, it was clear that it would work. Another minor upside
            to all of this is that kids, in using Woof Reading, can get a
            curated, basic understanding of some of the interesting and
            beneficial uses of this booming technology.
          </p>
          <p>
            You may have questions or concerns about these tools, many of which
            I had as well. Please see the section below for more details on how
            these tools are used and the safeguards in place. Please do feel
            free to contact us with any additional questions or feedback you may
            have in order to make this a better, more productive place to
            practice reading. Thank you!
          </p>

          <p>Ted Schuster</p>
          <p>Founder and developer, Woof Learning</p>
          <p>Built in Illinois</p>
          <p>WoofLearning@gmail.com</p>
        </div>

        <div className="aboutContentContainer">
          <h2>
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
            Woof Reading does not presently have advertising on this site nor
            does it sell or share any information gathered with any third party,
            such as an advertising network.{" "}
          </p>
          <p>
            Woof Reading does ask for a reasonable amount of personal
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
            Below is the information that is required to create a Woof Reading
            account:
          </h4>
          <ul>
            {/* <li>
              <span className="bold">First name:</span> We ask for a first name
              to help us find your username if you forget it.
            </li> */}
            <li>
              <span className="bold">Birth year:</span> This is the only bit of
              "analytics" that we may use as the creators of Woof Reading. Quite
              simply, we would be interested to know which age groups get the
              most usage out of the app. We can then use this information to
              help improve the app in the future. As noted above, this
              information is not shared with any third parties.
            </li>
            <li>
              <span className="bold">"Your parent's email":</span> We ask for a
              parent email, not a child's email, to help us identify you when
              you can't find your username or password. To clarify, Woof Reading
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
              "security questions" when you sign up for a Woof Reading account.
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

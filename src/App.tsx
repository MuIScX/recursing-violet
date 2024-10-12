import { useState, useEffect } from "react";
import "./App.css"; // Ensure this contains the updated CSS

const noPhrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Sure sure?",
  "Think again!",
  "Final answer?",
];

function App() {
  const [noCount, setNoCount] = useState(0); // Track "No" presses
  const [currentQuestion, setCurrentQuestion] = useState(""); // Track the current question
  const [showEnvelope, setShowEnvelope] = useState(true); // Track whether to show the envelope animation
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false); // Track if envelope is open
  const [isAwake, setIsAwake] = useState(false); // Track if she's woken up
  const [trainImage, setTrainImage] = useState(false); // Track if train image should show
  const [nextImage, setNextImage] = useState(false); // Track when the next image is shown
  const [showFirstMessage, setShowFirstMessage] = useState(false); // Track if the "First Message" page is showing
  const [extraImagesStep, setExtraImagesStep] = useState(0); // Track the sequence of extra images
  const yesButtonSize = noCount * 20 + 16; // Yes button size grows based on No count
  const [showFinalImage, setShowFinalImage] = useState(false); // Track if final image should be shown
  const [finalSlideState, setFinalSlideState] = useState(0); // Track the final slide state

  const extraImages = [
    {
      url: "https://www.dropbox.com/scl/fi/sz4ll2ceb3dt9hra94cin/viewswithher.jpg?rlkey=apz19a5svxbkda9g65v1gnnsj&st=j8xheaf1&raw=1",
      question: "She's tired proceed with caution",
    },
    {
      url: "https://www.dropbox.com/scl/fi/131ra3mirqxkpzovb17ts/wme.jpg?rlkey=i61zlslu1e7rogtuxorh9a1bc&st=u4o77kse&raw=1",
      question: "Disturb her? NUH UH",
    },
    {
      url: "https://www.dropbox.com/scl/fi/idyh5ixnd03dncl0km0op/meandher.jpg?rlkey=zm8x1gqvzd6b5wbj5esrmqfg9&st=c15urmji&raw=1",
      question: "SHE'S NOT AVAILABLE!",
    },
    {
      url: "https://www.dropbox.com/scl/fi/khj3iqkloe9n7eurp9och/sleepu.jpg?rlkey=14rp3f62zpzredhxfngjxuysk&st=d7b95354&raw=1",
      question: "Oii BACK OFF!!!",
    },
    {
      url: "https://www.dropbox.com/scl/fi/jxwv8jq9bfbesue7szfwl/cinema.jpg?rlkey=6cvlh4nt1t2aibj3qrzvvotcq&st=1ygszsz5&raw=1",
      question: "Oh wait she's awake now r u tired?",
    },
  ];

  // Open envelope and keep the message longer before transitioning
  function openEnvelope() {
    setIsEnvelopeOpen(true); // Open the envelope
    setTimeout(() => {
      setTimeout(() => {
        setShowEnvelope(false); // Remove the envelope after the message stays for 0.1 seconds
        setShowFirstMessage(true); // Show the first message page
      }, 2000); // Show the message inside the envelope for 0.1 seconds
    }, 1000); // Envelope opening animation duration
  }

  // Reset envelope state
  function resetEnvelope() {
    setIsEnvelopeOpen(false);
    setShowEnvelope(true); // Show the envelope again for replay
  }

  // Go to the "Do you want to read more?" question from the "First Message" page
  function goToReadMore() {
    setShowFirstMessage(false); // Hide first message page
    setCurrentQuestion("Do you want to read more?"); // Go to main question flow
  }

  // Main button logic for questions
  function handleYesClick() {
    if (currentQuestion === "Do you want to read more?") {
      setCurrentQuestion("Play with me?");
    } else if (currentQuestion === "Play with me?") {
      setCurrentQuestion("Oh no, she fell asleep!");
    } else if (currentQuestion === "Oh wait she's awake now r u tired?") {
      setCurrentQuestion("Well she is");
      setFinalSlideState(1);
      setTimeout(() => {
        setCurrentQuestion("but he's not, will you give him a chance?");
        setFinalSlideState(2);
        setTimeout(() => {
          setCurrentQuestion("Will you watch the joker2 w me?");
          setFinalSlideState(3); // Move to state 3
        }, 4000);
      }, 4000);
    } else if (finalSlideState === 3) {
      // When Yes is pressed on state 3
      setFinalSlideState(4); // Go to final state 4 directly
      setShowFinalImage(true); // Show the final "Yayyy" and GIF
      setCurrentQuestion(""); // Clear the current question
    }
    setNoCount(0); // Reset No count
  }

  function handleNoClick() {
    setNoCount((prevCount) => Math.min(prevCount + 1, noPhrases.length)); // Cycle "No" phrases
    if (finalSlideState === 3) {
      setCurrentQuestion(noPhrases[Math.min(noCount, noPhrases.length - 1)]); // Update question with the current No phrase
    }
  }

  // Wake her up functionality with no delay between image transitions
  function handleWakeUpClick() {
    if (!isAwake) {
      setIsAwake(true); // Set awake state to true
      setCurrentQuestion("Shhh, be quiet!"); // Change question to "Shhh, be quiet!"
      setTrainImage(true); // Show train image instantly
    } else if (trainImage && !nextImage) {
      setNextImage(true); // Trigger the final image immediately
      setCurrentQuestion("Wake her? Bold move."); // Change question to "Wake her? Bold move."
    } else if (nextImage && extraImagesStep < extraImages.length) {
      setCurrentQuestion(extraImages[extraImagesStep].question); // Update question
      setExtraImagesStep((prevStep) => prevStep + 1); // Move to the next image instantly
    } else if (extraImagesStep >= extraImages.length) {
      setCurrentQuestion("Oh wait she's awake now r u tired?"); // Show the final question with Yes/No buttons
    }
  }

  return (
    <div className="val-container">
      {showEnvelope ? (
        <div className="envelope-wrapper">
          <div id="envelope" className={isEnvelopeOpen ? "open" : "close"}>
            <div className="front flap"></div>
            <div className="front pocket"></div>
            <div className="letter">
              <p className="words line1">Hello</p>
              <p className="words line2">Hope you like this</p>
            </div>
          </div>
          <div className="reset">
            <button onClick={openEnvelope}>Open</button>
            <button onClick={resetEnvelope}>Reset</button>
          </div>
        </div>
      ) : showFirstMessage ? (
        <div className="val-container">
          <h2>Here's My First Message to You</h2>
          <a
            href="https://open.spotify.com/playlist/0RhKDs9fnBvzcRCsBBRULC?si=68e59a0577774cc9"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to listen on Spotify
          </a>
          <br />
          <button className="button next-button" onClick={goToReadMore}>
            Don't forget to come back (There's more!)
          </button>
        </div>
      ) : finalSlideState === 1 ? ( // Show first final image
        <>
          <img
            src="https://www.dropbox.com/scl/fi/7fblvon42slgvcudci71s/bbyher.jpg?rlkey=y6zsd4nr98r873l16khr1tfqu&st=qjqz6nn9&raw=1"
            alt="final-sequence"
            style={{ width: "200px", height: "auto" }}
          />
          <div className="val-text">Well she is</div>
        </>
      ) : finalSlideState === 2 ? ( // Show second final image immediately
        <>
          <img
            src="https://www.dropbox.com/scl/fi/7z0n37aqjpziwwvd2c9jl/me.jpg?rlkey=0breu2n4u7ltzbz5j0ag3d3ad&st=baysdh8e&raw=1"
            alt="final-sequence"
            style={{ width: "200px", height: "auto" }}
          />
          <div className="val-text">
            but he's not, will you give him a chance?
          </div>
        </>
      ) : finalSlideState === 3 ? ( // instantly Show third final image immediately
        <>
          <img
            src="https://www.dropbox.com/scl/fi/yj8velddzowbcfk9m5du2/bbyme.jpg?rlkey=m40ccf82nbqx0wo7pxdyenzak&raw=1"
            alt="final-sequence"
            style={{ width: "200px", height: "auto" }}
          />
          <div className="val-text">Will you watch the joker2 w me?</div>
          <div>
            <button
              className="button yes-button"
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick} // When Yes is pressed, it will transition to state 4
            >
              Yes
            </button>
            <button onClick={handleNoClick} className="button no-button">
              {noPhrases[Math.min(noCount, noPhrases.length - 1)]}
            </button>
          </div>
        </>
      ) : finalSlideState === 4 ? ( // Show the "Yayyy" and the kiss bear GIF when Yes is pressed
        <>
          <img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="yes-pic"
          />
          <div className="val-text">Yayyy ti amo 333</div>
        </>
      ) : (
        <>
          <img
            src={
              extraImagesStep > 0 && extraImagesStep <= extraImages.length
                ? extraImages[extraImagesStep - 1].url
                : currentQuestion === "Do you want to read more?"
                ? "https://media.tenor.com/vknNeIAWurIAAAAi/tkthao219-bear.gif"
                : currentQuestion === "Play with me?"
                ? "https://www.dropbox.com/scl/fi/o2zttua70faeba7uthozy/playwithmo.PNG?rlkey=bunkz1fxkligxscivpmb0o71n&st=zkgpoorf&raw=1"
                : nextImage
                ? "https://www.dropbox.com/scl/fi/mg01v0g6xpnt2fmocsqfy/down.jpg?rlkey=3318u938pjltyzgjh9u0pskk8&st=bw2d1okl&raw=1"
                : trainImage
                ? "https://www.dropbox.com/scl/fi/4520osycj1nantetlj9dj/train.jpg?rlkey=lzzvjn35b15ao0aw7uo2qp28v&st=26xborij&raw=1"
                : "https://www.dropbox.com/scl/fi/s46y8kjjyh1zt91o3mdto/firstimg.jpg?rlkey=mrs8r5eszy2ldqncd8fvlhau5&st=b62v4lat&raw=1"
            }
            alt="asking-bear"
            style={{ width: "200px", height: "auto" }}
          />
          <div className="val-text">{currentQuestion}</div>
          <div>
            {extraImagesStep >= extraImages.length ? (
              <>
                <button
                  className="button yes-button"
                  style={{ fontSize: yesButtonSize }}
                  onClick={handleYesClick}
                >
                  Yes
                </button>
                <button onClick={handleNoClick} className="button no-button">
                  {noPhrases[Math.min(noCount, noPhrases.length - 1)]}
                </button>
              </>
            ) : trainImage || nextImage || extraImagesStep > 0 ? (
              <button className="button yes-button" onClick={handleWakeUpClick}>
                Wake her up
              </button>
            ) : currentQuestion === "Oh no, she fell asleep!" ? (
              <>
                {isAwake ? (
                  <div className="val-text">She woke up!</div>
                ) : (
                  <button
                    className="button yes-button"
                    onClick={handleWakeUpClick}
                  >
                    Wake her up
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  className="button yes-button"
                  style={{ fontSize: yesButtonSize }}
                  onClick={handleYesClick}
                >
                  Yes
                </button>
                <button onClick={handleNoClick} className="button no-button">
                  {noPhrases[Math.min(noCount, noPhrases.length - 1)]}
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

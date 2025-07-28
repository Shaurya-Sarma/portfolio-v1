import NavigationBar from "../../components/NavigationBar";
import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Echo: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-[#fcfaf4] min-h-screen w-full">
      <NavigationBar />

      {/* Project Breakdown */}
      <main className="max-w-screen-lg mx-auto pt-32 px-8 relative">
        <ProjectHero project={project} />
        {/* Custom Content */}
        <div className="pb-10 breakdown">
          <h5>Breakdown</h5>
          <p>
            Echo was built at HackRU S25 under 24 hours and I worked alongside 3
            other developers to build this project from scratch. Out of ~120
            teams, we won the Best UI/UX track. This project was inspired by the
            idea of using generative voice AI from{" "}
            <a
              href="https://elevenlabs.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ElevenLabs
            </a>{" "}
            to give a voice to people who are affected by conditions that limit
            their ability to speak or produce sound (i.e. ALS, aphasia, or
            laryngectomy).
          </p>
          <iframe
            className="w-full h-[60vh] my-5 rounded-sm shadow-md"
            src="https://www.youtube.com/embed/84KuC69yNow?si=NEAE3qfjlm0SF1rc"
            title="Echo Demo"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <p>
            I worked primarily with the machine learning model and designed the
            UI/UX for the frontend. We encountered several roadblocks during the
            developmental process, especially with the model's accuracy and
            running time, but we were able to put together a solid working
            prototype in the final hours of the hackathon.
          </p>
          <h5>Implementation</h5>
          <p>
            The crux of this project relied on a machine learning model called
            Visual Speech Recognition (VSR) and was based on a{" "}
            <a
              href="https://arxiv.org/pdf/2303.14307"
              target="_blank"
              rel="noopener noreferrer"
            >
              research paper
            </a>{" "}
            authored by Pingchuan Ma and several other collaborators. The{" "}
            <a
              href="https://github.com/mpc001/Visual_Speech_Recognition_for_Multiple_Languages?tab=readme-ov-file#License"
              target="_blank"
              rel="noopener noreferrer"
            >
              VSR model{" "}
            </a>{" "}
            was trained and built by this research team as well and was integral
            to our project's success. The model essentially uses facial
            detection and landmarks with MediaPipe to track mouth movements.
            Based on these movements, the model predicts the corresponding
            phoneme and stitches them together to convert it into
            words/phrases/sentences.
          </p>
          <p>
            This "lip reading" model allowed for us to pass in a video clip and
            then transcribed it into text. However, we wanted to expand upon
            this by making this work in real-time. We wanted to take the video
            feed from a camera and have the model do its inferencing and yield
            output continuously.
          </p>
          <div className="callout">
            I experimented with another model called AV-HuBERT (Audio-Visual
            Hidden Unit BERT) but I was unable to setup the model locally during
            the hack. We resorted to working with the VSR model and decided to
            focus on modifying the model to work in real-time.
          </div>
          <p>
            We were able to achieve this through a chunking process by splitting
            the live video stream into 3-second clips. While this was definitely
            not the most efficient, accounting for the time constraints and the
            complexity of the model given sparse documentation, I believe it was
            appropriate approach.
          </p>
          <div className="code">
            <SyntaxHighlighter
              language={"python"}
              style={oneDark}
              showLineNumbers={true}
              wrapLines={true}
            >{`for clip_num in range(1, 6):
        print(f"Recording clip {clip_num}...")
        frames = []
        # Capture frames until we have enough for a 3-second clip.
        while len(frames) < num_frames_clip:
            ret, frame = cap.read()
            if not ret:
                print("Warning: Failed to capture frame.")
                break
            frames.append(frame)
            cv2.imshow("Live Feed", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break`}</SyntaxHighlighter>
          </div>
          <p>
            This method ultimately did produce a result we were satisfied with,
            there was indeed a significant latency between mouthing words on
            camera and the model outputting the text. It is also important to
            mention that the{" "}
            <a
              href="https://mmai.io/datasets/lip_reading/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LRS3 dataset
            </a>{" "}
            self-reported an error rate of ~20%, however, as a proof of concept
            this inaccuracy was acceptable. We worked hard to optimize this as
            much as possible and reduce this latency by configuring the model to
            run optimally on our hardware which was a M1 MacBook Pro.
          </p>
          <div className="callout">
            We had suspicions that our hardware was limiting the model's
            performance and experimented with setting up a cloud GPU instance
            for marginal improvements. But, we were unable to get this working
            in time for the demo.
          </div>
          <p>
            After we were able to take live video stream and transcribe this
            into text through "lip reading," we fed this as a stream to
            ElevenLabs' API to provide a generative voice. We also allowed the
            option for users to provide audio samples of their own voice to
            generate a voice to sound more like them. This was a feature we kept
            in mind for individuals who maybe were able to speak before but
            after a condition or surgical procedure were unable to.
          </p>
          <p>
            The last part was just to sync up our frontend with our
            backend/model. After lots of debugging and some horrible issues with
            weird dependency-related conflicts, we got a working demo up a few
            hours before the hackathon's submission deadline.
          </p>
          <h5>Conclusion</h5>
          <p>
            While the result is far from perfect, it was a rewarding challenge
            to work with such a complex ML model and successfully modify it to
            our own use case. It was definitely a scramble for time, but toying
            with the demo shows the potential of this technology. We were able
            to further this idea after the hackathon by rerouting the generative
            voice output through a Zoom call.
          </p>
          <p>
            So just by mouthing words, you could still participate in a
            conversation over the phone. It is interesting to think about what
            other applications this technology can have in education, language,
            and also the medical scene.Thank you and I hope you enjoyed reading!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Echo;

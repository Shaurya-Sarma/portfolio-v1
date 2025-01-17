import { Canvas } from "@react-three/fiber";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaFileAlt,
  FaArtstation,
} from "react-icons/fa"; // Import the icons
import NavigationBar from "../components/NavigationBar";
import Particles from "../components/Particles";

function ContactPage() {
  return (
    <>
      <NavigationBar />
      {/* Animated Particle Background */}
      <div className="fixed h-full w-full -z-50">
        <Canvas>
          <Particles smallCount={10000} bigCount={50} />
        </Canvas>
      </div>
      <div className="w-screen h-screen flex flex-col items-center justify-center ">
        {/* Contact Information */}
        <main className="flex flex-col items-center justify-center max-w-screen-md w-full text-center p-4">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-12">
            Want to get in touch?
          </h1>

          <div className="flex flex-col gap-10 text-xl uppercase text-[#e99518] font-semibold sm:text-2xl">
            <a
              href="/documents/Shaurya_Sarma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 hover:underline"
            >
              <FaFileAlt /> Resume
            </a>
            <a
              href="mailto:shaurya.sarma@gmail.com"
              className="flex items-center justify-center gap-2 hover:underline"
            >
              <FaEnvelope /> Email
            </a>
            <a
              href="https://linkedin.com/in/shaurya-sarma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 hover:underline"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://github.com/Shaurya-Sarma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 hover:underline"
            >
              <FaGithub /> GitHub
            </a>

            <a
              href="https://www.artstation.com/shaurya-sarma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 hover:underline"
            >
              <FaArtstation /> ArtStation
            </a>
          </div>
        </main>

        {/* Footer */}
        <div className="absolute text-center text-sm text-gray-500 bottom-10">
          Made by Shaurya © {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}

export default ContactPage;

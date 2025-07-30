import { FaLinkedin, FaGithub, FaArtstation, FaFileAlt } from "react-icons/fa";

const iconMap = {
  linkedin: <FaLinkedin />,
  github: <FaGithub />,
  artstation: <FaArtstation />,
  resume: <FaFileAlt />,
};

const links = [
  { id: "linkedin", href: "https://www.linkedin.com/in/shaurya-sarma/" },
  { id: "github", href: "https://github.com/shaurya-sarma" },
  { id: "artstation", href: "https://www.artstation.com/shaurya-sarma" },
  {
    id: "resume",
    href: "/documents/Shaurya_Sarma_Resume.pdf",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

export default function SocialButtonBar() {
  return (
    <div className="flex gap-3">
      {links.map(({ id, href }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          data-hide-cursor
          rel="noopener noreferrer"
          className="w-8 h-8 sm:w-10 sm:h-10  flex items-center justify-center rounded-full bg-[#f7b727] text-white text-md sm:text-lg transition-transform transform hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-[#e99518]"
        >
          {iconMap[id as keyof typeof iconMap]}
        </a>
      ))}
    </div>
  );
}

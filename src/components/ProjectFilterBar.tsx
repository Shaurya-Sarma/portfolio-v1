import { useCursorContext } from "../helpers/CursorContext";

interface ProjectFilterBarProps {
  setSelectedTag: (tag: string | null) => void;
  selectedTag: string | null;
}

function ProjectFilterBar({
  setSelectedTag,
  selectedTag,
}: ProjectFilterBarProps) {
  const { setCursorHover } = useCursorContext();

  const tags = [
    {
      full: "Software Development",
      short: "Software",
      id: "software dev",
    },
    { full: "Computer Graphics", short: "Graphics", id: "computer graphics" },
  ];

  return (
    <div className="flex flex-row justify-between items-center z-10">
      <h2 className="text-lg font-medium lowercase">My Portfolio:</h2>

      <div className="flex flex-row gap-2 md:gap-5">
        {tags.map(({ full, short, id }) => {
          const isActive = selectedTag === id;

          return (
            <h3
              key={id}
              className={`text-base md:text-lg lowercase font-medium cursor-pointer select-none rounded-full text-black transition-all duration-500 py-1 px-4 flex items-center gap-2 ${
                isActive ? "bg-[#F5B700]" : "bg-black/10 hover:bg-black/20"
              }`}
              onClick={() => setSelectedTag(isActive ? null : id)}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <span className="md:inline hidden">{full}</span>
              <span className="md:hidden inline">{short}</span>
              {isActive && (
                <span className="text-base md:text-lg font-medium">×</span>
              )}
            </h3>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectFilterBar;

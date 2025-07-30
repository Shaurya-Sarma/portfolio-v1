import { useCursorContext } from "../helpers/CursorContext";

interface ArtFilterBarProps {
  setSelectedTag: (tag: string | null) => void;
  selectedTag: string | null;
}

function ArtFilterBar({ setSelectedTag, selectedTag }: ArtFilterBarProps) {
  const { setCursorHover } = useCursorContext();

  const tags = [
    { full: "3D Renders", short: "3d", id: "3d" },
    { full: "Photography", short: "camera", id: "camera" },
  ];

  return (
    <div className="flex flex-col gap-2 sm:flex-row justify-between items-center z-10 mb-6">
      <h2 className="text-lg font-medium lowercase">some cool stuff:</h2>

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

export default ArtFilterBar;

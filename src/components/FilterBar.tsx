interface Tag {
  full: string;
  short: string;
  id: string;
}

interface FilterBarProps {
  header: string;
  tags: Tag[];
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

function FilterBar({
  header,
  tags,
  selectedTag,
  setSelectedTag,
}: FilterBarProps) {
  return (
    <div className="w-full flex flex-col gap-2 sm:flex-row justify-between items-center z-10 mb-6">
      <h2 className="text-lg font-medium lowercase">{header}</h2>

      <div className="flex flex-row gap-2 md:gap-5">
        {tags.map(({ full, short, id }) => {
          const isActive = selectedTag === id;

          return (
            <h3
              key={id}
              data-hide-cursor
              className={`text-base md:text-lg lowercase font-medium cursor-pointer select-none rounded-full text-black transition-all duration-500 py-1 px-4 flex items-center gap-2 ${
                isActive ? "bg-[#F5B700]" : "bg-black/10 hover:bg-black/20"
              } `}
              onClick={() => setSelectedTag(isActive ? null : id)}
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

export default FilterBar;

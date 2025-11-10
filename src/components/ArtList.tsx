import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function ArtList({ filteredImages }: { filteredImages: any[] }) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        350: 1,
        640: 2,
        768: 2,
      }}
    >
      <Masonry gutter="1rem">
        {filteredImages.map((item: any, index: number) => (
          <LazyImageTile item={item} index={index} key={item.url} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

// 🖼️ Subcomponent for lazy-loading + fade-in
function LazyImageTile({ item, index }: { item: any; index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px", // load slightly before visible
  });

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
      data-hide-cursor
    >
      {inView ? (
        <motion.img
          key={item.url}
          src={`/images/art/${item.url}`}
          alt={item.title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ) : (
        // low-res placeholder or transparent box keeps layout stable
        <div className="w-full h-64 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="absolute bottom-0 left-0 p-4 text-white font-semibold text-md sm:text-lg">
          {item.title}
        </h3>
        <span className="absolute bottom-0 right-0 p-4 text-white font-semibold text-md sm:text-lg italic">
          {(index + 1).toString().padStart(3, "0")}
        </span>
      </div>

      <div
        className="absolute inset-0 cursor-pointer"
        onClick={() => {
          console.log(`Clicked image: ${item.title}`);
        }}
      />
    </div>
  );
}

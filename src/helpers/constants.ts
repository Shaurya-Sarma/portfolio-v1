// HomePage.tsx
export const HOME_TITLE = "Hey, I'm Shaurya Sarma";
export const HOME_BIO1 =
  "I'm a student at the University of Pennsylvania, where I study computer graphics and computer science.";
export const HOME_BIO2 =
  "Creative coding meets immersive digital experiences — that's my sweet spot. I'm passionate about combining technology and art, exploring areas like mixed reality, 3D graphics, and interactive experiences.";

// ProjectsPage.tsx
export const PROJECT_FILTER_HEADERS = ["Software Dev", "Computer Graphics"];

export type ProjectKey = keyof typeof PROJECT_METADATA;

export type Project = {
  title: string;
  description: string;
  skills: string;
  roles: string;
  type: string;
  thumbnail: string;
  animated_thumbnail: string;
  demo_link?: string;
  source_link?: string;
  slug: string;
  tags: readonly string[];
};
export type ProjectHeroProps = {
  project: Project;
};

export const PROJECT_METADATA = {
  penn_place: {
    title: "Penn Place",
    description:
      "Penn Place is a collaborative digital art experiment created over an eight-week span, inviting users to design 3D art in a shared voxel grid. Inspired by Reddit's r/place, this platform allows participants to place colored voxels (blocks) in a 3D space, shaping a dynamic digital canvas in real time.",
    skills: "React, Three.js, Typescript, MongoDB, Redis, AWS",
    roles: "Project Lead, Developer, Designer",
    type: "Web Experience",
    thumbnail: "/images/penn-place/penn_place.png",
    animated_thumbnail: "/images/penn-place/penn_place.mp4",
    demo_link: "",
    source_link: "https://github.com/PennSpark/fa24-3dplace",
    slug: "penn-place",
    tags: ["software dev"],
  },
  lattice_configurator: {
    title: "Immersive XR Lattice Configurator",
    description:
      "A research project that explores how immersive technologies can transform Additive Manufacturing (AM) workflows through interactive, haptic simulations of compressible lattice structures via virtual reality. As opposed to the traditional process of printing and testing lattices manually, this project explores a digital alternative: a real-time XR environment that allows users to generate lattice structures procedurally, manipulate parameters dynamically, and feel their mechanical response through SenseGlove Nova 2 haptic gloves.",
    skills: "Unity, VR, C#, Blender, Python, SenseGlove Nova 2 SDK",
    roles: "Researcher, Developer",
    type: "Research Project",
    thumbnail: "/images/lattice-configurator/lattice-configurator.png",
    animated_thumbnail: "/images/lattice-configurator/lattice-configurator.mp4",
    demo_link: "",
    source_link: "",
    slug: "lattice-configurator",
    tags: ["software dev, computer graphics"],
  },
  chromesthesia: {
    title: "Chromesthesia VR",
    description:
      "An experimental VR project that translates sound into immersive visual experiences based on projective chromesthesia. Users can interact with objects in the VR space to produce sounds, which generate procedurally-created colored ripples with corresponding physical properties. This system aims to provide a perceptual experience inspired by projective chromesthesia inside an immersive virtual environment.",
    skills:
      "Unity, VR, C#, GLSL/HLSL, Shader Graph, Blender, Graphics Programming, Physics Simulation, Procedural Audio",
    roles: "",
    type: "Concept",
    thumbnail: "/images/chromesthesia-vr/chromesthesia-vr-v2.png",
    animated_thumbnail: "/images/chromesthesia-vr/chromesthesia-vr-v3.mp4",
    demo_link: "",
    source_link: "https://github.com/Shaurya-Sarma/color-synth",
    slug: "chromesthesia",
    tags: ["computer graphics"],
  },
  mini_minecraft: {
    title: "Mini Minecraft",
    description:
      "Mini Minecraft is a simplified version of Minecraft built from scratch using C++ and OpenGL, featuring procedural terrain generation, post-processing effects, shadow mapping, player physics, and custom loading and texturing of 1000+ Pokémon 3D models.",
    skills:
      "C++, OpenGL, GLSL, QT, Shader Programming, Computer Graphics, Procedural Generation/Effects",
    roles: "Developer (3-member team)",
    type: "Academic",
    thumbnail: "/images/mini-minecraft/mini-minecraft.png",
    animated_thumbnail: "/images/mini-minecraft/mini-minecraft.mp4",
    demo_link: "",
    source_link:
      "https://github.com/CIS4600-Fall-2025/mini-minecraft-group-graphics-goons",
    slug: "mini-minecraft",
    tags: ["computer graphics"],
  },
  rasterizer_shaders: {
    title: "Rasterizer & OpenGL Shaders",
    description:
      "A project for my interactive computer graphics class exploring the fundamental graphics pipeline, graphics programming, and creative shader effects. The first part implements a 2D and 3D triangle rasterizer with a perspective projection camera using C++ and Qt, covering vertex transformations, barycentric interpolation, and pixel rasterization. The second part develops OpenGL-based post-processing and surface shaders, including Blinn-Phong, Matcap, Gaussian blur, Sobel edge detection, and noise-driven effects. Worked with VBOs, VAOs, FBOs, GLSL shaders, and texture mapping for rendering and effects.",
    skills:
      "C++, OpenGL, GLSL, QT, Shader Programming, Rasterization, 3D Math, Computer Graphics, Procedural Effects",
    roles: "",
    type: "Academic",
    thumbnail: "/images/rasterizer-shaders/rasterizer-shaders.png",
    animated_thumbnail: "/images/rasterizer-shaders/rasterizer-shaders-v3.mp4",
    demo_link: "",
    source_link:
      "https://github.com/CIS4600-Fall-2025/homework-04-intro-to-opengl-Shaurya-Sarma",
    slug: "rasterizer-shaders",
    tags: ["computer graphics"],
  },
  capsule: {
    title: "Capsule",
    description:
      "Capsule is an interactive 3D platform where users can upload memories (.i.e photos/videos) as gachapon capsules that fill up a virtual gachapon machine. When opened, the time capsule reveals a dynamic, shareable 3D experience, offering an immersive way to revisit and celebrate collective moments.",
    skills: "React Three Fiber, Node.js, Typescript, AWS S3, MongoDB, Spline",
    roles: "Project Lead, Developer, Designer",
    type: "Web Experience",
    thumbnail: "/images/capsule/capsule.png",
    animated_thumbnail: "/images/capsule/capsule.mp4",
    demo_link: "",
    source_link: "https://github.com/PennSpark/sp25-penn-time-capsule",
    slug: "capsule",
    tags: ["software dev"],
  },
  echo: {
    title: "Echo",
    description:
      "Echo is an innovative AI-powered solution that gives a voice to those who can no longer speak. Using Visual Speech Recognition (VSR), our system tracks mouth movements and converts them into spoken words, allowing users to communicate naturally.",
    skills:
      "Next.js, React, Typescript, Python, Flask, PyTorch, MediaPipe, MongoDB",
    roles: "",
    type: "Concept",
    thumbnail: `/images/echo/echo.png`,
    animated_thumbnail: "/images/echo/echo.mp4",
    demo_link: "",
    source_link: "https://github.com/Safa-Karagoz/echo.",
    slug: "echo",
    tags: ["software dev"],
  },
  public_music_queue: {
    title: "Public Music Queue",
    description:
      "A real-time, collaborative music discovery platform where anyone can contribute to shared public queues. Users join genre-based rooms, add tracks from Spotify, and listen together as queues and playback stay synchronized across all participants.",
    skills:
      "React, TypeScript, Node.js, Express, Socket.io, PostgreSQL, WebSockets, Spotify API",
    roles: "Project Lead, Developer, Designer",
    type: "Web Experience",
    thumbnail: "/images/public-music-queue/public-music-queue.png",
    animated_thumbnail: "/images/public-music-queue/public-music-queue.mp4",
    demo_link: "",
    source_link: "https://github.com/wesleyyliu/public-music-queue",
    slug: "public-music-queue",
    tags: ["software dev"],
  },

  storify: {
    title: "Storify",
    description:
      "Storify is a storybook generator powered by generative art. Through any user prompt, an family-friendly AI story is created alongside a series of multiple choice comprehension questions. After, the story is brought to life in a picturebook-esque expereince through AI-generated images.",
    skills: "React, Typescript, Python, Gemini API, Stable Diffusion",
    roles: "",
    type: "Concept",
    thumbnail: `/images/storify/storify.png`,
    animated_thumbnail: "/images/storify/storify.mp4",
    demo_link: "",
    source_link: "",
    slug: "storify",
    tags: ["software dev"],
  },
} as const;

export const CREATIVE_METADATA = [
  {
    url: "artie_models.png",
    tags: ["3D"],
    title: "Artie Models",
  },
  {
    url: "resting_place.jpg",
    tags: ["3D"],
    title: "Resting Place",
  },
  {
    url: "beyond_the_wall.jpg",
    tags: ["3D"],
    title: "Beyond the Wall",
  },
  {
    url: "classroom_01.jpg",
    tags: ["3D"],
    title: "Classroom I",
  },
  {
    url: "classroom_02.jpg",
    tags: ["3D"],
    title: "Classroom II",
  },
  {
    url: "audio_visualizer_01.jpg",
    tags: ["3D"],
    title: "Audio Visualizer I",
  },
  {
    url: "audio_visualizer_02.jpg",
    tags: ["3D"],
    title: "Audio Visualizer II",
  },
  {
    url: "runtime_01.png",
    tags: ["3D"],
    title: "Runtime 01",
  },
  {
    url: "runtime_02.png",
    tags: ["3D"],
    title: "Runtime 02",
  },
  {
    url: "crimson_forest.jpg",
    tags: ["3D"],
    title: "Crimson Forest",
  },
  {
    url: "dmeter.jpeg",
    tags: ["3D"],
    title: "Steampunk Divergence Meter",
  },
  {
    url: "phonewave.jpeg",
    tags: ["3D"],
    title: "PhoneWave",
  },
  {
    url: "city_night_01.png",
    tags: ["3D"],
    title: "City at Night I",
  },
  {
    url: "city_night_02.png",
    tags: ["3D"],
    title: "City at Night II",
  },
  {
    url: "false_god_01.png",
    tags: ["3D"],
    title: "False God I",
  },
  {
    url: "false_god_02.png",
    tags: ["3D"],
    title: "False God II",
  },
  {
    url: "blue_moon.png",
    tags: ["3D"],
    title: "Blue Moon",
  },
  {
    url: "midsummer_dream.png",
    tags: ["3D"],
    title: "Midsummer Dream",
  },

  {
    url: "sand_dunes.png",
    tags: ["3D"],
    title: "Sand Dunes",
  },
  {
    url: "sand_dunes.png",
    tags: ["3D"],
    title: "Sand Dunes",
  },
  {
    url: "horn_brucke.jpg",
    tags: ["camera"],
    title: "Horn Brücke",
  },
  {
    url: "mallorca_sunset.png",
    tags: ["camera"],
    title: "Mallorca Sunset",
  },
  {
    url: "ramen.jpg",
    tags: ["camera"],
    title: "Ramen",
  },
  {
    url: "night_street.jpg",
    tags: ["camera"],
    title: "Night Street",
  },
  {
    url: "telephone_pole.jpg",
    tags: ["camera"],
    title: '"Do You Love Her?" Telephone',
  },
];

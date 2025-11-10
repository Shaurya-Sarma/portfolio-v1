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
  demo_link: string;
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
    demo_link: "https://penn.place/",
    slug: "penn-place",
    tags: ["software dev, computer graphics"],
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
    slug: "lattice-configurator",
    tags: ["software dev, computer graphics"],
  },
  chromesthesia: {
    title: "Chromesthesia VR",
    description:
      "An experimental (work-in-progress) VR project that translates sound into immersive visual experiences based on projective chromesthesia. Users can interact with objects in the VR space to produce sounds, which generate procedurally-created colored ripples with corresponding physical properties. This system aims to provide a perceptual experience inspired by projective chromesthesia inside an immersive virtual environment.",
    skills:
      "Unity, VR, C#, GLSL/HLSL, Shader Graph, Blender, Graphics Programming, Physics Simulation, Procedural Audio",
    roles: "",
    type: "Concept",
    thumbnail: "/images/chromesthesia-vr/chromesthesia-vr.png",
    animated_thumbnail: "/images/chromesthesia-vr/chromesthesia-vr.mp4",
    demo_link: "",
    slug: "chromesthesia",
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
    animated_thumbnail: "/images/rasterizer-shaders/rasterizer-shaders.mp4",
    demo_link: "",
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
    slug: "echo",
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
    slug: "storify",
    tags: ["software dev"],
  },
  resurrection: {
    title: "Resurrection",
    description:
      "A 2D action-platformer game inspired by some of my favorite games I played growing up like Dark Souls, Celeste, and The Legend of Zelda. Involved level design, game state management, AI-behavior for various types of enemies (including boss behavior with multiple phases), and exploration-puzzle features like keys + doors. Assets were mostly found from http://opengameart.org and the Unity Asset Store, however, a few were made from scratch.",
    skills: "Unity 2D, C#, Aesprite",
    roles: "",
    type: "Game Dev",
    thumbnail: "/images/resurrection/resurrection.png",
    animated_thumbnail: "/images/resurrection/resurrection.mp4",
    demo_link: "https://shaux.itch.io/resurrection",
    slug: "resurrection",
    tags: ["software dev"],
  },
  studyhungry: {
    title: "StudyHungry",
    description:
      "A productivity app designed specifically for students I was tutoring. Includes a pomodoro system, daily agenda list, curated videos targetting studying-related topics, customizable routines to design your own study sessions. The pomodoro system has two unique focus modes: one that forces you to flip your phone upside down to eliminate distrctions and a lockdown mode to keep you inside the app and resist the temptation to scroll or check social media.",
    skills: "React Native, Typescript",
    roles: "",
    type: "Mobile Dev",
    thumbnail: "/images/studyhungry/studyhungry.png",
    animated_thumbnail: "/images/studyhungry/studyhungry.png",
    demo_link: "",
    slug: "studyhungry",
    tags: ["software dev"],
  },
  tsp_problem: {
    title: "Traveling Salesperson Problem",
    description:
      "An interactive visualization of the Traveling Salesperson Problem using a genetic algorithm called Neuroevolution of Augmenting Topologies (NEAT). Users can tweak the number of cities and salespeople to watch the algorithm evolve optimized routes over generations, simulating natural selection, mutations, and inheritance. This project combines optimization, AI, and neural network evolution to solve a classic problem in a visually engaging way.",
    skills: "Javascript, p5.js",
    roles: "",
    type: "Web Experiment",
    thumbnail:
      "/images/traveling-salesperson-visualization/traveling-salesperson-visualization.png",
    animated_thumbnail:
      "/images/traveling-salesperson-visualization/traveling-salesperson-visualization.mp4",
    demo_link: "https://shaurya-sarma.github.io/traveling-sales-man-problem/",
    slug: "traveling-salesperson-visualization",
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
    url: "beyond_the_wall.jpg",
    tags: ["3D"],
    title: "Beyond the Wall",
  },
  {
    url: "blue_moon.png",
    tags: ["3D"],
    title: "Blue Moon",
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
    url: "crimson_forest.jpg",
    tags: ["3D"],
    title: "Crimson Forest",
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
    url: "midsummer_dream.png",
    tags: ["3D"],
    title: "Midsummer Dream",
  },
  {
    url: "resting_place.jpg",
    tags: ["3D"],
    title: "Resting Place",
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

// HomePage.tsx
export const HOME_TITLE = "Hey, I'm Shaurya Sarma";
export const HOME_BIO1 =
  "I'm a student at the University of Pennsylvania, where I study computer graphics and computer science.";
export const HOME_BIO2 =
  "Creative coding meets immersive digital experiences — that's my sweet spot. I'm passionate about combining technology and art, exploring areas like mixed reality, 3D graphics, and interactive experiences.";

// NavigationBar.tsx
export const NAVIGATION_HOME_LABEL = "Home";
export const NAVIGATION_WORK_LABEL = "My Work";
export const NAVIGATION_CONTACT_LABEL = "Contact Me";

// ProjectsPage.tsx

export const PROJECT_FILTER_HEADERS = [
  "Software Dev",
  "Computer Graphics",
  "3d Renders",
];

export type ProjectKey = keyof typeof PROJECT_METADATA;

export type Project = {
  title: string;
  description: string;
  skills: string;
  type: string;
  thumbnail: string;
  animated_thumbnail: string;
  demo_link: string;
  slug: string;
};
export type ProjectTileProps = {
  project: Project;
};

export const PROJECT_METADATA = {
  penn_place: {
    title: "Penn Place",
    description:
      "Penn Place is a collaborative digital art experiment created over an eight-week span, inviting users to design 3D art in a shared voxel grid. Inspired by Reddit's r/place, this platform allows participants to place colored voxels (blocks) in a 3D space, shaping a dynamic digital canvas in real time.",
    skills: "React, Three.js, Typescript, MongoDB, Redis, AWS",
    type: "Web Experience",
    thumbnail: "images/penn-place/penn_place.png",
    animated_thumbnail: "images/penn-place/penn_place.gif",
    demo_link: "https://penn.place/",
    slug: "penn-place",
  },
  storify: {
    title: "Storify",
    description:
      "Storify is a storybook generator powered by generative art. Through any user prompt, an family-friendly AI story is created alongside a series of multiple choice comprehension questions. After, the story is brought to life in a picturebook-esque expereince through AI-generated images.",
    skills: "React, Typescript, Python, Gemini API, Stable Diffusion",
    type: "Web Experience",
    thumbnail: "images/storify/storify.png",
    animated_thumbnail: "images/storify/storify.gif",
    demo_link: "",
    slug: "storify",
  },
} as const;

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
  "3d rendering",
];

export type ProjectKey = keyof typeof PROJECT_INFO;
export type Project = {
  title: string;
  description: string;
  skills: string;
  type: string;
  thumbnail: string;
  animated_thumbnail: string;
  demo_link: string;
};
export type ProjectTileProps = {
  project: Project;
};

export const PROJECT_INFO = {
  penn_place: {
    title: "Penn Place",
    description:
      "Penn Place is a collaborative digital art experiment created over an eight-week span, inviting users to design 3D art in a shared voxel grid. Inspired by Reddit's r/place, this platform allows participants to place colored voxels (blocks) in a 3D space, shaping a dynamic digital canvas in real time.",
    skills: "React, Three.js, Typescript, Python, MongoDB",
    type: "Web Experience",
    thumbnail: "penn_place.png",
    animated_thumbnail: "penn_place.gif",
    demo_link: "https://penn.place/",
  },
} as const;

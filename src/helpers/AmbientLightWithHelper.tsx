import { useControls } from "leva";

function AmbientLightWithHelper() {
  const { color, intensity } = useControls({
    color: "#fff",
    intensity: {
      value: 4,
      min: 0.0,
      max: 10.0,
      step: 0.001,
    },
  });

  return <ambientLight intensity={intensity} color={`#ffffff`} />;
}

export default AmbientLightWithHelper;

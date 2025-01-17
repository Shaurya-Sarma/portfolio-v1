import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

function RamenModel() {
  const model = useLoader(GLTFLoader, "/models/ramen.gltf");
  return (
    <primitive
      object={model.scene}
      position={[0.1, -0.25, 0]}
      rotation={[Math.PI / 5, 0, 0]}
      scale={2.75}
    />
  );
}

export default RamenModel;

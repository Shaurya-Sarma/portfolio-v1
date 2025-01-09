import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

function RamenModel() {
  const model = useLoader(GLTFLoader, "/ramen.gltf");
  return (
    <primitive
      object={model.scene}
      position={[0, -0.25, 0]}
      rotation={[Math.PI / 5, 0, 0]}
      scale={2.25}
    />
  );
}

export default RamenModel;

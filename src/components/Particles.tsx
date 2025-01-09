import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute } from "three";
import * as THREE from "three";

function Particles(props: { smallCount: number; bigCount: number }) {
  // load textures
  const loader = new THREE.TextureLoader();
  const circle = loader.load("circle.png");

  // create point geometry with random position, rotation speed, shake intensity
  const smallParticlesGeometry = useMemo(() => {
    const positions = [];
    const rotationSpeeds = [];
    const shakeIntensities = [];

    for (let i = 0; i < props.smallCount; i++) {
      // generate random positions
      positions.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );

      // generate random z-axis rotation speed
      rotationSpeeds.push(Math.abs((Math.random() - 0.5) * 0.01)); // counterclockwise

      // generate random shake intensity
      shakeIntensities.push((Math.random() - 0.5) * 0.1);
    }

    // assign attributes to geometry
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.setAttribute(
      "rotationSpeed",
      new Float32BufferAttribute(rotationSpeeds, 1)
    );
    geometry.setAttribute(
      "shakeIntensity",
      new Float32BufferAttribute(shakeIntensities, 1)
    );

    return geometry;
  }, [props.smallCount]);

  const smallParticlesMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.005,
        map: circle,
        transparent: true,
        color: "black",
        // blending: THREE.AdditiveBlending,
      }),
    []
  );

  // create point geometry with random position, fall speed, size
  const largeParticlesGeometry = useMemo(() => {
    const positions = [];
    const fallSpeed = [];

    for (let i = 0; i < props.bigCount; i++) {
      // generate random positions
      positions.push(
        (Math.random() - 5) * 10,
        (Math.random() + 1) * 10,
        (Math.random() - 0.5) * 1
      );

      // generate random fall speed
      fallSpeed.push(Math.random() + 0.5);
    }

    // assign attributes to geometry
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.setAttribute(
      "fallSpeed",
      new Float32BufferAttribute(fallSpeed, 1)
    );

    return geometry;
  }, [props.bigCount]);

  const largeParticlesMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.025 + Math.random() * 0.015,
        map: circle,
        transparent: true,
        color: "black",
        // blending: THREE.AdditiveBlending,
      }),
    []
  );

  // render loop
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    animateSmallParticles(time);
    animateLargeParticles(time);
  });

  const animateSmallParticles = (time: number) => {
    smallParticlesGeometry.rotateZ(0.00025);

    // // animate small background particles in spiral motion with slight shake
    // const positions = smallParticlesGeometry.attributes.position.array;
    // const rotationSpeeds =
    //   smallParticlesGeometry.attributes.rotationSpeed.array;
    // const shakeIntensities =
    //   smallParticlesGeometry.attributes.shakeIntensity.array;
    // // apply individual rotation to each particle
    // for (let i = 0; i < props.smallCount; i++) {
    //   const speed = rotationSpeeds[i];
    //   const shakeIntensity = shakeIntensities[i];
    //   const angle = (speed * Math.random() + 0.001) * 0.1;
    //   // rotate each particle around the z-axis
    //   const x = positions[i * 3];
    //   const y = positions[i * 3 + 1];
    //   // apply shake effect (small oscillation along x-axis)
    //   const shake = shakeIntensity * Math.sin(time * 5 + i) * 0.01; // multiply by a small factor to control shake speed
    //   // update position based on rotation and shake
    //   positions[i * 3] = x * Math.cos(angle) - y * Math.sin(angle) + shake; // Apply shake to x-axis
    //   positions[i * 3 + 1] = x * Math.sin(angle) + y * Math.cos(angle);
    // }
    // // update the geometry positions after the rotation
    // smallParticlesGeometry.attributes.position.needsUpdate = true;
    // const factor = 1.0001;
    // smallParticlesGeometry.scale(factor, factor, factor);
  };

  const animateLargeParticles = (time: number) => {
    // Access the position and fallSpeed attributes
    const positions = largeParticlesGeometry.attributes.position.array;
    const fallSpeeds = largeParticlesGeometry.attributes.fallSpeed.array;

    // Set direction vectors for falling motion
    const fallDirection = new THREE.Vector3(1, -1, 0); // Adjust this for the desired direction
    fallDirection.normalize(); // Normalize to ensure consistent speed

    for (let i = 0; i < props.bigCount; i++) {
      const fallSpeed = fallSpeeds[i] * 0.0025; // Adjust speed factor if needed

      // Update positions based on fallDirection
      positions[i * 3] += fallSpeed * fallDirection.x; // Update X
      positions[i * 3 + 1] += fallSpeed * fallDirection.y; // Update Y
      positions[i * 3 + 2] += fallSpeed * fallDirection.z; // Update Z

      // Boundary check to reset positions
      if (
        positions[i * 3] < -20 || // Left boundary
        positions[i * 3] > 10 || // Right boundary
        positions[i * 3 + 1] < -5 || // Bottom boundary
        positions[i * 3 + 2] < -10 || // Near boundary
        positions[i * 3 + 2] > 10 // Far boundary
      ) {
        positions[i * 3] = (Math.random() - 1) * 10; // Reset to random X
        positions[i * 3 + 1] = (Math.random() + 0.25) * 10; // Reset to random Y above the screen
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5; // Reset to random Z
      }
    }

    // Mark the geometry as needing an update
    largeParticlesGeometry.attributes.position.needsUpdate = true;
  };

  return (
    <group>
      <points
        geometry={smallParticlesGeometry}
        material={smallParticlesMaterial}
      />
      <points
        geometry={largeParticlesGeometry}
        material={largeParticlesMaterial}
      />
    </group>
  );
}

export default Particles;

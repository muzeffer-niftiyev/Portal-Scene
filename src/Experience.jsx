import {
  Center,
  useGLTF,
  Sparkles,
  useTexture,
  OrbitControls,
  shaderMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#A2FF89"),
    uColorEnd: new THREE.Color("#333"),
  },
  portalVertexShader,
  portalFragmentShader
);
extend({ PortalMaterial });

const Experience = () => {
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedTexture = useTexture("./model/bake.jpg");
  bakedTexture.flipY = false;
  const poleLightA = nodes.PoleLightA;
  const poleLightB = nodes.PoleLightB;
  const portal = nodes.PortalLight;

  const portalMaterial = useRef();

  useFrame((_, delta) => {
    portalMaterial.current.uTime += delta;
  });

  return (
    <>
      <color args={["#160f0f"]} attach={"background"} />
      <OrbitControls
        makeDefault
        rotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        maxDistance={Math.PI * 3}
        minDistance={Math.PI * 1.5}
      />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh geometry={poleLightA.geometry}>
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh geometry={poleLightB.geometry}>
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh geometry={portal.geometry} rotation={portal.rotation}>
          <portalMaterial ref={portalMaterial} side={THREE.DoubleSide} />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1.2}
          speed={0.4}
          count={50}
        />
      </Center>
    </>
  );
};

export default Experience;

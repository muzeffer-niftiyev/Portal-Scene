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

  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta;
  });

  return (
    <>
      <color args={["#110c0c"]} attach={"background"} />
      <OrbitControls makeDefault />

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
          <portalMaterial ref={portalMaterial} />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.3}
          count={50}
        />
      </Center>
    </>
  );
};

export default Experience;

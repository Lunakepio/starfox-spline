import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  HueSaturation,
  BrightnessContrast,
} from "@react-three/postprocessing";

import { Model } from "./Arwinghigh";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  Billboard,
  Environment,
  Loader,
  PerspectiveCamera,
  Stats,
  Trail,
} from "@react-three/drei";
import { Fighter } from "./Fighter";
import { Garuda } from "./Garuda";
import { Tank } from "./Tank";
import { Env } from "./FoxEnv";
import { useSpline } from "./useSpline";

function Scene() {
  let progress = 0;

  function SphereParticles() {
    const ref = React.useRef();

    // Define the particle system's geometry and material
    const geometry = new THREE.PlaneGeometry(1000, 1000, 250, 250);
    const material = new THREE.PointsMaterial({
      size: 0.1,
      color: "#ffffff",
    });

    const positions = new Float32Array(
      geometry.attributes.position.array.length
    );
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = geometry.attributes.position.array[i];
      positions[i + 1] = geometry.attributes.position.array[i + 1];
      positions[i + 2] = geometry.attributes.position.array[i + 2];
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return (
      <points
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -7, 0]}
        ref={ref}
        geometry={geometry}
        material={material}
      />
    );
  }

  function Projectile({ position, rotation, forwardVector }) {
    const ref = React.useRef();
    const meshRef = React.useRef();
    const geometryRef = React.useRef();
    const [shouldRemove, setShouldRemove] = React.useState(false);
    const realPosition = position
      .clone()
      .add(forwardVector.clone().multiplyScalar(-2));
    let frameCount = 0;
    useFrame(() => {
      frameCount++;
      if (!shouldRemove && frameCount < 15) {
        ref.current.applyImpulse(forwardVector.clone().multiplyScalar(-0.4));
      }
    });

    return (
      <>
        {shouldRemove ? null : (
          <RigidBody
            ref={ref}
            gravityScale={0}
            type="Dynamic"
            position={realPosition}
            rotation={rotation}
            name={"projectile"}
            restitution={0}
            onCollisionEnter={(otherObject) => {
              setShouldRemove(true);
            }}
          >
            <mesh ref={meshRef}>
              <boxGeometry args={[0.2, 0.2, 1]} ref={geometryRef} />
              <meshStandardMaterial
                emissive="green"
                emissiveIntensity={10}
                toneMapped={false}
                position={realPosition}
                rotation={rotation}
              />
            </mesh>
          </RigidBody>
        )}
      </>
    );
  }

  function Arwing() {
    const boxRef = React.useRef();
    const arwingRef = React.useRef();
    const arwingBody = React.useRef();
    const lookAtTarget = React.useRef();
    const meshRef = React.useRef();
    const [projectiles, setProjectiles] = React.useState([]);
    let distance = 5;
    const [lastShotTime, setLastShotTime] = React.useState(0);
    // const [MousePressed, setMousePressed] = React.useState(false);
    const [inputState, setInputState] = React.useState({
      space: false,
      mousePressed: false,
    });
    const [trailValues, setTrailValues] = React.useState({
      width: 0.2,
      color: "#ffffff",
      transparent: true,
      length: 5 ,
      decay: 1,
      local: false,
      stride: 0,
      interval: 1,
      target: undefined,
      attenuation: (width) => width,
      fade: (width) => width,
    });

    // const [space, setSpace] = React.useState(false);
    const { viewport } = useThree();
    // let speed = 0.05;

    const [shotsFired, setShotsFired] = React.useState(0);
    // let cameraDistance = 4;
    const [speed, setSpeed] = React.useState(0.1);
    const [cameraDistance, setCameraDistance] = React.useState(8);

    const { space, mousePressed } = inputState;
    const { points, loading, error } = useSpline("foxCurve.json");
    const [speedFactor, setSpeedFactor] = React.useState(1);
    const [pointest, setPointest] = React.useState([]);
    const [currentPoint, setCurrentPoint] = React.useState(0);
    React.useEffect(() => {
      if (points) {
        setPointest(points);
        setCurrentPoint(points.length - 1);
      }
    }, [points]);

    const cam = React.useRef();
    const test = React.useRef();
    useFrame(({ pointer, clock }, delta) => {
      const camera = cam.current;
      const currentTime = clock.getElapsedTime();
      // boxRef.current.rotation.z -= 0.05;

      if (
        mousePressed &&
        currentTime - lastShotTime > 0.125 &&
        shotsFired < 3
      ) {
        // if (mousePressed && currentTime - lastShotTime > 0.15 ) {

        handleMouse();
        setShotsFired(shotsFired + 1);
        if (shotsFired === 3) {
          setTimeout(() => {
            setShotsFired(0);
          }, 10000);
        }
        setLastShotTime(currentTime);
      }

      if (!mousePressed) {
        setShotsFired(0);
      }

      if(space){
        setSpeedFactor(2);
      } else {
        setSpeedFactor(1);
      }

      const offset = new THREE.Vector3(0, 0, distance).applyQuaternion(
        arwingRef.current.quaternion
      );

      const distanceX = boxRef.current.position.x + test.current.position.x;
      const angleX = Math.atan2(distanceX, distance);
      const distanceY = boxRef.current.position.y - test.current.position.y;
      const angleY = Math.atan2(distanceY, distance);
      
      
      boxRef.current.position.x = pointer.x * viewport.width * 0.1;
      boxRef.current.position.y = pointer.y * viewport.height * 0.1;
      if (currentPoint < pointest.length - 1) {
        arwingRef.current.position.lerp(
          pointest[currentPoint],
          delta * speedFactor
        );
        lookAtTarget.current.position.lerp(
          pointest[currentPoint + 1],
          delta * speedFactor
        );
        arwingRef.current.lookAt(lookAtTarget.current.position);
        if (arwingRef.current.position.distanceTo(pointest[currentPoint]) < 5) {
          setCurrentPoint(currentPoint + 1);
        }
      } else {
        setCurrentPoint(0);
      }
      camera.rotation.y = Math.PI;
      if (test.current.position.x != -boxRef.current.position.x) {
        test.current.position.x -=
          ((boxRef.current.position.x + test.current.position.x) / 10) * 0.1;
      }
      if (test.current.position.y != boxRef.current.position.y) {
        test.current.position.y +=
          ((boxRef.current.position.y - test.current.position.y) / 10) * 0.1;
      }
      test.current.rotation.z = Math.sin(clock.getElapsedTime() * 2) * 0.1 + angleX + Math.PI;
      test.current.rotation.x = -angleY;

    });

    // const camera = useThree(({ camera }) => camera);
    // camera.position.z = 5;

    function handleMouse() {
      const currentTime = performance.now();
      const shotDelay = 150; // Delay in milliseconds

      if (!test.current) return;

      const projectilePosition = test.current.position.clone();
      const projectileRotation = test.current.rotation.clone();
      const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(
        test.current.quaternion
      );
      setProjectiles((prev) => [
        ...prev,
        {
          position: projectilePosition,
          rotation: projectileRotation,
          forwardVector: forwardVector,
        },
      ]);

      setLastShotTime(currentTime);
    }

    React.useEffect(() => {
      const handleMouseDown = (e) => {
        setInputState((prevState) => ({ ...prevState, mousePressed: true }));
      };

      const handleMouseUp = (e) => {
        setInputState((prevState) => ({ ...prevState, mousePressed: false }));
      };

      const handleSpaceBarDown = (e) => {
        if (e.key === " ") {
          setInputState((prevState) => ({ ...prevState, space: true }));
        }
      };

      const handleSpaceBarUp = (e) => {
        if (e.key === " ") {
          setInputState((prevState) => ({ ...prevState, space: false }));
        }
      };

      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("keydown", handleSpaceBarDown);
      window.addEventListener("keyup", handleSpaceBarUp);

      return () => {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("keydown", handleSpaceBarDown);
        window.removeEventListener("keyup", handleSpaceBarUp);
      };
    }, []);

    return (
      <>
        <group>
          <mesh ref={lookAtTarget}></mesh>

          {projectiles.map((projectile, index) => (
            <Projectile
              position={projectile.position}
              rotation={projectile.rotation}
              forwardVector={projectile.forwardVector}
              key={index}
            />
          ))}

          <group
            ref={arwingRef}
            rotation={[0, Math.PI, 0]}
            position={[
              -75.46141815185547, 12.538070678710938, -40.60304260253906,
            ]}
          >
            <Billboard>
              <mesh ref={boxRef} position={[0, 0, -10]}>
              </mesh>
            </Billboard>
            <mesh ref={test} rotation={[0, 0, Math.PI]}>
              
              <Model />
              
              <Trail {...trailValues}>
                <mesh position={[1, 0.18, -1]} />
              </Trail>
              <Trail {...trailValues}>
                <mesh position={[-1, 0.18, -1]} />
              </Trail>
            </mesh>

            <PerspectiveCamera ref={cam} makeDefault position={[0, 0, -8]} />
          </group>
        </group>
      </>
    );
  }

  return (
    <>
      <Canvas
        // shadows
        gl={{
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#73b7fb"]} />
        <React.Suspense fallback={null}>
          <Physics>
            <ambientLight />
            <directionalLight
              castShadow
              position={[2.5, 8, 5]}
              shadow-mapSize={[1024, 1024]}
            >
              <orthographicCamera
                attach="shadow-camera"
                args={[-10, 10, 10, -10]}
              />
            </directionalLight>
            <Arwing />
            <Env scale={1} />
            <Environment preset="sunset" />
            <SphereParticles />
            {/* <fog attach="fog" args={["#73b7fb", 0, 70]} /> */}
          </Physics>
          <EffectComposer>
            <Bloom
              luminanceThreshold={1}
              intensity={1.25}
              levels={9}
              mipmapBlur
            />
            <BrightnessContrast brightness={0} contrast={0.1} />
            <HueSaturation hue={0} saturation={-0.25} />
          </EffectComposer>
        </React.Suspense>
        <Stats />
      </Canvas>
      <Loader />
    </>
  );
}

export default Scene;

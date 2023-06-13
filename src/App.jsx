import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, HueSaturation, BrightnessContrast } from "@react-three/postprocessing";

import { Model } from "./Arwinghigh";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Loader, Stats } from "@react-three/drei";
import { Fighter } from "./Fighter";
import { Garuda } from "./Garuda";
import { Tank } from "./Tank";

function Scene() {
  let progress = 0;

  function AirCarrier({ position, rotation, direction }) {
    const ref = React.useRef();
    const [shouldRemove, setShouldRemove] = React.useState(false);
    let framecount = 0;
    let health = 2;
    useFrame(() => {
      framecount++;
      if (!shouldRemove && framecount < 100) {
        ref.current.applyImpulse(
          new THREE.Vector3(direction[0], direction[1], direction[2]),
          ref.current.position
        );
      }
    });

    return (
      <>
        {shouldRemove ? null : (
          <RigidBody
            gravityScale={0}
            colliders="hull"
            position={position}
            rotation={rotation ? rotation : [0, 0, 0]}
            ref={ref}
            onCollisionEnter={(event) => {
              health -= 1;
              if (health <= 0) {
                setShouldRemove(true);
              }
            }}
          >
            <Fighter />
          </RigidBody>
        )}
      </>
    );
  }

  function GroundTank({ position, rotation, direction }) {
    const ref = React.useRef();
    const [shouldRemove, setShouldRemove] = React.useState(false);
    let framecount = 0;
    let health = 2;
    useFrame(() => {
      framecount++;
      if (!shouldRemove && framecount < 100) {
        ref.current.applyImpulse(
          new THREE.Vector3(direction[0], direction[1], direction[2]),
          ref.current.position
        );
      }
    });

    return (
      <>
        {shouldRemove ? null : (
          <RigidBody
            gravityScale={1}
            colliders="hull"
            position={position}
            rotation={rotation ? rotation : [0, 0, 0]}
            ref={ref}
            friction={0}
            onCollisionEnter={(event) => {
              if (event.colliderObject.name == "projectile") {
                console.log("hit");
                health -= 1;
              }
              if (health <= 0) {
                setShouldRemove(true);
              }
            }}
          >
            <Tank />
          </RigidBody>
        )}
      </>
    );
  }

  function GroundGaruda({ position, rotation, direction }) {
    const ref = React.useRef();
    const [shouldRemove, setShouldRemove] = React.useState(false);
    let framecount = 0;
    let health = 25;
    useFrame(({ clock }) => {
      framecount++;
      if (!shouldRemove) {
        ref.current.applyImpulse(
          new THREE.Vector3(
            Math.sin(clock.getElapsedTime() * 3) * direction[0] * 2,
            direction[1],
            direction[2]
          ),
          ref.current.position
        );
      }
    });

    return (
      <>
        {shouldRemove ? null : (
          <RigidBody
            colliders="hull"
            position={position}
            rotation={rotation ? rotation : [0, 0, 0]}
            ref={ref}
            gravityScale={0}
            restitution={0}
            friction={0}
            onCollisionEnter={(event) => {
              if (event.colliderObject.name == "projectile") {
                console.log("hit");
                health -= 1;
              }
              if (health <= 0) {
                setShouldRemove(true);
              }
            }}
          >
            <Garuda />
          </RigidBody>
        )}
      </>
    );
  }

  function Wave1() {
    const triggerPoint = -25;
    const [spawn, setSpawn] = React.useState(false);
    useFrame(() => {
      if (progress < triggerPoint) {
        setSpawn(true);
      }
    });

    return (
      <>
        {!spawn ? null : (
          <group>
            <AirCarrier
              position={[30, 3, -65]}
              rotation={[0, Math.PI / 2, 0]}
              direction={[-2, 0, 0]}
            />
            <AirCarrier
              position={[35, 5, -55]}
              rotation={[0, Math.PI / 2, 0]}
              direction={[-2, 0, 0]}
            />
            <AirCarrier
              position={[-25, 7, -75]}
              rotation={[0, Math.PI / 2, 0]}
              direction={[2, 0, 0]}
            />
          </group>
        )}
      </>
    );
  }

  function Wave2() {
    const triggerPoint = -60;
    const [spawn, setSpawn] = React.useState(false);
    useFrame(() => {
      if (progress < triggerPoint) {
        setSpawn(true);
      }
    });

    return (
      <>
        {!spawn ? null : (
          <group>
            <AirCarrier
              position={[5, 3, -110]}
              rotation={[0, 0, 0]}
              direction={[0, 0, 1]}
            />
            <AirCarrier
              position={[7, 5, -135]}
              rotation={[0, 0, 0]}
              direction={[0, 0, 1]}
            />
            <AirCarrier
              position={[-7, 7, -120]}
              rotation={[0, 0, 0]}
              direction={[0, 0, 1]}
            />
          </group>
        )}
      </>
    );
  }

  function Wave3() {
    const triggerPoint = -110;
    const [spawn, setSpawn] = React.useState(false);
    useFrame(() => {
      if (progress < triggerPoint) {
        setSpawn(true);
      }
    });

    return (
      <>
        {!spawn ? null : (
          <group>
            <AirCarrier
              position={[5, -1, -90]}
              rotation={[0, 0, 0]}
              direction={[0, 0, -6]}
            />
            <AirCarrier
              position={[-6, -2, -80]}
              rotation={[0, 0, 0]}
              direction={[0, 0, -6]}
            />
          </group>
        )}
      </>
    );
  }

  function Wave4() {
    const triggerPoint = -140;
    const [spawn, setSpawn] = React.useState(false);
    useFrame(() => {
      if (progress < triggerPoint) {
        setSpawn(true);
      }
    });

    return (
      <>
        {!spawn ? null : (
          <group>
            <AirCarrier
              position={[45, 3, -170]}
              rotation={[0, 0, 0]}
              direction={[-7, 0, 0]}
            />
          </group>
        )}
      </>
    );
  }

  function Wave5() {
    const triggerPoint = -170;
    const [spawn, setSpawn] = React.useState(false);
    useFrame(() => {
      if (progress < triggerPoint) {
        setSpawn(true);
      }
    });

    return (
      <>
        {!spawn ? null : (
          <group>
            <GroundGaruda
              position={[0, -7, -200]}
              rotation={[0, 0, 0]}
              direction={[10, 0, -4]}
            />
          </group>
        )}
      </>
    );
  }

  function Wave6() {
    const triggerPoint = -200;
    const [spawn, setSpawn] = React.useState(false);
    useFrame(() => {
      if (progress < triggerPoint) {
        setSpawn(true);
      }
    });

    return (
      <>
        {!spawn ? null : (
          <group>
            <GroundTank
              position={[0, -7, -230]}
              rotation={[0, 0, 0]}
              direction={[0, 0, -0.9]}
            />
            <GroundTank
              position={[-3, -7, -235]}
              rotation={[0, 0, 0]}
              direction={[0, 0, -0.9]}
            />
            <GroundTank
              position={[3, -7, -235]}
              rotation={[0, 0, 0]}
              direction={[0, 0, -0.9]}
            />
            <GroundTank
              position={[-6, -7, -240]}
              rotation={[0, 0, 0]}
              direction={[0, 0, -0.9]}
            />
            <GroundTank
              position={[6, -7, -240]}
              rotation={[0, 0, 0]}
              direction={[0, 0, -0.9]}
            />
          </group>
        )}
      </>
    );
  }

  function Wave7() {
    const triggerPoint = -280;
    const [spawn, setSpawn] = React.useState(false);
    useFrame(() => {
      if (progress < triggerPoint) {
        setSpawn(true);
      }
    });

    return (
      <>
        {!spawn ? null : (
          <group>
            <GroundTank
              position={[9, -7, -310]}
              rotation={[0, 0, 0]}
              direction={[0, 0, -0.8]}
            />
            <GroundTank
              position={[-9, -7, -310]}
              rotation={[0, 0, 0]}
              direction={[0, 0, -0.8]}
            />
            <GroundGaruda
              position={[0, -7, -320]}
              rotation={[0, 0, 0]}
              direction={[0, 0, -0.8]}
            />
          </group>
        )}
      </>
    );
  }

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
  function Cylinders(props) {
    const numberOfCylinders = 30; // Replace this with the desired number of cylinder pairs
    const cylinders = [];

    for (let i = 0; i < numberOfCylinders; i++) {
      const zPosition = i * 40;

      cylinders.push(
        <mesh key={`cylinder-right-${i}`} position={[20, 0, -zPosition]}>
          <cylinderGeometry args={[3, 3, 30, 8]} />
          <meshStandardMaterial color="gray" />
        </mesh>,
        <mesh key={`cylinder-left-${i}`} position={[-20, 0, -zPosition]}>
          <cylinderGeometry args={[3, 3, 30, 8]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      );
    }

    return (
      <group {...props} position={[0, -7, -30]}>
        {cylinders}
      </group>
    );
  }

  function Arwing() {
    const boxRef = React.useRef();
    const arwingRef = React.useRef();
    const arwingBody = React.useRef();
    const secondBoxRef = React.useRef();
    const meshRef = React.useRef();
    const [projectiles, setProjectiles] = React.useState([]);
    let distance = 5;
    const [lastShotTime, setLastShotTime] = React.useState(0);
    // const [MousePressed, setMousePressed] = React.useState(false);
    const [inputState, setInputState] = React.useState({
      space: false,
      mousePressed: false,
    });

    // const [space, setSpace] = React.useState(false);
    const { viewport } = useThree();
    // let speed = 0.05;
    const { camera } = useThree();
    const [shotsFired, setShotsFired] = React.useState(0);
    camera.fov = 35;
    // let cameraDistance = 4;
    const [speed, setSpeed] = React.useState(0.1);
    const [cameraDistance, setCameraDistance] = React.useState(4);

    const { space, mousePressed } = inputState;

    useFrame(({ mouse, clock }) => {
      const currentTime = clock.getElapsedTime();
      // boxRef.current.rotation.z -= 0.05;
      if (space) {
        if (speed < 0.15) {
          setSpeed((prevSpeed) => prevSpeed + 0.01);
          setCameraDistance((prevCameraDistance) => prevCameraDistance + 0.3);
        }
      } else {
        if (speed > 0.1) {
          setSpeed((prevSpeed) => prevSpeed - 0.01);
        }
        if (cameraDistance > 4) {
          setCameraDistance((prevCameraDistance) => prevCameraDistance - 0.1);
        }
      }

      // if(MousePressed){
      //   handleMouse();
      // }

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
      camera.position.z = arwingRef.current.position.z + cameraDistance;
      camera.position.x = arwingRef.current.position.x * 0.6;
      camera.position.y = arwingRef.current.position.y * 0.6;
      camera.rotation.x = arwingRef.current.position.y * 0.02;
      camera.rotation.y = -arwingRef.current.position.x * 0.02;
      camera.rotation.z = -arwingRef.current.position.x * 0.01;
      boxRef.current.rotation.set(0, 0, 0);
      boxRef.current.position.z -= speed;
      boxRef.current.position.x = mouse.x * viewport.width * 1.5;
      boxRef.current.position.y = mouse.y * viewport.height * 1.5;
      progress = boxRef.current.position.z;
      const boxPosition = new THREE.Vector3();
      boxPosition.setFromMatrixPosition(boxRef.current.matrixWorld);
      const offset = new THREE.Vector3(0, 0, distance).applyQuaternion(
        arwingRef.current.quaternion
      );
      arwingRef.current.lookAt(boxPosition);
      secondBoxRef.current.position.copy(
        arwingRef.current.position.clone().add(offset)
      );
      const distanceX = boxPosition.x - arwingRef.current.position.x;

      // Calculer l'angle entre les deux points en radians
      const angle = Math.atan2(distanceX, distance);
      // Définir la rotation de l'arwing autour de l'axe Z en fonction de l'angle
      arwingRef.current.rotation.z =
        Math.sin(clock.getElapsedTime() * 2) * 0.1 + angle;

      if (arwingRef.current.position.x != boxPosition.x) {
        arwingRef.current.position.x +=
          ((boxPosition.x - arwingRef.current.position.x) / 10) * 0.3;
      }
      if (arwingRef.current.position.y != boxPosition.y) {
        arwingRef.current.position.y +=
          ((boxPosition.y - arwingRef.current.position.y) / 10) * 0.3;
      }
      if (arwingRef.current.position.z != boxPosition.z) {
        arwingRef.current.position.z +=
          ((boxPosition.z - arwingRef.current.position.z) / 10) * speed;
      }
    });

    // const camera = useThree(({ camera }) => camera);
    // camera.position.z = 5;

    function handleMouse() {
      const currentTime = performance.now();
      const shotDelay = 150; // Delay in milliseconds

      if (!arwingRef.current) return;

      const projectilePosition = arwingRef.current.position.clone();
      const projectileRotation = arwingRef.current.rotation.clone();
      const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(
        arwingRef.current.quaternion
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
          <mesh
            ref={boxRef}
            position={[0, 0, -10]}
            rotation={[0, Math.PI, Math.PI / 4]}
          >
            {/* <torusGeometry args={[0.3, 0.02, 2, 4]} />
            <meshBasicMaterial color="#00FF00"  /> */}
          </mesh>

          <mesh
            ref={secondBoxRef}
            position={[0, 0, -20]}
            rotation={[0, Math.PI, Math.PI / 4]}
          >
            {/* <torusGeometry args={[0.3, 0.02, 2, 4]} />
            <meshBasicMaterial color="#00FF00"  /> */}
          </mesh>

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
            position={[0, 0, 0]}
          >
            <Model />
          </group>
        </group>
      </>
    );
  }

  function Corneria() {
    return (
      <group>
        <mesh position={[0, -7, -50]}>
          <torusGeometry args={[2.5, 0.2, 2, 64]} />

          <meshStandardMaterial color={[0.15, 0.15, 0.15]} />
        </mesh>

        <mesh position={[5, -7, -70]}>
          <torusGeometry args={[2.5, 0.2, 2, 16]} />

          <meshStandardMaterial color="gray" />
        </mesh>
        <mesh position={[-5, -7, -90]}>
          <torusGeometry args={[2.5, 0.2, 2, 16]} />

          <meshStandardMaterial color="gray" />
        </mesh>

        <mesh position={[0, -7, -110]}>
          <torusGeometry args={[2.5, 0.2, 2, 16]} />

          <meshStandardMaterial color="gray" />
        </mesh>
      </group>
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
            </directionalLight>{" "}
            <Arwing />
            <Cylinders />
            <Corneria />
            <RigidBody type="fixed" restitution={0} friction={0}>
              <mesh
                receiveShadow={true}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -7, 0]}
              >
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color="#33764d" />
              </mesh>
            </RigidBody>
            <Wave1 />
            <Wave2 />
            <Wave3 />
            <Wave4 />
            <Wave5 />
            <Wave6 />
            <Wave7 />
            <SphereParticles />
            <fog attach="fog" args={["#73b7fb", 0, 70]} />
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

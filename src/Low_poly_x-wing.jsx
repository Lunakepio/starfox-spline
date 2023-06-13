/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 low_poly_x-wing.glb
Author: felipelunardelli (https://sketchfab.com/felipelunardelli)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/low-poly-x-wing-9eb1841d367d431cbf1c17f7b29c546c
Title: Low Poly X-Wing
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function XWing(props) {
  const { nodes, materials } = useGLTF('/low_poly_x-wing.glb')
  return (
    <group {...props} dispose={null} scale={0.4} rotation={[0,0,Math.PI]}>
      <group position={[0, 0, 0.1]}>
        <group position={[0, -0.12, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_24.geometry} material={materials.Corpo} />
          <mesh geometry={nodes.Object_25.geometry} material={materials.Corpo_Escuro} />
        </group>
        <group position={[0, -0.12, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_29.geometry} material={materials.Corpo_Escuro} />
          <mesh geometry={nodes.Object_30.geometry} material={materials.Corpo} />
        </group>
        <group position={[0, -0.12, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_34.geometry} material={materials.Corpo_Escuro} />
          <mesh geometry={nodes.Object_35.geometry} material={materials.Vermelho} />
        </group>
        <group position={[0, -0.12, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_37.geometry} material={materials.Corpo} />
          <mesh geometry={nodes.Object_38.geometry} material={materials.Corpo_Escuro} />
          <mesh geometry={nodes.Object_39.geometry} material={materials.Material} />
          <mesh geometry={nodes.Object_40.geometry} material={materials.Corpo_Muito_Escuro} />
          <mesh geometry={nodes.Object_41.geometry} material={materials.Vermelho} />
        </group>
        <mesh geometry={nodes.Object_27.geometry} material={materials.Corpo} position={[0, -0.12, -0.1]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.Object_32.geometry} material={materials.Corpo_Escuro} position={[0, -0.12, -0.1]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group position={[0, 0, -0.1]}>
        <group position={[0, -0.12, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_44.geometry} material={materials.Corpo} />
          <mesh geometry={nodes.Object_45.geometry} material={materials.Corpo_Escuro} />
        </group>
        <group position={[0, -0.12, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_49.geometry} material={materials.Corpo_Escuro} />
          <mesh geometry={nodes.Object_50.geometry} material={materials.Corpo} />
        </group>
        <group position={[0, -0.12, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_54.geometry} material={materials.Corpo_Escuro} />
          <mesh geometry={nodes.Object_55.geometry} material={materials.Vermelho} />
        </group>
        <group position={[0, -0.12, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_57.geometry} material={materials.Corpo} />
          <mesh geometry={nodes.Object_58.geometry} material={materials.Corpo_Escuro} />
          <mesh geometry={nodes.Object_59.geometry} material={materials.Material} />
          <mesh geometry={nodes.Object_60.geometry} material={materials.Corpo_Muito_Escuro} />
          <mesh geometry={nodes.Object_61.geometry} material={materials.Vermelho} />
        </group>
        <mesh geometry={nodes.Object_47.geometry} material={materials.Corpo} position={[0, -0.12, 0.1]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.Object_52.geometry} material={materials.Corpo_Escuro} position={[0, -0.12, 0.1]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <mesh geometry={nodes.Object_5.geometry} material={materials.Corpo_Escuro} />
      <mesh geometry={nodes.Object_7.geometry} material={materials.Corpo} />
      <mesh geometry={nodes.Object_8.geometry} material={materials.Corpo_Escuro} />
      <mesh geometry={nodes.Object_10.geometry} material={materials.Vermelho} />
      <mesh geometry={nodes.Object_11.geometry} material={materials.Corpo_Escuro} />
      <mesh geometry={nodes.Object_13.geometry} material={materials.Corpo_Muito_Escuro} position={[-0.16, 0.36, 0.27]} />
      <mesh geometry={nodes.Object_15.geometry} material={materials.Corpo} />
      <mesh geometry={nodes.Object_16.geometry} material={materials.Corpo_Escuro} />
      <mesh geometry={nodes.Object_17.geometry} material={materials.Vidro} />
      <mesh geometry={nodes.Object_18.geometry} material={materials.Droid} />
      <mesh geometry={nodes.Object_20.geometry} material={materials.Corpo_Escuro} />
      <mesh geometry={nodes.Object_21.geometry} material={materials.Vidro} />
      <mesh position={[0.75,0.45,-1.5]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial emissive="hotpink" emissiveIntensity={20} toneMapped={false} />
      </mesh> 
      <mesh position={[-0.75,0.45,-1.5]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial emissive="hotpink" emissiveIntensity={20} toneMapped={false} />
      </mesh> 
      <mesh position={[0.75,-0.68,-1.5]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial emissive="hotpink" emissiveIntensity={20} toneMapped={false} />
      </mesh> 
      <mesh position={[-0.75,-0.68,-1.5]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial emissive="hotpink" emissiveIntensity={20} toneMapped={false} />
      </mesh> 
    </group>
  )
}

useGLTF.preload('/low_poly_x-wing.glb')

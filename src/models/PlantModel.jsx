import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import plantScene from '../assets/3d/monsterra.glb'
import { a } from '@react-spring/three'

const PlantModel = ({ isRotating, setIsRotating, ...props }) => {
  const plantRef = useRef()

  const { gl, viewport } = useThree()
  const { nodes, materials } = useGLTF(plantScene)

  const lastX = useRef(0)
  const lastY = useRef(0)
  const rotationSpeed = useRef({ x: 0, y: 0 })
  const dampingFactor = 0.95

  const handlePointerDown = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsRotating(true)

    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY

    lastX.current = clientX
    lastY.current = clientY
  }

  const handlePointerUp = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsRotating(false)
    rotationSpeed.current = { x: 0, y: 0 }
  }

  const handlePointerMove = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY

      const deltaX = (clientX - lastX.current) / viewport.width
      const deltaY = (clientY - lastY.current) / viewport.height

      plantRef.current.rotation.y += deltaX * 0.01 * Math.PI
      plantRef.current.rotation.x += deltaY * 0.01 * Math.PI

      lastX.current = clientX
      lastY.current = clientY

      rotationSpeed.current = {
        x: deltaX * 0.01 * Math.PI,
        y: deltaY * 0.01 * Math.PI
      }
    }
  }

  useFrame(() => {
    if (!isRotating) {
      plantRef.current.rotation.y += 0.005
    }
    if (
      !isRotating &&
      (Math.abs(rotationSpeed.current.x) > 0 ||
        Math.abs(rotationSpeed.current.y) > 0)
    ) {
      rotationSpeed.current.x *= dampingFactor
      rotationSpeed.current.y *= dampingFactor
      plantRef.current.rotation.y += rotationSpeed.current.x
      plantRef.current.rotation.x += rotationSpeed.current.y

      if (Math.abs(rotationSpeed.current.x) < 0.001) {
        rotationSpeed.current.x = 0
      }
      if (Math.abs(rotationSpeed.current.y) < 0.001) {
        rotationSpeed.current.y = 0
      }
    }
  })

  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointerup', handlePointerUp)
    canvas.addEventListener('pointermove', handlePointerMove)
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointerup', handlePointerUp)
      canvas.removeEventListener('pointermove', handlePointerMove)
    }
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove])

  return (
    <a.group {...props} ref={plantRef}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.863}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.root_HP_1_Mat2_0.geometry}
            material={materials['Mat.2']}
            position={[0.071, 0.06, 0.219]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Leaves_Mat1_0.geometry}
            material={materials['Mat.1']}
            position={[4.607, 54.241, -4.895]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Stand_Mat_0.geometry}
            material={materials.material}
            position={[0, 2.455, 7.585]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Pot_LP_Mat_0.geometry}
            material={materials.material}
          />
        </group>
      </group>
    </a.group>
  )
}

export default PlantModel

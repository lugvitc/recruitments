import { Canvas, useFrame } from "@react-three/fiber";
import { useTransform, useScroll, useTime } from "framer-motion";
import { BufferAttribute, Vector3 } from "three";
import { useMemo } from "react";

function Icosahedron() {
	return (
		<mesh rotation-x={0} rotation-z={2 * Math.PI * 0.089}>
			<icosahedronGeometry args={[1, 0]} />
			<meshBasicMaterial wireframe color={rgb(250, 204, 21)} />
		</mesh>
	)
};

function randum(from: number, to: number): number {
	return Math.random() * (to - from) + from;
}

function rgb(r: number, g: number, b: number) {
	return r << 16 | g << 8 | b;
}

const radPerDeg = Math.PI / 180;

function Dots({count = 150}) {
	const points = useMemo(
		() => {
			let c = Array(count).fill(0).map((_, i) => {
				let k = new Vector3();
				k.setFromSphericalCoords(randum(1.6, 7), randum(radPerDeg * 70, radPerDeg * 110), (i / count) * Math.PI * 2);
				return k.toArray();
			}).flat();
			return new BufferAttribute(new Float32Array(c), 3);
		}, [count]
	)
	return (
		<points>
			<bufferGeometry>
				<bufferAttribute attach={"attributes-position"} {...points} />
			</bufferGeometry>
			<pointsMaterial
				size={0.025}
				color={0x8f8f8f}
				sizeAttenuation={true}
			/>
		</points>
	)
}


function Scene() {
	const { scrollYProgress } = useScroll();
	// const gl = useThree((state) => state.gl);
	const yAngle = useTransform(
	  scrollYProgress,
	  [0, 1],
	  [0.001, Math.PI]
	);
	const distance = useTransform(scrollYProgress, [0, 1], [7, 5]);
	const time = useTime();

	useFrame(({ camera }) => {
	  camera.position.setFromSphericalCoords(
		distance.get(),
		yAngle.get(),
		time.get() * 0.0002
	  );
	  camera.updateProjectionMatrix();
	  camera.lookAt(0, 0, 0);
	});

	// useLayoutEffect(() => gl.setPixelRatio(0.5))

	return (
		<>
			<Icosahedron />
			<Dots />
		</>
	)
}

export default function Background() {
	return (
		<Canvas gl={{antialias: true}}>
			<Scene />
			{/* <axesHelper></axesHelper> */}
		</Canvas>
	)
}
import { Canvas, useFrame } from "@react-three/fiber";
import { useTransform, useScroll, useTime, useMotionValue,} from "framer-motion";
import { BufferAttribute, DodecahedronGeometry, Vector3 } from "three";
import { useEffect, useMemo } from "react";

function Icosahedron() {
	return (
		<mesh rotation-x={0} rotation-z={2 * Math.PI * 0.089}>
			<icosahedronGeometry args={[1, 0]} />
			<meshBasicMaterial wireframe color={rgb(250, 204, 21)} />
		</mesh>
	)
};

function Dodecahedron() {
	return (
		<>
			<mesh rotation-x={0} rotation-z={2 * Math.PI}>
				<lineSegments>
					<edgesGeometry args={[new DodecahedronGeometry()]}>
					</edgesGeometry>
					<lineBasicMaterial color={rgb(255, 200, 21)}/>
				</lineSegments>
			</mesh>
			{/* <mesh rotation-x={0} rotation-z={2 * Math.PI} scale={0.5}>
				<lineSegments>
					<edgesGeometry args={[new OctahedronGeometry()]}>
					</edgesGeometry>
					<lineBasicMaterial color={rgb(250, 70, 21)} linewidth={1} />
				</lineSegments>
			</mesh> */}
		</>
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

function OrbitScene() {
	const _scrollYProgress = useMotionValue(0);
	const _scrollX = useMotionValue(0);

	useEffect(() => {
		let y = 0;
		let x = 0;
		const listener = (ev: MouseEvent) => {
			y = ev.clientY / window.innerHeight;
			x = ev.clientX / window.innerWidth;
		};

		const touch_listener = (ev: TouchEvent) => {
			y = ev.touches[0].clientY / window.innerHeight;
			x = ev.touches[0].clientX / window.innerWidth;
		}

		const loop = () => {
			_scrollYProgress.set(_scrollYProgress.get() + 0.005 * (y - _scrollYProgress.get()));
			_scrollX.set(_scrollX.get() + 0.005 * (x - _scrollX.get()));
			raf = requestAnimationFrame(loop);
		}

		document.addEventListener("touchmove", touch_listener);
		document.addEventListener("mousemove", listener);
		let raf = requestAnimationFrame(loop);
		return () => {document.removeEventListener("touchmove", touch_listener); document.removeEventListener("mousemove", listener); cancelAnimationFrame(raf);}
	})
	// const gl = useThree((state) => state.gl);
	// const scrollYProgress = useTransform(_scrollYProgress, [0, 1], [0, 1], {ease: easeInOut});
	const yAngle = useTransform(
	  _scrollYProgress,
	  [0, 1],
	  [Math.PI, 0.0000001],
	);
	const distance = useTransform(_scrollYProgress, [0, 1], [7, 5]);
	const time = useTime();

	useFrame(({ camera }) => {
	  camera.position.setFromSphericalCoords(
		distance.get(),
		yAngle.get(),
		time.get() * 0.0001 + (1 - _scrollX.get()) * Math.PI
	  );
	  camera.updateProjectionMatrix();
	  camera.lookAt(0, 0, 0);
	});

	// useLayoutEffect(() => gl.setPixelRatio(0.5))

	return (
		<>
			<Dodecahedron />
			<Dots />
		</>
	)
}


export function OrbitBackground() {
	return (
		<Canvas gl={{antialias: true}}>
			<OrbitScene />
			{/* <axesHelper></axesHelper> */}
		</Canvas>
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
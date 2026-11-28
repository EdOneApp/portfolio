"use client";
import { useEffect, useRef } from "react";

export default function HeroScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import(
        "three/examples/jsm/environments/RoomEnvironment.js"
      );
      if (disposed) return;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.92;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.55;

      const camera = new THREE.PerspectiveCamera(
        34,
        el.clientWidth / el.clientHeight,
        0.1,
        100,
      );
      camera.position.set(0, 0, 9);

      const group = new THREE.Group();
      scene.add(group);

      const wine = new THREE.MeshPhysicalMaterial({
        color: 0x5c0b1d,
        metalness: 0.35,
        roughness: 0.28,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        sheen: 0.35,
        sheenColor: new THREE.Color(0xc0485e),
        iridescence: 0.15,
      });
      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.45, 0.46, 260, 48, 2, 3),
        wine,
      );
      group.add(knot);

      const gold = new THREE.MeshPhysicalMaterial({
        color: 0xd8b27a,
        metalness: 1,
        roughness: 0.18,
        clearcoat: 0.6,
      });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.025, 16, 220), gold);
      ring.rotation.x = Math.PI / 2.4;
      group.add(ring);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.25, 0.012, 12, 220), gold);
      ring2.rotation.set(Math.PI / 1.8, 0.4, 0);
      group.add(ring2);

      const orbs: { mesh: InstanceType<typeof THREE.Mesh>; r: number; s: number; o: number; y: number }[] = [];
      const orbMat = [
        gold,
        new THREE.MeshPhysicalMaterial({ color: 0xf3e6da, roughness: 0.1, clearcoat: 1 }),
        new THREE.MeshPhysicalMaterial({ color: 0x4a0d1a, roughness: 0.25, clearcoat: 1 }),
      ];
      for (let i = 0; i < 7; i++) {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.08 + Math.random() * 0.16, 32, 32),
          orbMat[i % 3],
        );
        group.add(mesh);
        orbs.push({
          mesh,
          r: 2.4 + Math.random() * 1.3,
          s: 0.15 + Math.random() * 0.25,
          o: Math.random() * Math.PI * 2,
          y: (Math.random() - 0.5) * 2.6,
        });
      }

      const count = 420;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 4 + Math.random() * 6;
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(p) * Math.cos(t);
        positions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
        positions[i * 3 + 2] = r * Math.cos(p) - 3;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const dust = new THREE.Points(
        dustGeo,
        new THREE.PointsMaterial({
          color: 0xe9c99a,
          size: 0.03,
          transparent: true,
          opacity: 0.75,
          depthWrite: false,
        }),
      );
      scene.add(dust);

      const key = new THREE.DirectionalLight(0xffe7d6, 2.2);
      key.position.set(4, 5, 6);
      scene.add(key);
      const rim = new THREE.PointLight(0xff3355, 22, 20);
      rim.position.set(-4, -2, 2);
      scene.add(rim);

      let mx = 0,
        my = 0,
        tx = 0,
        ty = 0,
        scrollT = 0,
        baseX = 0,
        baseY = 0;
      const pointer = (e: PointerEvent) => {
        tx = (e.clientX / innerWidth - 0.5) * 2;
        ty = (e.clientY / innerHeight - 0.5) * 2;
      };
      const scroll = () => {
        scrollT = Math.min(1, scrollY / Math.max(1, el.clientHeight));
      };
      const resize = () => {
        const w = el.clientWidth,
          h = el.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const mobile = w < 700;
        group.scale.setScalar(mobile ? 0.52 : 0.92);
        baseX = mobile ? 0.6 : w < 1100 ? 1.2 : 1.9;
        baseY = mobile ? 1.6 : 0.1;
      };
      resize();
      window.addEventListener("pointermove", pointer, { passive: true });
      window.addEventListener("scroll", scroll, { passive: true });
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(el);

      const clock = new THREE.Clock();
      let raf = 0;
      const render = () => {
        raf = requestAnimationFrame(render);
        if (!visible || document.hidden) return;
        const t = clock.getElapsedTime();
        mx += (tx - mx) * 0.05;
        my += (ty - my) * 0.05;
        knot.rotation.x = t * 0.18 + my * 0.4;
        knot.rotation.y = t * 0.26 + mx * 0.6;
        ring.rotation.z = t * 0.12;
        ring2.rotation.z = -t * 0.09;
        group.rotation.y = mx * 0.25;
        group.rotation.x = my * 0.15;
        group.position.x = baseX;
        group.position.y = baseY - scrollT * 1.6 + Math.sin(t * 0.8) * 0.08;
        orbs.forEach((o) => {
          const a = o.o + t * o.s;
          o.mesh.position.set(Math.cos(a) * o.r, o.y + Math.sin(a * 1.3) * 0.3, Math.sin(a) * o.r * 0.6);
        });
        dust.rotation.y = t * 0.02;
        renderer.render(scene, camera);
      };
      if (reduced) renderer.render(scene, camera);
      else render();
      el.dataset.ready = "true";

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", pointer);
        window.removeEventListener("scroll", scroll);
        ro.disconnect();
        io.disconnect();
        scene.traverse((o) => {
          const m = o as InstanceType<typeof THREE.Mesh>;
          if (m.geometry) m.geometry.dispose();
        });
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => {
      el.dataset.ready = "fallback";
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={host} className="h-hero-scene" aria-hidden="true" />;
}

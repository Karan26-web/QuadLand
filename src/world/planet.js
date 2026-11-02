// ---------------------------------------------------------------------------
// The water planet: a violet night sea under a ringed giant (baked sky), the
// living ocean, two mountain-sized waves rolling far out, the five sets of landing
// zones (three islands each: the LXD's three areas), the five ships, the survey drone,
// the cloud deck the ship comes down through, and the effects.
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { skyDome, bakeCube } from './sky.js';
import { ringedPlanet, moon } from './planets.js';
import { Ocean, GiantWave } from './ocean.js';
import { Island, TOP } from './islands.js';
import { QuadShip, Drone } from './ships.js';
import { SHAPES, bounds } from './shapes.js';
import { Particles, Confetti } from '../engine/fx.js';
import { Tex } from './textures.js';
import { mulberry32, shuffle } from '../engine/util.js';

export const MOON_DIR = new THREE.Vector3(-0.42, 0.36, -0.83).normalize();   // the ringed giant, low in the north-west

/** the five sets of three, each in its own part of the sea but close enough for one view from above to hold all
    fifteen zones: the two small sets in front, the three large ones behind (x, z) */
export const SITES = [[6, -70], [-21, -112], [33, -112], [62, -70], [89, -112]];

export class PlanetWorld {
  constructor(renderer, { cubeSize = 1024, seed = (Math.random() * 1e9) | 0 } = {}) {
    const scene = (this.scene = new THREE.Scene());
    const bake = new THREE.Scene();
    bake.add(skyDome('night', { glowDir: MOON_DIR }));
    this.giant = ringedPlanet({ radius: 18, sunDir: new THREE.Vector3(0.6, 0.5, 0.3), tilt: 0.35 });
    this.giant.position.copy(MOON_DIR).multiplyScalar(110); this.giant.rotation.z = -0.35;
    this.giant.userData.uniforms.uLight.value = 1.3;
    bake.add(this.giant);
    const m = moon({ radius: 1, sunDir: new THREE.Vector3(0.6, 0.5, 0.3), tint: 0xe6d8ff });
    m.scale.setScalar(3.2); m.position.set(70, 52, -30); bake.add(m);
    this.giant.updateMatrixWorld(true); this.giant.update(0);
    this.cube = bakeCube(renderer, bake, { size: cubeSize, near: 0.1, far: 1000 });
    scene.background = this.cube.texture; scene.backgroundIntensity = 1;
    const pm = new THREE.PMREMGenerator(renderer);
    this.env = pm.fromCubemap(this.cube.texture); pm.dispose();
    scene.environment = this.env.texture; scene.environmentIntensity = 1.0;

    this.moonLight = new THREE.DirectionalLight(0xe9d8ff, 2.2); this.moonLight.position.copy(MOON_DIR).multiplyScalar(100); scene.add(this.moonLight);
    this.hemi = new THREE.HemisphereLight(0x9a6cff, 0x0a0820, 1.1); scene.add(this.hemi);
    this.kick = new THREE.DirectionalLight(0x5cf2ff, 0.7); this.kick.position.set(60, 40, 80); scene.add(this.kick);

    this.ocean = new Ocean({ envMap: this.cube.texture });
    this.ocean.u.uLightDir.value.copy(MOON_DIR);
    scene.add(this.ocean.mesh);
    this.waves = [new GiantWave(this.ocean), new GiantWave(this.ocean)];
    this.waves[0].dir.set(0.25, 1).normalize(); this.waves[0].phase = 0.32;
    this.waves[1].dir.set(-0.5, 1).normalize(); this.waves[1].phase = 0.78; this.waves[1].peak = 80;
    this.waves.forEach((w) => scene.add(w.mesh));

    // the sets: three islands each, in a triangle; which slot holds the right area is dealt per run, so "the one
    // on the right" means nothing
    const rng = mulberry32(seed);
    this.sites = SHAPES.map((shape, i) => {
      const [sx, sz] = SITES[i];
      // spaced so that, seen from above, the ship waits in clear water between the back island and the front two
      const big = bounds(shape.verts), grow = Math.sqrt(Math.max(...shape.islands) / shape.area);
      const s = Math.max(Math.max(big.w, big.h) * grow + 6.5, (big.h * 1.22 + 3.4 + big.h * grow) / 0.92);
      const slots = [[-s * 0.62, s * 0.3], [s * 0.62, s * 0.3], [0, -s * 0.62]];
      const areas = shuffle(shape.islands, rng);
      const islands = areas.map((area, k) => {
        const isl = new Island(shape, area, { seed: 100 + i * 10 + k });
        isl.position.x = sx + slots[k][0]; isl.position.z = sz + slots[k][1];
        isl.rotation.y = 0; scene.add(isl);
        return isl;
      });
      return { shape, centre: new THREE.Vector3(sx, 0, sz), islands, spacing: s, landed: false };
    });
    this.allIslands = this.sites.flatMap((s) => s.islands);

    this.ships = SHAPES.map((s) => { const sh = new QuadShip(s); sh.visible = false; scene.add(sh); return sh; });
    this.drone = new Drone(); this.drone.visible = false; scene.add(this.drone);

    // the cloud deck (seen only on the way down)
    this.clouds = new THREE.Group();
    const cm = new THREE.SpriteMaterial({ map: Tex.cloud(), color: 0x8a6cc0, transparent: true, opacity: 0.85, depthWrite: false, fog: false });
    const cr = mulberry32(7);
    for (let i = 0; i < 70; i++) {
      const s = new THREE.Sprite(cm.clone()); const a = cr() * Math.PI * 2, d = 40 + cr() * 520;
      s.position.set(Math.cos(a) * d, 230 + cr() * 140, -120 + Math.sin(a) * d); s.scale.set(160 + cr() * 220, 70 + cr() * 90, 1);
      s.material.opacity = 0.5 + cr() * 0.4; s.material.color.offsetHSL(0, 0, (cr() - 0.5) * 0.15);
      this.clouds.add(s);
    }
    scene.add(this.clouds);

    this.spray = new Particles({ max: 900, map: Tex.splash(), additive: false, renderOrder: 9 });
    this.mist = new Particles({ max: 260, map: Tex.smoke(), additive: false, renderOrder: 8 });
    this.sparks = new Particles({ max: 300, map: Tex.spark(), additive: true, renderOrder: 10 });
    this.glints = new Particles({ max: 300, map: Tex.glow(), additive: true, renderOrder: 10 });
    this.smoke = new Particles({ max: 160, map: Tex.smoke(), additive: false, renderOrder: 9 });
    this.confetti = new Confetti(420);
    for (const p of [this.spray, this.mist, this.sparks, this.glints, this.smoke]) scene.add(p.mesh);
    scene.add(this.confetti.mesh);

    this.t = 0;
    this.extras = [];
  }

  /** a splash ring of droplets round a point at sea level */
  splash(x, z, { count = 80, power = 1, radius = 1, color = 0xe6e0ff } = {}) {
    const P = this.spray;
    P.burst(count, () => {
      const a = Math.random() * Math.PI * 2, r = radius * (0.6 + Math.random() * 0.6), s = (2 + Math.random() * 5) * power;
      return { pos: new THREE.Vector3(x + Math.cos(a) * r, 0.2, z + Math.sin(a) * r), vel: new THREE.Vector3(Math.cos(a) * s * 0.6, (4 + Math.random() * 7) * power, Math.sin(a) * s * 0.6),
        life: 0.9 + Math.random() * 0.8, size: 0.5 + Math.random() * 0.9, sizeEnd: 1.4, color, alpha: 0.95, alphaEnd: 0, gravity: 14, drag: 0.6, floor: -0.5 };
    });
    this.mist.burst(Math.ceil(count / 6), () => {
      const a = Math.random() * Math.PI * 2, r = radius * Math.random();
      return { pos: new THREE.Vector3(x + Math.cos(a) * r, 0.6, z + Math.sin(a) * r), vel: new THREE.Vector3(Math.cos(a) * 1.5, 1 + Math.random() * 2, Math.sin(a) * 1.5),
        life: 2 + Math.random(), size: 2.5 * power, sizeEnd: 7 * power, color: 0xc9bfff, alpha: 0.32, alphaEnd: 0, drag: 0.8 };
    });
  }
  /** water pouring off an island's edges as it comes up (k: how hard, dt: this frame; about 90 drops a second per island) */
  pour(isl, k = 1, dt = 1 / 60) {
    const v = isl.verts, P = this.spray;
    for (let i = 0; i < v.length; i++) {
      const a = v[i], b = v[(i + 1) % v.length];
      const n = Math.floor(22 * k * dt + Math.random());
      for (let j = 0; j < n; j++) {
        const t = Math.random(), px = a.x + (b.x - a.x) * t, py = a.y + (b.y - a.y) * t;
        const dx = b.y - a.y, dy = -(b.x - a.x), l = Math.hypot(dx, dy);
        const pos = new THREE.Vector3(px, 0, -py).applyMatrix4(isl.matrixWorld);
        P.spawn({ pos, vel: new THREE.Vector3((dx / l) * 1.4, -0.5, -(dy / l) * 1.4), life: 0.8 + Math.random() * 0.5, size: 0.35 + Math.random() * 0.4, sizeEnd: 0.9,
          color: 0xd8d0ff, alpha: 0.8, alphaEnd: 0, gravity: 9, floor: -0.4 });
      }
    }
  }
  update(dt, camera) {
    this.t += dt;
    this.ocean.update(dt, camera);
    for (const w of this.waves) w.update(dt);
    for (const s of this.sites) for (const isl of s.islands) if (isl.visible) isl.update(dt);
    this.ocean.setIslands(this.allIslands);
    for (const sh of this.ships) if (sh.visible) sh.update(dt);
    if (this.drone.visible) this.drone.update(dt);
    for (const p of [this.spray, this.mist, this.sparks, this.glints, this.smoke]) p.update(dt);
    this.confetti.update(dt);
    for (const e of this.extras) e(dt);
  }
}
export { TOP };

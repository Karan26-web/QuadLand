// ---------------------------------------------------------------------------
// Deep space: the baked nebula, a sun, the ocean planet ahead, the ringed giant
// behind it, two moons, the command ship and its fleet of five in formation,
// drifting space dust (the warp stretches it into streaks).
// The ships stay near the origin; speed is sold by the streaks and the flames
// (planets this far away barely move against a moving ship anyway).
// ---------------------------------------------------------------------------
import * as THREE from '../../vendor/three.module.js';
import { skyDome, bakeCube } from './sky.js';
import { ringedPlanet, oceanPlanet, moon } from './planets.js';
import { CommandShip, QuadShip, glowSprite } from './ships.js';
import { SHAPES } from './shapes.js';
import { Streaks } from '../engine/fx.js';
import { Tex } from './textures.js';

export const SUN_DIR = new THREE.Vector3(1.0, 0.32, -0.18).normalize();

/** where each of the five flies, beside the command ship (x, y, z) */
export const FORMATION = [
  [-17, 3, -6], [18, 4, -9], [-26, -5, 7], [27, -4, 5], [0, 15, 19],
];

export class SpaceWorld {
  constructor(renderer, { cubeSize = 1024 } = {}) {
    const scene = (this.scene = new THREE.Scene());
    const bake = new THREE.Scene(); bake.add(skyDome('nebula'));
    this.cube = bakeCube(renderer, bake, { size: cubeSize });
    scene.background = this.cube.texture; scene.backgroundIntensity = 1;
    const pm = new THREE.PMREMGenerator(renderer);
    this.env = pm.fromCubemap(this.cube.texture); pm.dispose();
    scene.environment = this.env.texture; scene.environmentIntensity = 0.8;

    const sun = new THREE.DirectionalLight(0xfff1e0, 3.1); sun.position.copy(SUN_DIR).multiplyScalar(100); scene.add(sun);
    const fill = new THREE.HemisphereLight(0x8b6cff, 0x0b2a3a, 0.9); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xff5ccf, 1.1); rim.position.set(-60, -20, 40); scene.add(rim);

    // the sun: a glint and a wide glow, far out along its direction
    this.sunGroup = new THREE.Group(); this.sunGroup.position.copy(SUN_DIR).multiplyScalar(9000);
    const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: Tex.glint(), color: 0xfff0dd, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    core.scale.setScalar(1800); core.material.color.multiplyScalar(4); this.sunGroup.add(core);
    this.sunGroup.add(glowSprite(0xffb38a, 5200, 0.55));
    scene.add(this.sunGroup);

    this.oceanPlanet = oceanPlanet({ radius: 900, sunDir: SUN_DIR });
    this.planetHome = new THREE.Vector3(-1500, -420, -5200);
    this.oceanPlanet.position.copy(this.planetHome); scene.add(this.oceanPlanet);
    this.ringed = ringedPlanet({ radius: 1700, sunDir: SUN_DIR, tilt: 0.5 });
    this.ringed.position.set(4200, 1500, -11800); this.ringed.rotation.z = 0.3; scene.add(this.ringed);
    this.moons = [moon({ radius: 120, sunDir: SUN_DIR, tint: 0xc9b8ff }), moon({ radius: 70, sunDir: SUN_DIR, tint: 0xffc2a8 })];
    this.moons[0].position.set(-300, 380, -3300); this.moons[1].position.set(1700, -300, -4600);
    this.moons.forEach((m) => scene.add(m));

    this.command = new CommandShip(); scene.add(this.command);
    this.fleet = SHAPES.map((s, i) => {
      const sh = new QuadShip(s); sh.thrust = 0.9; sh.hover = 0.2; sh.bob = 0.6;
      sh.position.set(...FORMATION[i]); sh.home = sh.position.clone();
      scene.add(sh); return sh;
    });

    this.dust = new Streaks(1600, 320); this.dust.speed = 14; scene.add(this.dust.mesh);
    this.flyDir = new THREE.Vector3(0, 0, -1);
    this.t = 0; this.drift = true;
    this.extras = [];
  }
  /** put the ocean planet back where the intro shows it (the warp brings it close) */
  resetPlanet() { this.oceanPlanet.position.copy(this.planetHome); this.oceanPlanet.scale.setScalar(1); }
  update(dt, camera) {
    this.t += dt;
    this.command.update(dt);
    this.fleet.forEach((s, i) => {
      s.update(dt);
      if (this.drift && s.home) {
        s.position.x = s.home.x + Math.sin(this.t * 0.4 + i * 1.7) * 0.8;
        s.position.y = s.home.y + Math.sin(this.t * 0.55 + i) * 0.6;
      }
    });
    this.oceanPlanet.update(dt); this.ringed.update(dt);
    this.dust.update(dt, this.flyDir);
    // the sun rides at infinity
    this.sunGroup.position.copy(camera.position).addScaledVector(SUN_DIR, 9000);
    for (const e of this.extras) e(dt);
  }
}

/* ============================================================
   CONNEX — Hero 3D figure
   Stylized monochrome character. Head + eyes track the cursor.
   Scroll drives a smooth transition into a seated typing pose.
   Built on Three.js r128 (UMD, no modules). Mobile-friendly.
   ============================================================ */
window.initConnexAvatar = function (canvas) {
  if (typeof THREE === 'undefined') { console.warn('[ConnexAvatar] THREE not loaded'); return; }
  if (!canvas) return;
  console.log('[ConnexAvatar] build v8 — initialized');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches || ('ontouchstart' in window);

  // ---------- renderer / scene / camera ----------
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isTouch, alpha: true, preserveDrawingBuffer: true });
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = !isTouch;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  const subject = new THREE.Group(); scene.add(subject);  // holds figure + desk, offset responsively

  // ---------- materials ----------
  const skinMat  = new THREE.MeshStandardMaterial({ color: 0x704d34, roughness: 0.6, metalness: 0.0 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0x111114, roughness: 0.84, metalness: 0.0 });
  const darkMat  = new THREE.MeshStandardMaterial({ color: 0x100b07, roughness: 0.6, metalness: 0.0 });
  const eyeMat   = new THREE.MeshStandardMaterial({ color: 0x09090a, roughness: 0.2,  metalness: 0.0 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf3f2ee, roughness: 0.45, metalness: 0.0 });
  const deskMat  = new THREE.MeshStandardMaterial({ color: 0x0e0e10, roughness: 0.9,  metalness: 0.05 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1e, roughness: 0.4,  metalness: 0.3 });
  const screenMat= new THREE.MeshStandardMaterial({ color: 0x26262b, roughness: 0.3,  metalness: 0.1, emissive: 0x16161c, emissiveIntensity: 0.75 });

  // ---------- lights ----------
  scene.add(new THREE.HemisphereLight(0xb6c2cc, 0x0a0a0b, 0.16));
  const key = new THREE.DirectionalLight(0xfff0dc, 0.95);
  key.position.set(2.6, 4.4, 3.4); key.castShadow = !isTouch;
  key.shadow.mapSize.set(1024, 1024); key.shadow.camera.near = 1; key.shadow.camera.far = 22;
  key.shadow.camera.left = -6; key.shadow.camera.right = 6; key.shadow.camera.top = 6; key.shadow.camera.bottom = -6;
  key.shadow.bias = -0.0006; key.shadow.radius = 5;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd6e4ff, 1.05); rim.position.set(-3.4, 2.4, -3.6); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 0.12); fill.position.set(-2.2, 0.4, 2.8); scene.add(fill);

  function ellipsoid(rx, ry, rz, mat, seg) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, seg || 44, seg || 34), mat);
    m.scale.set(rx, ry, rz); m.castShadow = true; m.receiveShadow = true; return m;
  }

  // ============================================================
  //  OFFICE ENVIRONMENT (furnished, lightly colourful)
  // ============================================================
  const office = new THREE.Group(); scene.add(office);
  // floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(44, 44), new THREE.MeshStandardMaterial({ color: 0x0f0e11, roughness: 0.96 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -2.05; floor.receiveShadow = true; office.add(floor);
  // back + side wall
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(44, 24), new THREE.MeshStandardMaterial({ color: 0x1b1814, roughness: 1 }));
  wall.position.set(0, 7, -3.5); wall.receiveShadow = true; office.add(wall);
  const sideWall = new THREE.Mesh(new THREE.PlaneGeometry(22, 24), new THREE.MeshStandardMaterial({ color: 0x14110e, roughness: 1 }));
  sideWall.rotation.y = -Math.PI / 2; sideWall.position.set(7, 7, 0); office.add(sideWall);
  // window with soft cool daylight (left, echoing the founder's office glass)
  const win = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 3.7),
    new THREE.MeshStandardMaterial({ color: 0x8499a8, emissive: 0x6c8597, emissiveIntensity: 0.42, roughness: 0.85 }));
  win.position.set(-3.05, 1.5, -3.42); office.add(win);
  const mull = new THREE.MeshStandardMaterial({ color: 0x14120e, roughness: 0.85 });
  const fv = new THREE.Mesh(new THREE.BoxGeometry(0.07, 3.7, 0.06), mull); fv.position.set(-3.05, 1.5, -3.38); office.add(fv);
  [1.0, -1.0].forEach(yy => { const hb = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.07, 0.06), mull); hb.position.set(-3.05, 1.5 + yy, -3.38); office.add(hb); });


  // cool spill light from the window
  const winPoint = new THREE.PointLight(0x9fc0d8, 0.45, 28); winPoint.position.set(-2.6, 1.7, -1.4); scene.add(winPoint);
  // potted plant — the colour pop
  const plant = new THREE.Group(); plant.position.set(2.55, -2.05, -0.7); plant.scale.setScalar(1.18); office.add(plant);
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.27, 0.62, 24), new THREE.MeshStandardMaterial({ color: 0x6f6358, roughness: 0.9 }));
  pot.position.y = 0.31; pot.castShadow = true; plant.add(pot);
  const leafA = new THREE.MeshStandardMaterial({ color: 0x3c5f37, roughness: 0.72 });
  const leafB = new THREE.MeshStandardMaterial({ color: 0x517e46, roughness: 0.72 });
  for (let i = 0; i < 12; i++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), i % 2 ? leafB : leafA);
    leaf.scale.set(0.085, 0.55 + Math.random() * 0.35, 0.17);
    const a = (i / 12) * Math.PI * 2;
    leaf.position.set(Math.cos(a) * 0.2, 0.66 + Math.random() * 0.35, Math.sin(a) * 0.2);
    leaf.rotation.z = Math.cos(a) * 0.55; leaf.rotation.x = Math.sin(a) * 0.55;
    leaf.castShadow = true; plant.add(leaf);
  }
  if (isTouch) {
    office.visible = false;
    winPoint.visible = false;
  }

  // ---------- Cx logo texture ----------
  function makeLogoTexture() {
    const s = 256, cv = document.createElement('canvas'); cv.width = cv.height = s;
    const c = cv.getContext('2d');
    c.clearRect(0, 0, s, s);
    c.strokeStyle = '#f3f2ee'; c.lineCap = 'round';
    const cx = 104, cy = 138, r = 70;
    c.lineWidth = 24;
    c.beginPath(); c.arc(cx, cy, r, (32 * Math.PI) / 180, (328 * Math.PI) / 180, false); c.stroke();
    c.lineWidth = 22; const xc = 182, yc = 138, a = 28;
    c.beginPath();
    c.moveTo(xc - a, yc - a); c.lineTo(xc + a, yc + a);
    c.moveTo(xc + a, yc - a); c.lineTo(xc - a, yc + a); c.stroke();
    const tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4; return tex;
  }

  // ============================================================
  //  FIGURE
  // ============================================================
  const figure = new THREE.Group(); subject.add(figure);
  const spine = new THREE.Group(); figure.add(spine);

  // shoulder yoke (sloped) + tapered torso
  const yoke = ellipsoid(0.86, 0.26, 0.46, shirtMat, 48); yoke.position.y = 0.45; spine.add(yoke);
  const torso = ellipsoid(0.72, 0.92, 0.44, shirtMat, 48); torso.position.y = -0.06; spine.add(torso);
  const base = ellipsoid(0.6, 0.55, 0.42, shirtMat, 36); base.position.y = -0.95; spine.add(base);

  // chest logo
  const logoMat = new THREE.MeshBasicMaterial({ map: makeLogoTexture(), transparent: true, opacity: 0.9 });
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.42), logoMat);
  logo.position.set(0, 0.02, 0.475); spine.add(logo);

  // neck
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.21, 0.3, 28), skinMat);
  neck.position.y = 0.82; neck.castShadow = true; spine.add(neck);

  // ---- HEAD ----
  const head = new THREE.Group(); head.position.y = 1.16; spine.add(head);
  const skull = ellipsoid(0.47, 0.51, 0.47, skinMat, 48); head.add(skull);
  const chin = ellipsoid(0.24, 0.22, 0.28, skinMat, 36); chin.position.set(0, -0.33, 0.02); head.add(chin);
  // hair: clean cropped cap (hemisphere with a real hairline) + nape
  const hairGeo = new THREE.SphereGeometry(0.495, 44, 30, 0, Math.PI * 2, 0, Math.PI * 0.6);
  const hairCap = new THREE.Mesh(hairGeo, darkMat); hairCap.castShadow = true;
  hairCap.scale.set(1.0, 1.05, 1.06); hairCap.position.set(0, 0.06, -0.02); hairCap.rotation.x = -0.12; head.add(hairCap);
  const nape = ellipsoid(0.46, 0.34, 0.46, darkMat, 36); nape.position.set(0, 0.06, -0.12); head.add(nape);
  // ears
  [-1, 1].forEach(s => { const e = ellipsoid(0.07, 0.13, 0.09, skinMat, 24); e.position.set(0.46 * s, -0.05, 0); head.add(e); });
  // nose
  const nose = ellipsoid(0.052, 0.085, 0.06, skinMat, 22); nose.position.set(0, -0.05, 0.46); head.add(nose);
  // brows
  [-1, 1].forEach(s => { const b = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.03, 0.045), darkMat); b.position.set(0.16 * s, 0.115, 0.43); b.rotation.z = -0.05 * s; head.add(b); });
  // mouth (subtle)
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.022, 0.035), darkMat); mouth.position.set(0, -0.24, 0.41); head.add(mouth);

  // eyes
  const pupils = [];
  [-1, 1].forEach(s => {
    const w = ellipsoid(0.092, 0.098, 0.055, whiteMat, 28); w.position.set(0.165 * s, 0.01, 0.42); head.add(w);
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.042, 20, 20), eyeMat); p.position.set(0.165 * s, 0.01, 0.468); head.add(p); pupils.push(p);
  });

  // ---- ARMS ----
  function makeArm(side) {
    const shoulder = new THREE.Group(); shoulder.position.set(0.8 * side, 0.46, 0.02);
    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.72, 24), shirtMat);
    upper.position.y = -0.36; upper.castShadow = true; shoulder.add(upper);
    const elbow = new THREE.Group(); elbow.position.y = -0.72; shoulder.add(elbow);
    const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.1, 0.64, 24), skinMat);
    fore.position.y = -0.32; fore.castShadow = true; elbow.add(fore);
    const hand = ellipsoid(0.13, 0.09, 0.17, skinMat, 24); hand.position.y = -0.66; elbow.add(hand);
    spine.add(shoulder);
    return { shoulder, elbow, hand, side };
  }
  const armL = makeArm(-1), armR = makeArm(1);

  // ============================================================
  //  DESK / LAPTOP (fades + scales in when seated)
  // ============================================================
  const deskGroup = new THREE.Group(); deskGroup.visible = false; subject.add(deskGroup);
  const desk = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.09, 1.0), deskMat);
  desk.position.set(0, -0.72, 0.58); desk.receiveShadow = true; desk.castShadow = true; deskGroup.add(desk);
  const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.045, 0.56), metalMat);
  lapBase.position.set(0, -0.65, 0.64); lapBase.castShadow = true; deskGroup.add(lapBase);
  const lapScreen = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.58, 0.04), metalMat);
  lapScreen.position.set(0, -0.36, 0.4); lapScreen.rotation.x = -0.42; deskGroup.add(lapScreen);
  const lapGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.46), screenMat);
  lapGlow.position.set(0, -0.36, 0.423); lapGlow.rotation.x = -0.42; deskGroup.add(lapGlow);

  // ============================================================
  //  background dust
  // ============================================================
  const dustGeo = new THREE.BufferGeometry();
  const N = isTouch ? 160 : 320;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i*3]=(Math.random()-0.5)*18; pos[i*3+1]=(Math.random()-0.5)*12; pos[i*3+2]=-2-Math.random()*10; }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.45, depthWrite: false }));
  dust.visible = false; // office scene replaces the starfield
  scene.add(dust);

  // ============================================================
  //  state
  // ============================================================
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let sit = 0, sitTarget = 0;
  let blink = 0, nextBlink = 2 + Math.random() * 3;

  function onMove(e) {
    const t = e.touches ? e.touches[0] : e;
    pointer.tx = (t.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = -((t.clientY / window.innerHeight) * 2 - 1);
  }
  if (!isTouch) window.addEventListener('mousemove', onMove, { passive: true });

  let active = true;
  window.ConnexAvatar = {
    setScroll: (p) => { sitTarget = Math.max(0, Math.min(1, p)); },
    destroy: () => {
      active = false;
      if (!isTouch) window.removeEventListener('mousemove', onMove);
      renderer.dispose();
      console.log('[ConnexAvatar] destroyed');
    }
  };

  function dpr() { return Math.min(window.devicePixelRatio || 1, isTouch ? 1.2 : 2); }
  let resizedOnce = false;
  function resize() {
    if (!active) return;
    const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
    const gl = renderer.getContext();
    const vp = gl ? Array.from(gl.getParameter(gl.VIEWPORT)) : null;
    console.log('[ConnexAvatar] resize check:', { w, h, dpr: dpr(), canvasW: canvas.width, canvasH: canvas.height, vp });
    const targetW = Math.floor(w * dpr());
    const targetH = Math.floor(h * dpr());
    if (!resizedOnce || canvas.width !== targetW || canvas.height !== targetH || Math.abs(camera.aspect - w / h) > 0.001) {
      console.log('[ConnexAvatar] resize execute:', w, h);
      renderer.setPixelRatio(dpr()); renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      resizedOnce = true;
    }
  }

  const lerp = (a, b, t) => a + (b - a) * t;
  const eApproach = (cur, tgt, rate, dt) => cur + (tgt - cur) * (1 - Math.exp(-rate * dt));

  let last = performance.now();
  let ready = false;
  function loop() {
    if (!active) return;
    requestAnimationFrame(loop);
    const now = performance.now();
    let dt = (now - last) / 1000; last = now; if (dt > 0.06) dt = 0.06;
    const t = now / 1000;
    resize();

    pointer.x = eApproach(pointer.x, pointer.tx, 6, dt);
    pointer.y = eApproach(pointer.y, pointer.ty, 6, dt);
    sit = eApproach(sit, sitTarget, 4.5, dt);

    const px = (isTouch || reduceMotion) ? Math.sin(t * 0.45) * 0.55 : pointer.x;
    const py = (isTouch || reduceMotion) ? Math.cos(t * 0.38) * 0.2  : pointer.y;

    // breathing
    spine.scale.y = 1 + Math.sin(t * 1.1) * 0.01;

    // camera
    const camY = lerp(0.92, 1.0, sit);
    const camZ = lerp(4.35, 5.15, sit);
    camera.position.set(px * 0.1, camY + py * 0.06, camZ);
    camera.lookAt(0, lerp(0.86, 0.05, sit), 0);

    // body lean + sink
    spine.rotation.x = lerp(0, 0.3, sit);
    figure.position.y = lerp(0, -0.34, sit);
    // subject drifts from right (standing, room for headline) to centre (seated)
    const baseOffset = window.innerWidth > 1024 ? 1.15 : (window.innerWidth > 720 ? 0.7 : 0);
    subject.position.x = eApproach(subject.position.x, lerp(baseOffset, 0, sit), 4, dt);

    // head look
    const follow = 1 - sit * 0.8;
    const yaw = px * 0.62 * follow;
    const pitch = lerp(py * 0.4 * follow, 0.18, sit * 0.95);
    head.rotation.y = eApproach(head.rotation.y, yaw, 9, dt);
    head.rotation.x = eApproach(head.rotation.x, pitch, 9, dt);
    head.rotation.z = eApproach(head.rotation.z, -px * 0.05 * follow, 9, dt);

    // blink
    blink -= dt; if (blink < -0.12) { if (t > nextBlink) { blink = 0.12; nextBlink = t + 2 + Math.random() * 3.5; } }
    const open = blink > 0 ? Math.max(0.08, 1 - (1 - Math.abs(blink - 0.06) / 0.06)) : 1;
    pupils.forEach(p => {
      const base = p.position.x > 0 ? 0.165 : -0.165;
      p.position.x = eApproach(p.position.x, base + px * 0.04 * follow, 10, dt);
      p.position.y = eApproach(p.position.y, 0.01 + py * 0.035 * follow, 10, dt);
      p.scale.y = eApproach(p.scale.y, open, 18, dt);
    });

    // arms
    const restS = 0.04, restE = 0.1, sitS = -1.18, sitE = 0.92;
    [armL, armR].forEach((arm, i) => {
      const sX = lerp(restS, sitS, sit);
      let eX = lerp(restE, sitE, sit);
      arm.shoulder.rotation.x = eApproach(arm.shoulder.rotation.x, sX, 6, dt);
      arm.shoulder.rotation.z = eApproach(arm.shoulder.rotation.z, lerp(0.1 * arm.side, 0.12 * arm.side, sit), 6, dt);
      arm.elbow.rotation.z = eApproach(arm.elbow.rotation.z, lerp(0, -0.62 * arm.side, sit), 6, dt);
      if (sit > 0.5 && !reduceMotion) eX -= Math.max(0, Math.sin(t * 9 + i * 1.9)) * 0.1 * ((sit - 0.5) / 0.5);
      arm.elbow.rotation.x = eApproach(arm.elbow.rotation.x, eX, 12, dt);
    });

    // desk fade
    const deskFade = Math.max(0, Math.min(1, (sit - 0.2) / 0.5));
    deskGroup.visible = deskFade > 0.001;
    [desk, lapBase, lapScreen, lapGlow].forEach(m => { m.material.transparent = true; m.material.opacity = deskFade; });
    deskGroup.scale.setScalar(lerp(0.9, 1, deskFade));

    // dust
    dust.rotation.y = t * 0.014; dust.position.x = px * 0.3; dust.position.y = py * 0.2;

    renderer.render(scene, camera);
    if (!ready) { ready = true; canvas.classList.add('is-ready'); document.body.classList.add('hero-ready'); }
  }
  requestAnimationFrame(loop);
};

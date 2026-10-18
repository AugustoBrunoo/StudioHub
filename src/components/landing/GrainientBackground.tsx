import { useEffect, useRef } from 'react';

export function GrainientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false });
    if (!gl) return;

    const COLORS = ['#0a0a0a', '#17120a', '#4d3a0e', '#d4af37', '#f6e7ad'];
    const ANGLE = 55;
    const FLOW = 0.9;
    const SILK = 0.4;
    const GRAIN = 0.07;

    const VS = `#version 300 es
out vec2 v;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  v = p;
  gl_Position = vec4(p * 2. - 1., 0., 1.);
}`;

    const FS = `#version 300 es
precision highp float;
uniform float uA, uT, uR, uF;
uniform vec3 uRamp[8];
uniform int uN;
uniform vec2 uD;
uniform float uE;
in vec2 v;
out vec4 o;

vec2 h2(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * vec3(.1031, .103, .0973));
  q += dot(q, q.yzx + 33.33);
  return fract((q.xx + q.yz) * q.zy) * 2. - 1.;
}

float nz(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * f * (f * (f * 6. - 15.) + 10.);
  float a = dot(h2(i), f), b = dot(h2(i + vec2(1, 0)), f - vec2(1, 0)), c = dot(h2(i + vec2(0, 1)), f - vec2(0, 1)), d = dot(h2(i + vec2(1, 1)), f - vec2(1, 1));
  return .5 + .5 * mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec2 dr(vec2 p, float t) {
  vec2 w1 = vec2(nz(p * .85 + vec2(t * .11, t * .07)), nz(p * .85 + vec2(4.1, 1.7) - vec2(t * .08, t * .12)));
  vec2 w2 = vec2(nz(p * 1.55 + w1 * 1.8 + vec2(1.3, 7.1) + t * .05), nz(p * 1.55 + w1 * 1.8 + vec2(6.4, 2.2) - t * .06));
  return (w1 - .5) * 1.1 + (w2 - .5) * .55;
}

float cd(vec2 p, float s) {
  vec2 q = p + vec2(-uD.y, uD.x) * uT * .45;
  vec2 w = p + dr(q, uT) * ${FLOW.toFixed(2)} * s;
  return dot(w, uD) / uE + .5;
}

float hs(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * .1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

void main() {
  vec2 p = (v - .5) * vec2(uA, 1.);
  float s0 = min(1., uR * uR * (3. - 2. * uR));
  float raw = cd(p, s0);
  float s = clamp(raw, 0., 1.);
  float sc = s * float(uN - 1);
  int ix = int(min(floor(sc), float(uN - 2)));
  float f = sc - float(ix);
  float sh = smoothstep(0., 1., f);
  vec3 col = mix(uRamp[ix], uRamp[ix + 1], sh);
  vec2 g = vec2(cd(p + vec2(.004, 0.), s0) - raw, cd(p + vec2(0., .004), s0) - raw) / .004;
  vec2 sl = g * sin(3.14159 * clamp(raw, 0., 1.)) * ${SILK.toFixed(2)} * 4.;
  vec3 nr = normalize(vec3(-sl, 1.));
  vec3 lg = normalize(vec3(-uD.y, uD.x, 1.2));
  float df = dot(nr, lg) - lg.z;
  col = uRamp[0] + (col - uRamp[0]) * (1. + (df * .35 + max(df, 0.) * df * .6) * ${SILK.toFixed(2)});
  col = mix(uRamp[0], col, smoothstep(0., 1., uR * 1.5 - length(v - .5) * .6));
  vec2 px = gl_FragCoord.xy + uF * vec2(17., 59.);
  float gr = hs(px) + hs(px + 7.13) - 1.;
  float L = dot(col, vec3(.2126, .7152, .0722));
  col += gr * ${GRAIN.toFixed(3)} * (.45 + 2.2 * L * (1. - L));
  o = vec4(clamp(col, 0., 1.), 1.);
}`;

    const makeShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vs = makeShader(gl.VERTEX_SHADER, VS);
    const fs = makeShader(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;

    const pr = gl.createProgram();
    if (!pr) return;
    gl.attachShader(pr, vs);
    gl.attachShader(pr, fs);
    gl.linkProgram(pr);

    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const getU = (n: string) => gl.getUniformLocation(pr, n);
    const ramp = new Float32Array(24);
    const cv = document.createElement('canvas').getContext('2d');

    if (cv) {
      COLORS.forEach((h, i) => {
        cv.fillStyle = h;
        cv.fillRect(0, 0, 1, 1);
        const d = cv.getImageData(0, 0, 1, 1).data;
        ramp.set([d[0] / 255, d[1] / 255, d[2] / 255], i * 3);
      });
    }

    gl.uniform3fv(getU('uRamp'), ramp);
    gl.uniform1i(getU('uN'), COLORS.length);

    const r = (ANGLE * Math.PI) / 180;
    let asp = 1;

    const handleResize = () => {
      if (!canvas) return;
      const d = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * d;
      canvas.height = window.innerHeight * d;
      asp = window.innerWidth / window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(getU('uA'), asp);
      gl.uniform2f(getU('uD'), Math.sin(r), Math.cos(r));
      gl.uniform1f(getU('uE'), asp * Math.abs(Math.sin(r)) + Math.abs(Math.cos(r)));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let t = 0;
    let intro = prefersReducedMotion ? 1 : 0;
    let last = 0;
    let fr = 0;
    let gc = 0;
    let animId = 0;

    const tick = (n: number) => {
      const dt = last ? Math.min(0.05, (n - last) / 1000) : 0.016;
      last = n;
      if (!prefersReducedMotion) t += dt * 0.16;
      if (intro < 1) intro = Math.min(1, intro + dt / 1.8);

      gc += dt;
      if (!prefersReducedMotion && gc > 1 / 24) {
        gc = 0;
        fr = (fr + 1) % 97;
      }

      gl.uniform1f(getU('uT'), t);
      gl.uniform1f(getU('uR'), intro);
      gl.uniform1f(getU('uF'), fr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!document.hidden && !prefersReducedMotion) {
        animId = requestAnimationFrame(tick);
      } else {
        last = 0;
      }
    };

    animId = requestAnimationFrame(tick);

    const handleVisibility = () => {
      if (!document.hidden && !prefersReducedMotion) {
        last = 0;
        animId = requestAnimationFrame(tick);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      gl.deleteProgram(pr);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (vao) gl.deleteVertexArray(vao);
    };
  }, []);

  return (
    <>
      <canvas id="bg" ref={canvasRef} aria-hidden="true" />
      <div className="veil" />
      <div id="prog" />
    </>
  );
}

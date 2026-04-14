"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

type GL = Renderer['gl'];

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(gl: GL, text: string, font: string, color: string) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return { texture: new Texture(gl), width: 0, height: 0 };

  context.font = font;
  const metrics = context.measureText(text);
  canvas.width = Math.ceil(metrics.width) + 20;
  canvas.height = 100;

  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;

  return { texture, width: canvas.width, height: canvas.height };
}

interface TitleProps {
  gl: GL;
  plane: any;
  renderer: Renderer;
  text: string;
  textColor?: string;
  font?: string;
}

class Title {
  gl: GL;
  plane: any;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  mesh!: Mesh;

  constructor({ gl, plane, renderer, text, textColor = '#ffffff', font = '700 30px Outfit' }: TitleProps) {

    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;

    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);

    const geometry = new Plane(this.gl, { width: width / 150, height: height / 150 });
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(tMap, vUv);
        }
      `,
      uniforms: {
        tMap: { value: texture }
      },
      transparent: true
    });

    this.mesh = new Mesh(this.gl, { geometry, program });
  }

  update(parentMatrix: any) {
    this.mesh.matrix.copy(parentMatrix);
    this.mesh.position.y += 0.6;
    this.mesh.updateMatrixWorld();
  }
}

interface MediaProps {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
}

class Media {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius: number;
  font?: string;

  mesh!: Mesh;
  title!: Title;
  group!: Transform;
  
  extra: number = 0;
  width: number = 0;
  height: number = 0;
  x: number = 0;
  y: number = 0;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;

    this.createGroup();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createGroup() {
    this.group = new Transform();
    this.group.setParent(this.scene);
  }

  createMesh() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    
    // Safety check for image URL
    if (!this.image) return;

    // Robust video check
    const isVideo = this.image.toLocaleLowerCase().endsWith('.mp4') || 
                    this.image.toLocaleLowerCase().endsWith('.webm') ||
                    (this.image.includes('cloudinary') && this.image.includes('/video/upload/'));

    if (isVideo) {
      const video = document.createElement('video');
      video.src = this.image;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.play().catch(e => console.error("Video play failed:", e));
      texture.image = video;
    } else {
      const image = new Image();
      image.src = this.image;
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        texture.image = image;
      };
    }


    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uBend;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * uBend) * 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv;
          vec2 center = vec2(0.5);
          vec2 dist = abs(uv - center);
          float radius = uBorderRadius;
          
          if (dist.x > 0.5 - radius && dist.y > 0.5 - radius) {
            if (length(dist - (0.5 - radius)) > radius) {
              discard;
            }
          }
          gl_FragColor = texture2D(tMap, vUv);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uBend: { value: 0 },
        uBorderRadius: { value: this.borderRadius }
      }
    });

    this.mesh = new Mesh(this.gl, { geometry: this.geometry, program });
    this.mesh.setParent(this.group);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.mesh,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    });
    this.title.mesh.setParent(this.group);
  }

  update(scroll: { current: number; last: number }, direction: 'right' | 'left') {
    this.group.position.x = this.x - scroll.current - this.extra;

    const x = this.group.position.x;
    const H = this.viewport.width / 2;

    if (this.bend !== 0) {
      this.group.position.y = -(Math.sqrt(Math.max(0, Math.pow(H / Math.sin(Math.abs(this.bend) / 2), 2) - Math.pow(x, 2))) - (H / Math.tan(Math.abs(this.bend) / 2)));
      this.group.rotation.z = -Math.atan2(x, H / Math.tan(Math.abs(this.bend) / 2) + this.group.position.y);
    }

    this.mesh.program.uniforms.uBend.value = this.bend;

    const viewportOffset = this.viewport.width;
    if (direction === 'right' && x + this.width / 2 < -viewportOffset / 2) {
      this.extra += this.width * this.length;
    } else if (direction === 'left' && x - this.width / 2 > viewportOffset / 2) {
      this.extra -= this.width * this.length;
    }

    this.title.update(this.mesh.matrix);
    
    // Update video texture
    if (this.mesh.program.uniforms.tMap.value.image instanceof HTMLVideoElement) {
       this.mesh.program.uniforms.tMap.value.needsUpdate = true;
    }
  }

  onResize({ screen, viewport }: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    this.width = (this.viewport.width / 2.5);
    this.height = this.viewport.height * 0.7;

    this.mesh.scale.set(this.width, this.height, 1);
    this.x = (this.width + 0.5) * this.index;
  }
}

class App {
  container: HTMLElement;
  items: { image: string; text: string }[];
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  scrollSpeed: number;
  scrollEase: number;

  renderer: Renderer;
  gl: GL;
  camera: Camera;
  scene: Transform;
  geometry!: Plane;
  medias: Media[] = [];

  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  
  scroll = { ease: 0.05, current: 0, target: 0, last: 0, direction: 'right' as 'right' | 'left' };
  isDown = false;
  start = 0;
  raf: number = 0;

  constructor(container: HTMLElement, { items, bend, textColor, borderRadius, font, scrollSpeed = 1, scrollEase = 0.05 }: any) {
    this.container = container;
    this.items = items;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.scrollSpeed = scrollSpeed;
    this.scrollEase = scrollEase;
    this.scroll.ease = scrollEase;

    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl);
    this.camera.position.z = 5;

    this.scene = new Transform();

    autoBind(this);

    // Only start if we have a valid size
    if (this.container.clientWidth > 0) {
      this.init();
    } else {
      const checkSize = () => {
         if (this.container.clientWidth > 0) {
            this.init();
         } else {
            requestAnimationFrame(checkSize);
         }
      };
      checkSize();
    }
  }

  init() {
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.addEventListeners();
    this.update();
  }


  createGeometry() {
    this.geometry = new Plane(this.gl);
  }

  createMedias() {
    this.medias = this.items.map((item, index) => {
      return new Media({
        geometry: this.geometry,
        gl: this.gl,
        image: item.image,
        index,
        length: this.items.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: item.text,
        viewport: this.viewport,
        bend: this.bend,
        textColor: this.textColor,
        borderRadius: this.borderRadius,
        font: this.font
      });
    });
  }

  onResize() {
    if (!this.container) return;
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);

    this.camera.perspective({ aspect: this.gl.canvas.width / this.gl.canvas.height });

    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = { width, height };

    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  onTouchDown(e: any) {
    this.isDown = true;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
    this.scroll.last = this.scroll.current;
  }

  onTouchMove(e: any) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * 0.01 * this.scrollSpeed;
    this.scroll.target = this.scroll.last + distance;
  }

  onTouchUp() {
    this.isDown = false;
  }

  onWheel(e: any) {
    this.scroll.target += e.deltaY * 0.005 * this.scrollSpeed;
  }

  addEventListeners() {
    window.addEventListener('resize', debounce(this.onResize, 200));
    this.container.addEventListener('mousedown', this.onTouchDown);
    this.container.addEventListener('mousemove', this.onTouchMove);
    this.container.addEventListener('mouseup', this.onTouchUp);
    this.container.addEventListener('touchstart', this.onTouchDown);
    this.container.addEventListener('touchmove', this.onTouchMove);
    this.container.addEventListener('touchend', this.onTouchUp);
    this.container.addEventListener('wheel', this.onWheel);
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    this.scroll.direction = this.scroll.current > this.scroll.last ? 'right' : 'left';

    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, this.scroll.direction));
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    if (this.container) {
        this.container.removeEventListener('mousedown', this.onTouchDown);
        this.container.removeEventListener('mousemove', this.onTouchMove);
        this.container.removeEventListener('mouseup', this.onTouchUp);
        this.container.removeEventListener('touchstart', this.onTouchDown);
        this.container.removeEventListener('touchmove', this.onTouchMove);
        this.container.removeEventListener('touchend', this.onTouchUp);
        this.container.removeEventListener('wheel', this.onWheel);
    }
    if (this.gl && this.gl.canvas && this.gl.canvas.parentNode) {
      this.gl.canvas.parentNode.removeChild(this.gl.canvas);
    }
  }
}

interface CircularGalleryProps {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  onChange?: (index: number) => void;
}

export default function CircularGallery({
  items = [],
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = 'bold 30px Montserrat',
  scrollSpeed = 1,
  scrollEase = 0.05,
  onChange
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;
    
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase
    });
    
    appRef.current = app;

    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  // Handle active index detection based on scroll position
  useEffect(() => {
    if (!onChange || items.length === 0) return;

    let rafId: number;
    const checkActive = () => {
      const app = appRef.current;
      if (app) {
        // Calculate which item is closest to the center
        // Each item is spaced by (width + 0.5)
        const itemWidth = app.viewport.width / 2.5 + 0.5;
        const totalWidth = itemWidth * items.length;
        
        // Normalize scroll
        let normalizedScroll = app.scroll.current % totalWidth;
        if (normalizedScroll < 0) normalizedScroll += totalWidth;
        
        const index = Math.round(normalizedScroll / itemWidth) % items.length;
        onChange(index);
      }
      rafId = requestAnimationFrame(checkActive);
    };

    rafId = requestAnimationFrame(checkActive);
    return () => cancelAnimationFrame(rafId);
  }, [items.length, onChange]);

  return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />;
}


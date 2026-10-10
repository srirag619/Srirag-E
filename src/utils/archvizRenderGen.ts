/**
 * Architectural Visualization Procedural Renders & Clay Passes
 * Creates rich visual assets for ArchViz projects (Render & Clay AO passes).
 */

export function createArchvizCanvas(
  theme: 'villa' | 'interior' | 'museum' | 'penthouse' | 'desert' | 'pavilion',
  mode: 'render' | 'clay' = 'render'
): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const w = canvas.width;
  const h = canvas.height;

  if (mode === 'clay') {
    // Ambient Occlusion / Neutral Matte Clay Pass (classic architectural render pass)
    ctx.fillStyle = '#e4e4e7';
    ctx.fillRect(0, 0, w, h);

    // Subtle ambient gradient
    const clayGrad = ctx.createLinearGradient(0, 0, 0, h);
    clayGrad.addColorStop(0, '#f4f4f5');
    clayGrad.addColorStop(1, '#d4d4d8');
    ctx.fillStyle = clayGrad;
    ctx.fillRect(0, 0, w, h);

    // Architectural Wireframe / Facet Lines
    ctx.strokeStyle = '#a1a1aa';
    ctx.lineWidth = 1;

    // Ground plane
    ctx.beginPath();
    ctx.moveTo(0, h * 0.65);
    ctx.lineTo(w, h * 0.65);
    ctx.stroke();

    // Perspective guidelines
    for (let i = 0; i < w; i += 80) {
      ctx.beginPath();
      ctx.moveTo(i, h * 0.65);
      ctx.lineTo(i + (i - w / 2) * 0.6, h);
      ctx.stroke();
    }

    // Main Architectural Massing (Volumes in Clay)
    ctx.fillStyle = '#d4d4d8';
    ctx.strokeStyle = '#71717a';
    ctx.lineWidth = 1.5;

    // Volume 1
    ctx.fillRect(w * 0.2, h * 0.25, w * 0.45, h * 0.4);
    ctx.strokeRect(w * 0.2, h * 0.25, w * 0.45, h * 0.4);

    // Cantilever Volume 2
    ctx.fillStyle = '#e4e4e7';
    ctx.fillRect(w * 0.35, h * 0.15, w * 0.4, h * 0.25);
    ctx.strokeRect(w * 0.35, h * 0.15, w * 0.4, h * 0.25);

    // Window Mullions Grid
    ctx.strokeStyle = '#a1a1aa';
    for (let x = w * 0.25; x < w * 0.6; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, h * 0.3);
      ctx.lineTo(x, h * 0.6);
      ctx.stroke();
    }

    // Shadow AO gradient under cantilever
    const aoGrad = ctx.createLinearGradient(0, h * 0.4, 0, h * 0.55);
    aoGrad.addColorStop(0, 'rgba(39, 39, 42, 0.4)');
    aoGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = aoGrad;
    ctx.fillRect(w * 0.2, h * 0.4, w * 0.45, 90);

    // Clay stamp
    ctx.fillStyle = '#71717a';
    ctx.font = 'bold 16px Outfit, sans-serif';
    ctx.fillText('PASS: RAW CLAY // AMBIENT OCCLUSION', 40, 50);
    return canvas.toDataURL('image/jpeg', 0.9);
  }

  // PHOTOREALISTIC RENDER MODE
  if (theme === 'villa') {
    // Dusk Luxury Cliff Villa
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.65);
    sky.addColorStop(0, '#0f172a');
    sky.addColorStop(0.5, '#1e293b');
    sky.addColorStop(0.85, '#9a3412');
    sky.addColorStop(1, '#f97316');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h * 0.65);

    // Distant mountain
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.65);
    ctx.lineTo(w * 0.3, h * 0.45);
    ctx.lineTo(w * 0.7, h * 0.58);
    ctx.lineTo(w, h * 0.52);
    ctx.lineTo(w, h * 0.65);
    ctx.fill();

    // Infinity Pool
    const pool = ctx.createLinearGradient(0, h * 0.62, 0, h);
    pool.addColorStop(0, '#0284c7');
    pool.addColorStop(0.4, '#0369a1');
    pool.addColorStop(1, '#082f49');
    ctx.fillStyle = pool;
    ctx.fillRect(0, h * 0.62, w, h * 0.38);

    // Warm Pool submerged lights
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 25;
    for (let x = 180; x < w; x += 220) {
      ctx.beginPath();
      ctx.arc(x, h * 0.8, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Villa Architecture: Cast Concrete Cantilever
    ctx.fillStyle = '#1e2129';
    ctx.fillRect(w * 0.18, h * 0.22, w * 0.6, h * 0.42);

    // Upper Balcony Deck
    ctx.fillStyle = '#2d313d';
    ctx.fillRect(w * 0.12, h * 0.32, w * 0.52, 24);

    // Floor-to-ceiling glass salon with golden interior glow
    const intGlow = ctx.createLinearGradient(w * 0.22, 0, w * 0.65, 0);
    intGlow.addColorStop(0, 'rgba(254, 243, 199, 0.95)');
    intGlow.addColorStop(0.6, 'rgba(251, 191, 36, 0.9)');
    intGlow.addColorStop(1, 'rgba(245, 158, 11, 0.7)');
    ctx.fillStyle = intGlow;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 40;
    ctx.fillRect(w * 0.24, h * 0.36, w * 0.48, h * 0.26);
    ctx.shadowBlur = 0;

    // Minimalist Mullions
    ctx.fillStyle = '#090a0d';
    for (let x = w * 0.24; x < w * 0.72; x += 70) {
      ctx.fillRect(x, h * 0.36, 6, h * 0.26);
    }

    // Elegant pendant lights inside salon
    ctx.fillStyle = '#ffffff';
    for (let x = w * 0.3; x < w * 0.65; x += 90) {
      ctx.fillRect(x, h * 0.38, 2, 22);
      ctx.beginPath();
      ctx.arc(x + 1, h * 0.38 + 22, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Travertine Poolside Deck
    ctx.fillStyle = '#e7e5e4';
    ctx.fillRect(w * 0.1, h * 0.62, w * 0.8, 18);
  } else if (theme === 'interior') {
    // Scandinavian Concrete & Oak Pavilion Interior
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 0, w, h);

    // Concrete Wall Texture
    const wallGrad = ctx.createLinearGradient(0, 0, w, 0);
    wallGrad.addColorStop(0, '#27272a');
    wallGrad.addColorStop(0.7, '#3f3f46');
    wallGrad.addColorStop(1, '#18181b');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, w * 0.45, h * 0.75);

    // Massive Panoramic Window on right with forest morning light
    const windowGrad = ctx.createLinearGradient(w * 0.45, 0, w, 0);
    windowGrad.addColorStop(0, '#fef9c3');
    windowGrad.addColorStop(0.4, '#dcfce7');
    windowGrad.addColorStop(1, '#86efac');
    ctx.fillStyle = windowGrad;
    ctx.shadowColor = '#fef08a';
    ctx.shadowBlur = 50;
    ctx.fillRect(w * 0.45, 0, w * 0.55, h * 0.75);
    ctx.shadowBlur = 0;

    // Sunlight god-rays diagonally across room
    ctx.fillStyle = 'rgba(254, 240, 138, 0.15)';
    ctx.beginPath();
    ctx.moveTo(w * 0.5, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w * 0.8, h);
    ctx.lineTo(w * 0.1, h);
    ctx.fill();

    // Herringbone Travertine Floor
    const floor = ctx.createLinearGradient(0, h * 0.65, 0, h);
    floor.addColorStop(0, '#d6d3d1');
    floor.addColorStop(1, '#78716c');
    ctx.fillStyle = floor;
    ctx.fillRect(0, h * 0.65, w, h * 0.35);

    // Low-profile Linen Sofa
    ctx.fillStyle = '#f5f5f4';
    ctx.fillRect(w * 0.15, h * 0.62, w * 0.35, 80);
    ctx.fillStyle = '#e7e5e4';
    ctx.fillRect(w * 0.15, h * 0.54, 30, 90); // Armrest
    ctx.fillRect(w * 0.47, h * 0.54, 30, 90); // Armrest

    // Oak Floating Joinery Credenza
    ctx.fillStyle = '#92400e';
    ctx.fillRect(w * 0.05, h * 0.45, w * 0.35, 45);
    // Ceramic sculptural vase
    ctx.fillStyle = '#fafaf9';
    ctx.beginPath();
    ctx.arc(w * 0.12, h * 0.41, 16, 0, Math.PI * 2);
    ctx.fill();
  } else if (theme === 'museum') {
    // Cultural Museum with Parametric Titanium Facade
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    sky.addColorStop(0, '#475569');
    sky.addColorStop(0.7, '#94a3b8');
    sky.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Calm Water Basin Mirroring Facade
    const basin = ctx.createLinearGradient(0, h * 0.58, 0, h);
    basin.addColorStop(0, '#334155');
    basin.addColorStop(1, '#0f172a');
    ctx.fillStyle = basin;
    ctx.fillRect(0, h * 0.58, w, h * 0.42);

    // Sculptural Organic Facade Curves (Bronze / Titanium)
    const bronze = ctx.createLinearGradient(w * 0.1, 0, w * 0.9, h);
    bronze.addColorStop(0, '#b45309');
    bronze.addColorStop(0.3, '#d97706');
    bronze.addColorStop(0.6, '#78350f');
    bronze.addColorStop(1, '#451a03');
    ctx.fillStyle = bronze;

    ctx.beginPath();
    ctx.moveTo(w * 0.1, h * 0.58);
    ctx.bezierCurveTo(w * 0.15, h * 0.15, w * 0.4, h * 0.05, w * 0.55, h * 0.22);
    ctx.bezierCurveTo(w * 0.7, h * 0.38, w * 0.85, h * 0.12, w * 0.92, h * 0.58);
    ctx.closePath();
    ctx.fill();

    // Curved Panel Grooves (Parametric Seams)
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.lineWidth = 2;
    for (let x = w * 0.2; x < w * 0.85; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x, h * 0.2);
      ctx.lineTo(x + 20, h * 0.58);
      ctx.stroke();
    }

    // Glass Entryway with Warm Welcoming Glow
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#fde047';
    ctx.shadowBlur = 30;
    ctx.fillRect(w * 0.42, h * 0.48, w * 0.16, h * 0.1);
    ctx.shadowBlur = 0;

    // Subtle Human Figures for Architectural Scale
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(w * 0.38, h * 0.54, 4, 20);
    ctx.beginPath();
    ctx.arc(w * 0.38 + 2, h * 0.53, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(w * 0.4, h * 0.54, 4, 19);
    ctx.beginPath();
    ctx.arc(w * 0.4 + 2, h * 0.53, 2.8, 0, Math.PI * 2);
    ctx.fill();
  } else if (theme === 'penthouse') {
    // Luxury Penthouse Salon at Twilight
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    sky.addColorStop(0, '#0f172a');
    sky.addColorStop(0.6, '#312e81');
    sky.addColorStop(1, '#db2777');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h * 0.5);

    // Glowing Skyline in distance
    ctx.fillStyle = '#1e1b4b';
    for (let x = 0; x < w; x += 30) {
      const bh = Math.sin(x * 0.1) * 60 + 80;
      ctx.fillRect(x, h * 0.5 - bh, 24, bh);
    }

    // Penthouse Interior Terrazzo & Dark Walnut
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, h * 0.5, w, h * 0.5);

    // Marble Kitchen Island with brass barstools
    ctx.fillStyle = '#fafaf9';
    ctx.fillRect(w * 0.5, h * 0.58, w * 0.35, 90);
    // Marble veining
    ctx.strokeStyle = '#a8a29e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w * 0.52, h * 0.6);
    ctx.lineTo(w * 0.8, h * 0.65);
    ctx.stroke();

    // Architectural Linear Chandelier
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 20;
    ctx.fillRect(w * 0.55, h * 0.45, w * 0.25, 4);
    ctx.shadowBlur = 0;
  } else if (theme === 'desert') {
    // Rammed Earth Desert Residence
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    sky.addColorStop(0, '#1e1b4b');
    sky.addColorStop(0.5, '#7c2d12');
    sky.addColorStop(1, '#ea580c');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Red Rock Cliffs in distance
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.55);
    ctx.lineTo(w * 0.4, h * 0.3);
    ctx.lineTo(w * 0.7, h * 0.45);
    ctx.lineTo(w, h * 0.38);
    ctx.lineTo(w, h * 0.6);
    ctx.fill();

    // Desert Sand Ground
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, h * 0.6, w, h * 0.4);

    // Rammed Earth Walls (Striated strata)
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#9a3412' : '#c2410c';
      ctx.fillRect(w * 0.2, h * 0.35 + i * 25, w * 0.6, 25);
    }

    // Sunken Firepit with flame
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.82, 90, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    // Flame
    ctx.fillStyle = '#f97316';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.8, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  } else {
    // Brutalist Pavilion
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    sky.addColorStop(0, '#0284c7');
    sky.addColorStop(1, '#bae6fd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Concrete Structure
    ctx.fillStyle = '#52525b';
    ctx.fillRect(w * 0.15, h * 0.25, w * 0.7, h * 0.4);
    ctx.fillStyle = '#27272a';
    ctx.fillRect(w * 0.25, h * 0.35, w * 0.5, h * 0.3);
  }

  // Camera Meta Stamp in corner
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '500 13px Outfit, sans-serif';
  ctx.fillText('AURA VIZ // 4K CGI RENDER · CORONA 11', 40, h - 30);

  return canvas.toDataURL('image/jpeg', 0.92);
}

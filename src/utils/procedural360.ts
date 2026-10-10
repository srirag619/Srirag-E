/**
 * Procedural Equirectangular Panorama Generator
 * Generates rich architectural 360° environments directly on an HTML5 canvas.
 * Equirectangular format: 2:1 ratio (width: 2048, height: 1024), where x maps to yaw (-180° to 180°)
 * and y maps to pitch (-90° to 90°).
 */

export function generateArchitecturalPanorama(sceneType: 'penthouse' | 'pavilion' | 'nordic' | 'atrium'): string {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const midY = height / 2;

  if (sceneType === 'penthouse') {
    // 1. SKY & CITY HORIZON (Upper & Mid)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, midY);
    skyGrad.addColorStop(0, '#0c1020');
    skyGrad.addColorStop(0.5, '#1e243d');
    skyGrad.addColorStop(0.85, '#e07a5f');
    skyGrad.addColorStop(1, '#f4a261');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, midY);

    // City Skyline Silhouette along horizon (x = 0 to 2048)
    ctx.fillStyle = '#0f1422';
    for (let x = 0; x < width; x += 16) {
      const bHeight = Math.sin(x * 0.05) * 40 + Math.cos(x * 0.12) * 25 + 70;
      ctx.fillRect(x, midY - bHeight, 14, bHeight);
      
      // Building window lights
      if (Math.sin(x * 0.3) > 0.2) {
        ctx.fillStyle = '#fef08a';
        for (let wy = midY - bHeight + 10; wy < midY - 10; wy += 8) {
          if (Math.sin(wy + x) > 0) {
            ctx.fillRect(x + 2, wy, 2, 3);
            ctx.fillRect(x + 8, wy, 2, 3);
          }
        }
        ctx.fillStyle = '#0f1422';
      }
    }

    // Stars in night zenith
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let i = 0; i < 200; i++) {
      const sx = (i * 97) % width;
      const sy = ((i * 47) % (midY * 0.6));
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }

    // 2. CEILING (Upper 0 to 25% of height)
    const ceilingGrad = ctx.createLinearGradient(0, 0, 0, height * 0.3);
    ceilingGrad.addColorStop(0, '#121316');
    ceilingGrad.addColorStop(0.7, '#1c1d22');
    ceilingGrad.addColorStop(1, 'rgba(28, 29, 34, 0.9)');
    ctx.fillStyle = ceilingGrad;
    ctx.fillRect(0, 0, width, height * 0.25);

    // Recessed architectural linear downlights in ceiling
    ctx.fillStyle = '#fffbeb';
    ctx.shadowColor = '#fef3c7';
    ctx.shadowBlur = 12;
    for (let x = 100; x < width; x += 300) {
      ctx.fillRect(x, height * 0.12, 160, 4);
    }
    ctx.shadowBlur = 0;

    // 3. ARCHITECTURAL INTERIOR FLOOR (Lower 50% to 100%)
    const floorGrad = ctx.createLinearGradient(0, midY, 0, height);
    floorGrad.addColorStop(0, '#18191e');
    floorGrad.addColorStop(0.4, '#22232a');
    floorGrad.addColorStop(1, '#111216');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, midY, width, height - midY);

    // Terrazzo / Large Format Tiles Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1.5;
    // Perspective grid lines radiating down
    for (let x = 0; x < width; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, midY);
      ctx.lineTo(x + (x - width / 2) * 0.4, height);
      ctx.stroke();
    }
    for (let y = midY; y < height; y += (y - midY) * 0.35 + 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 4. ARCHITECTURAL COLUMNS & MULLIONS
    ctx.fillStyle = '#1e2026';
    for (let x = 200; x < width; x += 512) {
      // Slender structural glass mullions
      ctx.fillStyle = 'rgba(15, 16, 20, 0.95)';
      ctx.fillRect(x - 8, height * 0.2, 16, height * 0.45);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.strokeRect(x - 8, height * 0.2, 16, height * 0.45);
    }

    // Minimalist furniture silhouette (Lounge sofa & travertine cocktail table)
    ctx.fillStyle = '#1c1d22';
    ctx.fillRect(width * 0.35, height * 0.65, 300, 110);
    // Sofa cushions
    ctx.fillStyle = '#2d2f38';
    ctx.fillRect(width * 0.36, height * 0.66, 140, 60);
    ctx.fillRect(width * 0.435, height * 0.66, 140, 60);

    // Designer low marble table
    ctx.fillStyle = '#44403c';
    ctx.fillRect(width * 0.38, height * 0.79, 180, 40);
    ctx.fillStyle = '#e7e5e4';
    ctx.fillRect(width * 0.38, height * 0.79, 180, 8); // Travertine marble top
  } else if (sceneType === 'pavilion') {
    // BRUTALIST CONCRETE PAVILION WITH REFLECTING POOL
    // Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, midY);
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(0.6, '#bae6fd');
    skyGrad.addColorStop(1, '#fed7aa');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, midY);

    // Warm Sun in sky
    ctx.fillStyle = 'rgba(255, 251, 235, 0.9)';
    ctx.shadowColor = '#fef08a';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(width * 0.65, midY * 0.5, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Concrete Overhang Beams (Coffered ceiling)
    ctx.fillStyle = '#27272a';
    ctx.fillRect(0, 0, width, height * 0.3);
    for (let x = 0; x < width; x += 180) {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(x, 0, 24, height * 0.3);
    }

    // Ground: Split between board-formed concrete terrace and water reflecting basin
    ctx.fillStyle = '#3f3f46';
    ctx.fillRect(0, midY, width, height - midY);

    // Reflecting Pool
    const poolGrad = ctx.createLinearGradient(0, midY + 40, 0, height);
    poolGrad.addColorStop(0, '#0284c7');
    poolGrad.addColorStop(0.5, '#0369a1');
    poolGrad.addColorStop(1, '#075985');
    ctx.fillStyle = poolGrad;
    ctx.fillRect(width * 0.1, midY + 40, width * 0.8, height - (midY + 40));

    // Water ripple highlights
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1;
    for (let y = midY + 50; y < height; y += 18) {
      ctx.beginPath();
      ctx.moveTo(width * 0.1, y);
      ctx.lineTo(width * 0.9, y);
      ctx.stroke();
    }

    // Heavy Brutalist Concrete Columns
    for (let x = 150; x < width; x += 480) {
      ctx.fillStyle = '#52525b';
      ctx.fillRect(x, height * 0.2, 90, height * 0.5);
      // Shadow side
      ctx.fillStyle = '#27272a';
      ctx.fillRect(x + 60, height * 0.2, 30, height * 0.5);
    }
  } else if (sceneType === 'nordic') {
    // NORDIC TIMBER VILLA & FJORD SUNSET
    const sunsetGrad = ctx.createLinearGradient(0, 0, 0, midY);
    sunsetGrad.addColorStop(0, '#4338ca');
    sunsetGrad.addColorStop(0.4, '#a855f7');
    sunsetGrad.addColorStop(0.7, '#f43f5e');
    sunsetGrad.addColorStop(1, '#fbbf24');
    ctx.fillStyle = sunsetGrad;
    ctx.fillRect(0, 0, width, midY);

    // Distant mountain ridge
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.moveTo(0, midY);
    for (let x = 0; x <= width; x += 40) {
      const mh = Math.sin(x * 0.015) * 60 + Math.cos(x * 0.035) * 35 + 40;
      ctx.lineTo(x, midY - mh);
    }
    ctx.lineTo(width, midY);
    ctx.fill();

    // Timber slats ceiling
    ctx.fillStyle = '#451a03';
    ctx.fillRect(0, 0, width, height * 0.28);
    ctx.fillStyle = '#78350f';
    for (let x = 0; x < width; x += 20) {
      ctx.fillRect(x, 0, 14, height * 0.28);
    }

    // Wide Oak Plank Flooring
    ctx.fillStyle = '#b45309';
    ctx.fillRect(0, midY, width, height - midY);
    ctx.fillStyle = '#92400e';
    for (let y = midY; y < height; y += 32) {
      ctx.fillRect(0, y, width, 2);
    }

    // Floor-to-ceiling glass wall framework
    ctx.fillStyle = '#18181b';
    for (let x = 240; x < width; x += 480) {
      ctx.fillRect(x, height * 0.25, 20, height * 0.5);
    }

    // Wood burning suspended fireplace
    ctx.fillStyle = '#09090b';
    ctx.fillRect(width * 0.72, height * 0.1, 14, height * 0.55); // Flue
    ctx.beginPath();
    ctx.arc(width * 0.72 + 7, height * 0.65, 45, 0, Math.PI * 2); // Hearth
    ctx.fill();
    // Fire glow
    ctx.fillStyle = '#f97316';
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(width * 0.72 + 7, height * 0.65, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  } else {
    // ATRIUM ZEN COURTYARD
    // Skylight Glass Roof
    const skyGrad = ctx.createLinearGradient(0, 0, 0, midY);
    skyGrad.addColorStop(0, '#e0f2fe');
    skyGrad.addColorStop(0.5, '#bae6fd');
    skyGrad.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, midY);

    // Geometric Skylight Web
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    for (let x = 0; x < width; x += 150) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 80, height * 0.25);
      ctx.stroke();
    }

    // Upper Balconies with warm timber railing
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, height * 0.25, width, 40);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(0, height * 0.25, width, 6);

    // Ground: Gravel Zen Garden & Slate Stepping Stones
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, midY, width, height - midY);

    // Concentric gravel raking circles
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    for (let r = 20; r < 350; r += 20) {
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.75, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Lush Japanese Maple Trees (silhouettes & leaves)
    ctx.fillStyle = '#991b1b'; // Crimson foliage
    for (let i = 0; i < 4; i++) {
      const tx = width * 0.25 + i * 280;
      ctx.beginPath();
      ctx.arc(tx, midY + 30, 70, 0, Math.PI * 2);
      ctx.fill();
      // Trunk
      ctx.fillStyle = '#292524';
      ctx.fillRect(tx - 6, midY + 40, 12, 110);
      ctx.fillStyle = '#991b1b';
    }
  }

  // Architectural stamp in panorama metadata
  ctx.font = '14px Outfit, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillText(`360° EQUIRECTANGULAR SPATIAL TOUR — ${sceneType.toUpperCase()} — 4K CALIBRATED`, 40, height - 30);

  return canvas.toDataURL('image/jpeg', 0.92);
}

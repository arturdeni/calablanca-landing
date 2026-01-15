import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(SplitText, CustomEase);

/**
 * Inicializa la animación del loader
 * - Desplaza thumbnails horizontalmente
 * - Escala imagen central a fullscreen
 * - Revela el contenido del Hero con SplitText
 */
export function initLoader() {
  const loader = document.querySelector('[data-loader]');
  const hero = document.querySelector('[data-hero]');

  if (!loader || !hero) return;

  // Elementos del loader
  const revealImages = loader.querySelectorAll('.loader__group > *');
  const scalingMedia = loader.querySelectorAll('.loader__media');
  const scaleDownImages = loader.querySelectorAll('.loader__img.is--scale-down');
  const radiusMedia = loader.querySelectorAll('.loader__media.is--scaling.is--radius');

  // Elementos del hero a revelar
  const heroTitle = hero.querySelector('[data-hero-title]');
  const heroSubtitle = hero.querySelector('[data-hero-subtitle]');
  const heroIntro = hero.querySelector('[data-hero-intro]');

  // Ocultar contenido del Hero inicialmente
  gsap.set([heroTitle, heroSubtitle, heroIntro].filter(Boolean), {
    visibility: 'hidden',
  });

  // Timeline principal
  const tl = gsap.timeline({
    defaults: {
      ease: 'expo.inOut',
    },
    onStart: () => {
      loader.classList.remove('is--hidden');
      document.body.classList.add('is--loading');
    },
  });

  // SplitText para el título
  let splitTitle;
  if (heroTitle) {
    splitTitle = new SplitText(heroTitle, {
      type: 'words',
      mask: 'words',
    });

    gsap.set(splitTitle.words, {
      yPercent: 110,
    });
  }

  // 1. Desplazamiento horizontal de thumbnails
  if (revealImages.length) {
    tl.fromTo(
      revealImages,
      { xPercent: 500 },
      {
        xPercent: -500,
        duration: 2.5,
        stagger: 0.05,
      }
    );
  }

  // 2. Escalar imágenes laterales hacia abajo
  if (scaleDownImages.length) {
    tl.to(
      scaleDownImages,
      {
        scale: 0.5,
        duration: 2,
        stagger: {
          each: 0.05,
          from: 'edges',
          ease: 'none',
        },
        onComplete: () => {
          if (radiusMedia.length) {
            radiusMedia.forEach((el) => el.classList.remove('is--radius'));
          }
        },
      },
      '-=0.1'
    );
  }

  // 3. Expandir imagen central a fullscreen
  if (scalingMedia.length) {
    tl.fromTo(
      scalingMedia,
      {
        width: '10em',
        height: '10em',
      },
      {
        width: '100vw',
        height: '100dvh',
        duration: 2,
      },
      '< 0.5'
    );
  }

  // 4. Fade out del loader background y reveal del contenido
  tl.to(
    loader,
    {
      backgroundColor: 'transparent',
      duration: 0.5,
      onStart: () => {
        // Hacer visible el contenido del hero
        gsap.set([heroTitle, heroSubtitle, heroIntro].filter(Boolean), {
          visibility: 'visible',
        });
      },
    },
    '-=0.5'
  );

  // 5. Fade out de la imagen del loader (revela el Hero debajo)
  const loaderScalingImg = loader.querySelector('.loader__media.is--scaling .loader__img');
  if (loaderScalingImg) {
    tl.to(
      loaderScalingImg,
      {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      },
      '-=0.3'
    );
  }

  // 6. Revelar título del Hero (palabra por palabra)
  if (splitTitle && splitTitle.words.length) {
    tl.to(
      splitTitle.words,
      {
        yPercent: 0,
        stagger: 0.075,
        ease: 'expo.out',
        duration: 1,
      },
      '-=0.6'
    );
  }

  // 7. Revelar subtítulo e intro en paralelo
  if (heroSubtitle) {
    tl.from(
      heroSubtitle,
      {
        opacity: 0,
        y: 20,
        ease: 'expo.out',
        duration: 0.8,
      },
      '-=0.7'
    );
  }

  if (heroIntro) {
    tl.from(
      heroIntro,
      {
        opacity: 0,
        y: 20,
        ease: 'expo.out',
        duration: 0.8,
      },
      '-=0.7'
    );
  }

  // 10. Finalizar y limpiar
  tl.call(() => {
    loader.classList.remove('is--loading');
    loader.classList.add('is--done');
    document.body.classList.remove('is--loading');

    // Eliminar loader del DOM
    setTimeout(() => {
      loader.remove();
    }, 100);
  });
}

// Inicializar cuando el DOM y las fuentes estén listas
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.fonts.ready.then(() => {
      initLoader();
    });
  });
}

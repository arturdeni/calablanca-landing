import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * Configuración de animación por tipo de split
 */
const splitConfig = {
  lines: { duration: 0.8, stagger: 0.08 },
  words: { duration: 0.6, stagger: 0.06 },
  chars: { duration: 0.4, stagger: 0.01 },
};

/**
 * Inicializa animaciones de reveal con máscara para elementos de texto
 * Usa SplitText para dividir el texto y ScrollTrigger para activar en scroll
 *
 * @param {string} selector - Selector CSS de los elementos a animar (default: '[data-text-reveal]')
 * @param {Object} options - Opciones de configuración
 * @param {string} options.type - Tipo de split: 'lines' | 'words' | 'chars' (default: 'lines')
 * @param {string} options.start - Posición de inicio del ScrollTrigger (default: 'top 80%')
 * @param {boolean} options.once - Si la animación solo se ejecuta una vez (default: true)
 */
export function initTextReveal(selector = '[data-text-reveal]', options = {}) {
  const elements = document.querySelectorAll(selector);

  if (!elements.length) return;

  elements.forEach((element) => {
    // Leer tipo desde data-attribute o usar el de options
    const type = element.dataset.textReveal || options.type || 'lines';
    const start = options.start || 'top 80%';
    const once = options.once !== undefined ? options.once : true;

    // Determinar qué tipos necesitamos splitear
    const typesToSplit =
      type === 'lines'
        ? ['lines']
        : type === 'words'
          ? ['lines', 'words']
          : ['lines', 'words', 'chars'];

    // Mostrar elemento antes de animar (estaba oculto por CSS)
    gsap.set(element, { autoAlpha: 1 });

    // Crear split y animación
    SplitText.create(element, {
      type: typesToSplit.join(', '),
      mask: 'lines',
      autoSplit: true,
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char',
      onSplit: (instance) => {
        const targets = instance[type];
        const config = splitConfig[type];

        return gsap.from(targets, {
          yPercent: 110,
          duration: config.duration,
          stagger: config.stagger,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: element,
            start: `clamp(${start})`,
            once: once,
          },
        });
      },
    });
  });
}

/**
 * Inicializa text reveal cuando el DOM y las fuentes estén listas
 * Usar esta función para inicialización automática
 */
export function initTextRevealOnReady(selector, options) {
  if (typeof window === 'undefined') return;

  document.addEventListener('DOMContentLoaded', () => {
    document.fonts.ready.then(() => {
      initTextReveal(selector, options);
    });
  });
}

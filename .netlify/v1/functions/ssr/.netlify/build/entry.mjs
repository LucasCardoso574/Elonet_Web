import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_DBqxkSHv.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/config.yml.astro.mjs');
const _page2 = () => import('./pages/admin/login.astro.mjs');
const _page3 = () => import('./pages/admin.astro.mjs');
const _page4 = () => import('./pages/api/admin/login.astro.mjs');
const _page5 = () => import('./pages/aviso-de-privacidade.astro.mjs');
const _page6 = () => import('./pages/casos-de-sucesso.astro.mjs');
const _page7 = () => import('./pages/contato.astro.mjs');
const _page8 = () => import('./pages/noticias/_slug_.astro.mjs');
const _page9 = () => import('./pages/noticias.astro.mjs');
const _page10 = () => import('./pages/quem-somos.astro.mjs');
const _page11 = () => import('./pages/solucoes.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/config.yml.ts", _page1],
    ["src/pages/admin/login.astro", _page2],
    ["src/pages/admin.astro", _page3],
    ["src/pages/api/admin/login.ts", _page4],
    ["src/pages/aviso-de-privacidade.astro", _page5],
    ["src/pages/casos-de-sucesso.astro", _page6],
    ["src/pages/contato.astro", _page7],
    ["src/pages/noticias/[slug].astro", _page8],
    ["src/pages/noticias.astro", _page9],
    ["src/pages/quem-somos.astro", _page10],
    ["src/pages/solucoes.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "b3521deb-a063-4ab2-89df-b7314b3af072"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

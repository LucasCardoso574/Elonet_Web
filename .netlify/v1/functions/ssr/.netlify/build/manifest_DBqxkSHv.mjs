import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_C_C_KYyi.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Elonet/Desktop/Elonet%20Website/elonet-website/","cacheDir":"file:///C:/Users/Elonet/Desktop/Elonet%20Website/elonet-website/node_modules/.astro/","outDir":"file:///C:/Users/Elonet/Desktop/Elonet%20Website/elonet-website/dist/","srcDir":"file:///C:/Users/Elonet/Desktop/Elonet%20Website/elonet-website/src/","publicDir":"file:///C:/Users/Elonet/Desktop/Elonet%20Website/elonet-website/public/","buildClientDir":"file:///C:/Users/Elonet/Desktop/Elonet%20Website/elonet-website/dist/","buildServerDir":"file:///C:/Users/Elonet/Desktop/Elonet%20Website/elonet-website/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/config.yml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/config.yml","isIndex":false,"type":"endpoint","pattern":"^\\/admin\\/config\\.yml\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"config.yml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/config.yml.ts","pathname":"/admin/config.yml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/login","isIndex":false,"type":"page","pattern":"^\\/admin\\/login\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/login.astro","pathname":"/admin/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"aviso-de-privacidade/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/aviso-de-privacidade","isIndex":false,"type":"page","pattern":"^\\/aviso-de-privacidade\\/?$","segments":[[{"content":"aviso-de-privacidade","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aviso-de-privacidade.astro","pathname":"/aviso-de-privacidade","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"casos-de-sucesso/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/casos-de-sucesso","isIndex":false,"type":"page","pattern":"^\\/casos-de-sucesso\\/?$","segments":[[{"content":"casos-de-sucesso","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/casos-de-sucesso.astro","pathname":"/casos-de-sucesso","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contato/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contato","isIndex":false,"type":"page","pattern":"^\\/contato\\/?$","segments":[[{"content":"contato","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contato.astro","pathname":"/contato","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"noticias/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/noticias","isIndex":false,"type":"page","pattern":"^\\/noticias\\/?$","segments":[[{"content":"noticias","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/noticias.astro","pathname":"/noticias","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"quem-somos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/quem-somos","isIndex":false,"type":"page","pattern":"^\\/quem-somos\\/?$","segments":[[{"content":"quem-somos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/quem-somos.astro","pathname":"/quem-somos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"solucoes/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/solucoes","isIndex":false,"type":"page","pattern":"^\\/solucoes\\/?$","segments":[[{"content":"solucoes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/solucoes.astro","pathname":"/solucoes","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/login","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/login\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/login.ts","pathname":"/api/admin/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/admin/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/components/LatestNewsCard.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/noticias.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/noticias@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/noticias/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/noticias/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/aviso-de-privacidade.astro",{"propagation":"none","containsHead":true}],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/casos-de-sucesso.astro",{"propagation":"none","containsHead":true}],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/contato.astro",{"propagation":"none","containsHead":true}],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/quem-somos.astro",{"propagation":"none","containsHead":true}],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/solucoes.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/admin/config.yml@_@ts":"pages/admin/config.yml.astro.mjs","\u0000@astro-page:src/pages/admin/login@_@astro":"pages/admin/login.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/admin/login@_@ts":"pages/api/admin/login.astro.mjs","\u0000@astro-page:src/pages/aviso-de-privacidade@_@astro":"pages/aviso-de-privacidade.astro.mjs","\u0000@astro-page:src/pages/casos-de-sucesso@_@astro":"pages/casos-de-sucesso.astro.mjs","\u0000@astro-page:src/pages/contato@_@astro":"pages/contato.astro.mjs","\u0000@astro-page:src/pages/noticias/[slug]@_@astro":"pages/noticias/_slug_.astro.mjs","\u0000@astro-page:src/pages/noticias@_@astro":"pages/noticias.astro.mjs","\u0000@astro-page:src/pages/quem-somos@_@astro":"pages/quem-somos.astro.mjs","\u0000@astro-page:src/pages/solucoes@_@astro":"pages/solucoes.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DBqxkSHv.mjs","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","C:\\Users\\Elonet\\Desktop\\Elonet Website\\elonet-website\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","\u0000astro:assets":"chunks/_astro_assets_j5PuJSeI.mjs","C:\\Users\\Elonet\\Desktop\\Elonet Website\\elonet-website\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_D4T4lFpu.mjs","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/admin.astro?astro&type=script&index=1&lang.ts":"_astro/admin.astro_astro_type_script_index_1_lang.ClYIQhV0.js","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.DDCNxuYb.js","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.CU6Cbl9j.js","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/admin.astro?astro&type=script&index=0&lang.ts":"_astro/admin.astro_astro_type_script_index_0_lang.Be9Uh6Vq.js","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/admin.astro?astro&type=script&index=2&lang.ts":"_astro/admin.astro_astro_type_script_index_2_lang.Bx09iqXp.js","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/casos-de-sucesso.astro?astro&type=script&index=0&lang.ts":"_astro/casos-de-sucesso.astro_astro_type_script_index_0_lang.BYozSLqi.js","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/contato.astro?astro&type=script&index=0&lang.ts":"_astro/contato.astro_astro_type_script_index_0_lang.h-ny3LKu.js","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/noticias.astro?astro&type=script&index=0&lang.ts":"_astro/noticias.astro_astro_type_script_index_0_lang.h-ny3LKu.js","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/quem-somos.astro?astro&type=script&index=0&lang.ts":"_astro/quem-somos.astro_astro_type_script_index_0_lang.BHNnkA9g.js","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/solucoes.astro?astro&type=script&index=0&lang.ts":"_astro/solucoes.astro_astro_type_script_index_0_lang.CPlBB55k.js","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.Bn4sqtrD.js","C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/components/HistoryCarousel.astro?astro&type=script&index=0&lang.ts":"_astro/HistoryCarousel.astro_astro_type_script_index_0_lang.DsagE4X7.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"login-form\"),i=document.getElementById(\"error-message\"),c=document.getElementById(\"blocked-message\"),r=document.getElementById(\"attempts-warning\"),o=s.querySelector('button[type=\"submit\"]');function n(){const t=sessionStorage.getItem(\"login-blocked-until\");if(!t)return!1;const e=Date.now(),l=parseInt(t);if(e<l){const a=Math.ceil((l-e)/6e4);return c.textContent=`🔒 Acesso bloqueado por ${a} minuto${a>1?\"s\":\"\"} devido a múltiplas tentativas falhas.`,c.classList.add(\"show\"),s.style.pointerEvents=\"none\",s.style.opacity=\"0.6\",o.disabled=!0,!0}else return sessionStorage.removeItem(\"login-blocked-until\"),sessionStorage.removeItem(\"login-attempts\"),c.classList.remove(\"show\"),s.style.pointerEvents=\"auto\",s.style.opacity=\"1\",o.disabled=!1,!1}function m(){return parseInt(sessionStorage.getItem(\"login-attempts\")||\"0\")}function u(){const t=m()+1;if(sessionStorage.setItem(\"login-attempts\",t.toString()),t>=3){const e=Date.now()+9e5;sessionStorage.setItem(\"login-blocked-until\",e.toString()),n()}else{const e=3-t;r.textContent=`⚠️ Tentativa ${t} de 3. ${e} tentativa${e>1?\"s\":\"\"} restante${e>1?\"s\":\"\"} antes do bloqueio.`,r.classList.add(\"show\")}}function g(){sessionStorage.removeItem(\"login-attempts\"),sessionStorage.removeItem(\"login-blocked-until\"),r.classList.remove(\"show\"),c.classList.remove(\"show\")}document.addEventListener(\"DOMContentLoaded\",function(){n(),sessionStorage.getItem(\"login-blocked-until\")&&setInterval(()=>{n()||r.classList.remove(\"show\")},6e4)});s.addEventListener(\"submit\",async function(t){if(t.preventDefault(),n())return;const e=document.getElementById(\"username\").value,l=document.getElementById(\"password\").value;o.disabled=!0,o.textContent=\"Entrando...\",i.classList.remove(\"show\"),r.classList.remove(\"show\");try{const d=await(await fetch(\"/api/admin/login\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({username:e,password:l})})).json();if(d.success)g(),window.location.href=\"/admin?auth=true\";else if(u(),i.textContent=d.message||\"Usuário ou senha incorretos!\",i.classList.add(\"show\"),document.getElementById(\"password\").value=\"\",document.getElementById(\"password\").focus(),n())return}catch(a){i.textContent=\"Erro ao conectar com o servidor. Tente novamente.\",i.classList.add(\"show\"),console.error(\"Erro no login:\",a)}finally{n()||(o.disabled=!1,o.textContent=\"Entrar\")}});"],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/admin.astro?astro&type=script&index=0&lang.ts","(function(){function u(){if(typeof CMS>\"u\"){setTimeout(u,100);return}CMS.registerEventListener({name:\"preSave\",handler:({entry:e})=>{if(e.get(\"collection\")===\"noticias\"){const r=e.get(\"data\");let n=r;const i=r.get(\"id\");if(!i||i===\"\"||i===null){const a=Math.floor(Date.now()/1e3);n=n.set(\"id\",a)}const o=n.get(\"data\"),c=e.get(\"slug\");let t;return!o||o===\"\"||o===null||!c?t=new Date().toISOString().split(\"T\")[0]:o instanceof Date?t=o.toISOString().split(\"T\")[0]:typeof o==\"string\"?t=o:t=new Date(o).toISOString().split(\"T\")[0],n=n.set(\"data\",t),e.set(\"data\",n)}return e}}),CMS.registerEventListener({name:\"postSave\",handler:({entry:e})=>{setTimeout(()=>{(window.location.hostname===\"localhost\"||window.location.hostname===\"127.0.0.1\")&&console.log(\"Notícia salva! Recarregue a página de notícias para ver as mudanças.\")},500)}});try{const e=()=>{const r=['[data-testid=\"logout-button\"]','button[aria-label*=\"logout\" i]','button[aria-label*=\"sair\" i]','a[href*=\"logout\"]',\".cms-logout\",'[class*=\"logout\"]','button:has-text(\"Logout\")','button:has-text(\"Sair\")'],n=()=>{for(const a of r)try{const s=document.querySelector(a);if(s)return s}catch{}const t=document.querySelectorAll(\"button, a\");for(const a of t){const s=a.textContent?.toLowerCase()||\"\";if(s.includes(\"logout\")||s.includes(\"sair\")||s.includes(\"log out\"))return a}return null},i=t=>{t&&!t.dataset.logoutIntercepted&&(t.dataset.logoutIntercepted=\"true\",t.addEventListener(\"click\",function(a){sessionStorage.removeItem(\"admin-authenticated\"),sessionStorage.removeItem(\"admin-timestamp\"),setTimeout(()=>{window.location.href=\"/admin/login\"},100)},{once:!1}))},o=n();o&&i(o),new MutationObserver(()=>{const t=n();t&&i(t)}).observe(document.body,{childList:!0,subtree:!0,attributes:!0})};setTimeout(e,500),setTimeout(e,2e3),setTimeout(e,5e3),document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",e):e()}catch{}}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",u):u()})();"],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/admin.astro?astro&type=script&index=2&lang.ts","const t=new URLSearchParams(window.location.search),e=t.get(\"auth\");if(!e||e!==\"true\")sessionStorage.removeItem(\"admin-authenticated\"),sessionStorage.removeItem(\"admin-timestamp\"),window.location.href=\"/admin/login\";else{const a=window.location.pathname;window.history.replaceState({},\"\",a)}"],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/casos-de-sucesso.astro?astro&type=script&index=0&lang.ts","(function(){const o=document.querySelector(\".page-hero\");if(!o)return;const e=\"https://plus.unsplash.com/premium_photo-1725408023469-d0659e7f3545?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D\",t=new Image;t.onload=()=>{o.style.backgroundImage=`url('${e}')`,o.classList.add(\"loaded\")},t.src=e})();"],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/contato.astro?astro&type=script&index=0&lang.ts","(function(){const o=document.querySelector(\".page-hero\");if(!o)return;const e=\"https://unsplash.com/photos/fOxhlF8SCt4/download?force=true&w=2000\",t=new Image;t.onload=()=>{o.style.backgroundImage=`url('${e}')`,o.classList.add(\"loaded\")},t.src=e})();"],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/noticias.astro?astro&type=script&index=0&lang.ts","(function(){const o=document.querySelector(\".page-hero\");if(!o)return;const e=\"https://unsplash.com/photos/fOxhlF8SCt4/download?force=true&w=2000\",t=new Image;t.onload=()=>{o.style.backgroundImage=`url('${e}')`,o.classList.add(\"loaded\")},t.src=e})();"],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/quem-somos.astro?astro&type=script&index=0&lang.ts","(function(){const o=document.querySelector(\".page-hero\");if(!o)return;const a=\"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80\",e=new Image;e.onload=()=>{o.style.backgroundImage=`url('${a}')`,o.classList.add(\"loaded\")},e.src=a})();"],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/pages/solucoes.astro?astro&type=script&index=0&lang.ts","(function(){const o=document.querySelector(\".page-hero\");if(!o)return;const e=\"https://plus.unsplash.com/premium_photo-1672423154405-5fd922c11af2?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D\",t=new Image;t.onload=()=>{o.style.backgroundImage=`url('${e}')`,o.classList.add(\"loaded\")},t.src=e})();"],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","window.netlifyIdentity&&window.netlifyIdentity.on(\"init\",i=>{i||window.netlifyIdentity.on(\"login\",()=>{document.location.href=\"/admin/\"})});"],["C:/Users/Elonet/Desktop/Elonet Website/elonet-website/src/components/HistoryCarousel.astro?astro&type=script&index=0&lang.ts","(()=>{const m=document.getElementById(\"viewport\"),f=document.getElementById(\"prev\"),E=document.getElementById(\"next\"),L=document.getElementById(\"track\");if(!(m instanceof HTMLElement)||!(f instanceof HTMLButtonElement)||!(E instanceof HTMLButtonElement)||!(L instanceof HTMLElement))return;const n=m,s=f,i=E,a=L;function o(e){const l=a.querySelector(\".card\"),d=a.querySelector(\".cards\");if(!(l instanceof HTMLElement)||!(d instanceof HTMLElement))return;const v=getComputedStyle(d),y=parseFloat(v.columnGap||v.gap||\"0\"),g=l.getBoundingClientRect().width+y;n.scrollBy({left:e*g,behavior:\"smooth\"})}s.addEventListener(\"click\",()=>{u(),o(-1)}),i.addEventListener(\"click\",()=>{u(),o(1)}),n.addEventListener(\"keydown\",e=>{e.key===\"ArrowLeft\"&&o(-1),e.key===\"ArrowRight\"&&o(1)});let t=null,r=!1,p=1.2;function u(){t&&(cancelAnimationFrame(t),t=null)}function c(){if(r){t=requestAnimationFrame(c);return}const e=a.querySelector(\".cards\");if(!(e instanceof HTMLElement)){t=requestAnimationFrame(c);return}const l=e.scrollWidth-n.clientWidth;n.scrollLeft>=l-1?u():n.scrollLeft+=p,t=requestAnimationFrame(c)}s.addEventListener(\"mouseenter\",()=>{r=!0}),i.addEventListener(\"mouseenter\",()=>{r=!0}),s.addEventListener(\"mouseleave\",()=>{r=!1}),i.addEventListener(\"mouseleave\",()=>{r=!1}),c()})();"]],"assets":["/_astro/aviso-de-privacidade.CluuBcl5.css","/_astro/casos-de-sucesso.BWYmqipG.css","/_astro/contato.Czg2GV8b.css","/_astro/index.BF1B3KYF.css","/_astro/quem-somos.CzzIo9Yj.css","/favicon.svg","/admin/config.yml","/admin/index.html","/images/logo.png","/images/logogrande.png","/images/reuniao.png","/images/sistema.png","/images/transparente.png","/pdf/politica-de-seguranca-da-informacao-elonet.pdf","/pdf/politica-global-de-conduta.pdf","/pdf/politica-privacidade.pdf","/_astro/admin.astro_astro_type_script_index_1_lang.ClYIQhV0.js","/_astro/Layout.astro_astro_type_script_index_1_lang.DDCNxuYb.js","/admin/config.yml","/admin/login/index.html","/admin/index.html","/aviso-de-privacidade/index.html","/casos-de-sucesso/index.html","/contato/index.html","/noticias/index.html","/quem-somos/index.html","/solucoes/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"LqwFUuXHfNQF0baPPDsztuY9nNmRHb+MY6YnYmAnX8A=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };

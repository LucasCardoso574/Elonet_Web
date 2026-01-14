export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ success: false, message: "Content-Type deve ser application/json" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    let body;
    try {
      const text = await request.text();
      if (!text || text.trim() === "") {
        return new Response(
          JSON.stringify({ success: false, message: "Body da requisição está vazio" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      body = JSON.parse(text);
    } catch (parseError) {
      return new Response(
        JSON.stringify({ success: false, message: "Erro ao processar JSON da requisição" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const { username, password } = body;
    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "Usuário e senha são obrigatórios" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const adminUsername = "jaina";
    const adminPassword = "@jainaelo777";
    if (false) ;
    if (username === adminUsername && password === adminPassword) {
      return new Response(
        JSON.stringify({ success: true, message: "Login realizado com sucesso" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Usuário ou senha incorretos" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Erro ao processar login",
        error: void 0
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

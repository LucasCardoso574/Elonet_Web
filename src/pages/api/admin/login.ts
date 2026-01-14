import type { APIRoute } from 'astro';

// Marcar como server-rendered (não estático)
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verificar se há body na requisição
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ success: false, message: 'Content-Type deve ser application/json' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Ler o body de forma segura
    let body;
    try {
      const text = await request.text();
      if (!text || text.trim() === '') {
        return new Response(
          JSON.stringify({ success: false, message: 'Body da requisição está vazio' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      body = JSON.parse(text);
    } catch (parseError) {
      return new Response(
        JSON.stringify({ success: false, message: 'Erro ao processar JSON da requisição' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { username, password } = body;
    
    // Validar se username e password foram fornecidos
    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Usuário e senha são obrigatórios' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Buscar credenciais das variáveis de ambiente
    // Se não existirem, usar valores padrão (apenas para desenvolvimento)
    const adminUsername = import.meta.env.ADMIN_USERNAME || import.meta.env.PUBLIC_ADMIN_USERNAME || 'admin';
    const adminPassword = import.meta.env.ADMIN_PASSWORD || import.meta.env.PUBLIC_ADMIN_PASSWORD || 'elonet2024';
    
    // Debug (remover em produção)
    if (import.meta.env.DEV) {
      console.log('🔐 Login attempt:', {
        username,
        envUsername: adminUsername,
        envPasswordSet: !!adminPassword,
        usingDefault: adminUsername === 'admin' && adminPassword === 'elonet2024'
      });
    }

    // Validar credenciais
    if (username === adminUsername && password === adminPassword) {
      return new Response(
        JSON.stringify({ success: true, message: 'Login realizado com sucesso' }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: 'Usuário ou senha incorretos' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    // Log do erro em desenvolvimento
    if (import.meta.env.DEV) {
      console.error('❌ Erro no login:', error);
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Erro ao processar login',
        error: import.meta.env.DEV ? String(error) : undefined
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};


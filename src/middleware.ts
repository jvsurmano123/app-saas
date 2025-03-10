import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const pathname = req.nextUrl.pathname;

  // MODO DE DESENVOLVIMENTO: Permitir acesso ao dashboard sem autenticação
  // Remova ou comente este bloco quando não for mais necessário
  if (pathname.startsWith('/dashboard')) {
    console.log('MODO DE DESENVOLVIMENTO: Permitindo acesso ao dashboard sem autenticação');
    return res;
  }

  // Verificar sessão
  const { data: { session } } = await supabase.auth.getSession();

  // Redirecionar usuários não autenticados para login
  if (!session && pathname.startsWith('/dashboard')) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    return NextResponse.redirect(redirectUrl);
  }

  // Redirecionar usuários autenticados para dashboard
  if (session && pathname.startsWith('/auth')) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*'
  ]
} 
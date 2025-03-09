import { useRouter } from 'next/navigation'
import { supabase } from '@/services/supabase/config'

export function useAuth() {
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    try {
      // 1. Limpar qualquer estado anterior
      await supabase.auth.signOut()
      localStorage.clear()
      sessionStorage.clear()
      
      // 2. Login
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError || !authData.user || !authData.session) {
        throw new Error('Email ou senha incorretos')
      }

      console.log('Login bem sucedido:', authData.user.id)

      // 3. Verificar usuário e clínica
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select(`
          *,
          clinics:clinic_id (
            id,
            name,
            email
          )
        `)
        .eq('id', authData.user.id)
        .single()

      console.log('Resultado da busca:', { userData, userError })

      if (userError) {
        console.error('Erro ao buscar usuário:', userError)
        await supabase.auth.signOut()
        throw new Error(`Erro ao buscar usuário: ${userError.message}`)
      }

      if (!userData) {
        console.error('Usuário não encontrado na tabela users')
        await supabase.auth.signOut()
        throw new Error('Usuário não encontrado na tabela users')
      }

      if (!userData.clinic_id) {
        console.error('Usuário sem clínica associada')
        await supabase.auth.signOut()
        throw new Error('Usuário sem clínica associada')
      }

      // 4. Armazenar dados importantes
      localStorage.setItem('user', JSON.stringify({
        id: authData.user.id,
        email: authData.user.email,
        clinic_id: userData.clinic_id,
        role: userData.role
      }))

      // 5. Setar cookies de autenticação
      document.cookie = `sb-access-token=${authData.session.access_token}; path=/; max-age=3600; SameSite=Lax`
      document.cookie = `sb-refresh-token=${authData.session.refresh_token}; path=/; max-age=7200; SameSite=Lax`

      // 6. Forçar redirecionamento
      console.log('Redirecionando para dashboard...')
      window.location.href = '/dashboard'
      
      // 7. Fallback (caso o redirecionamento não funcione imediatamente)
      setTimeout(() => {
        window.location.replace(redirectUrl)
      }, 100)

    } catch (error: any) {
      console.error('Erro no login:', error)
      await supabase.auth.signOut()
      localStorage.clear()
      sessionStorage.clear()
      throw new Error(error.message || 'Erro ao fazer login')
    }
  }

  const signUp = async (
    email: string,
    password: string,
    name: string,
    clinic: string
  ) => {
    try {
      console.log('Iniciando processo de registro...')

      // Verificar se os campos obrigatórios estão preenchidos
      if (!email || !password || !name || !clinic) {
        throw new Error('Todos os campos são obrigatórios')
      }

<<<<<<< HEAD
      // Tentar criar o usuário
=======
      // 1. Criar o usuário na auth
      console.log('Criando usuário na autenticação...')
>>>>>>> f5b90129 (Refatorar middleware de autenticação e hooks de login/logout)
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            clinic,
          },
          // Em desenvolvimento, não redirecionar para confirmação de email
          emailRedirectTo: process.env.NODE_ENV === 'development' 
            ? undefined 
            : `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        console.error('Erro ao criar usuário na auth:', signUpError)
        throw new Error(
          signUpError.message === 'User already registered'
            ? 'Este email já está registrado'
            : 'Erro ao criar usuário. Por favor, tente novamente.'
        )
      }

      if (!data.user) {
        throw new Error('Erro ao criar usuário: dados do usuário não retornados')
      }

<<<<<<< HEAD
      // Em desenvolvimento, criar o perfil imediatamente
      if (process.env.NODE_ENV === 'development') {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name,
            clinic,
            email,
          })

        if (profileError) {
          console.error('Erro ao criar perfil:', profileError)
          throw new Error('Erro ao criar perfil. Por favor, tente novamente.')
        }

        // Redirecionar para o dashboard em desenvolvimento
        router.push('/dashboard')
        return
      }

      // Em produção, armazenar os dados do usuário no localStorage
      localStorage.setItem('pendingProfile', JSON.stringify({
        id: data.user.id,
        name,
        clinic,
        email,
      }))

      // Redirecionar para a página de confirmação em produção
      router.push('/auth/verify-email')
=======
      console.log('Usuário criado com sucesso na auth:', data.user.id)

      // 2. Criar a clínica primeiro (sem owner_id)
      console.log('Criando clínica...')
      const { data: clinicData, error: clinicError } = await supabase
        .from('clinics')
        .insert({
          name: clinicName,
          email: email,
        })
        .select()
        .single()

      if (clinicError) {
        console.error('Erro ao criar clínica:', clinicError)
        throw new Error('Erro ao criar clínica. Por favor, tente novamente.')
      }

      console.log('Clínica criada com sucesso:', clinicData)

      // 3. Criar o usuário na tabela users com role admin
      console.log('Criando usuário na tabela users...')
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: email,
          name: name,
          clinic_id: clinicData.id,
          role: 'admin',
        })
        .select()
        .single()

      if (userError) {
        console.error('Erro ao criar usuário na tabela users:', userError)
        // Se falhar, deletar a clínica
        await supabase.from('clinics').delete().eq('id', clinicData.id)
        throw new Error('Erro ao criar usuário. Por favor, tente novamente.')
      }

      console.log('Usuário criado com sucesso na tabela users:', userData)

      // 4. Atualizar a clínica com o owner_id
      console.log('Atualizando owner_id da clínica...')
      const { error: updateClinicError } = await supabase
        .from('clinics')
        .update({ owner_id: data.user.id })
        .eq('id', clinicData.id)

      if (updateClinicError) {
        console.error('Erro ao atualizar clínica:', updateClinicError)
        // Se falhar, limpar tudo
        await supabase.from('users').delete().eq('id', data.user.id)
        await supabase.from('clinics').delete().eq('id', clinicData.id)
        throw new Error('Erro ao finalizar cadastro. Por favor, tente novamente.')
      }

      console.log('Registro concluído com sucesso!')

      // Forçar navegação para o dashboard usando window.location
      if (process.env.NODE_ENV === 'development') {
        window.location.href = '/dashboard'
        return
      }

      // Em produção, redirecionar para a página de confirmação
      window.location.href = '/auth/verify-email'
>>>>>>> f5b90129 (Refatorar middleware de autenticação e hooks de login/logout)
    } catch (error: any) {
      console.error('Erro ao criar conta:', error)
      throw new Error(error.message || 'Ocorreu um erro ao criar sua conta')
    }
  }

  const signOut = async () => {
    try {
      // 1. Limpar autenticação do Supabase
      await supabase.auth.signOut()

      // 2. Limpar storage local
      localStorage.clear()
      sessionStorage.clear()

      // 3. Limpar cookies
      const cookies = document.cookie.split(';')
      
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i]
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
      }

      // 4. Forçar redirecionamento
      window.location.href = '/auth/login'
      
      // 5. Fallback
      setTimeout(() => {
        window.location.replace('/auth/login')
      }, 100)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      window.location.href = '/auth/login'
    }
  }

  return {
    signIn,
    signUp,
    signOut,
  }
} 
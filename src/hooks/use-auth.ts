import { useRouter } from 'next/navigation'
import { supabase } from '@/services/supabase/config'

export function useAuth() {
  const router = useRouter()

  // Função auxiliar para limpar dados de autenticação
  const clearAuthData = async () => {
    try {
      await supabase.auth.signOut()
      localStorage.clear()
      sessionStorage.clear()
      
      // Limpar cookies
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i]
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
      }
    } catch (error) {
      console.error('Erro ao limpar dados de autenticação:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Iniciando processo de login...')
      
      // MODO DE DESENVOLVIMENTO: Permitir qualquer login temporariamente
      console.log('MODO DE DESENVOLVIMENTO: Permitindo qualquer login temporariamente')
      
      // Limpar qualquer estado anterior
      await clearAuthData()
      
      // Criar dados fictícios para o usuário
      const userId = 'temp-' + Date.now()
      const userName = email.split('@')[0]
      const clinicName = 'Clínica Temporária'
      
      // Armazenar dados do usuário no localStorage
      localStorage.setItem('user', JSON.stringify({
        id: userId,
        email: email,
        clinic_id: 'temp-clinic-id',
        role: 'admin',
        name: userName
      }))
      
      // Setar cookies de autenticação fictícios
      document.cookie = `sb-access-token=temp-token; path=/; max-age=3600; SameSite=Lax`
      document.cookie = `sb-refresh-token=temp-refresh-token; path=/; max-age=7200; SameSite=Lax`
      
      // Redirecionar para o dashboard
      console.log('Redirecionando para dashboard...')
      window.location.href = '/dashboard'
      
      // Fallback
      setTimeout(() => {
        window.location.replace('/dashboard')
      }, 100)
      
      return
      
      /* CÓDIGO ORIGINAL COMENTADO TEMPORARIAMENTE
      // 1. Limpar qualquer estado anterior
      await clearAuthData()
      
      // 2. Login
      console.log('Tentando fazer login com:', email)
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        console.error('Erro na autenticação:', authError)
        throw new Error(authError.message || 'Email ou senha incorretos')
      }

      if (!authData.user || !authData.session) {
        console.error('Dados de autenticação incompletos')
        throw new Error('Erro ao fazer login. Por favor, tente novamente.')
      }

      console.log('Login bem sucedido:', authData.user.id)

      // 3. Verificar usuário e clínica
      console.log('Buscando dados do usuário...')
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

      // Se o usuário não existir na tabela users, vamos tentar criá-lo
      if (userError || !userData) {
        console.log('Usuário não encontrado na tabela users. Tentando recuperar dados do usuário autenticado...')
        
        // Obter dados do usuário da autenticação
        const { data: authUserData } = await supabase.auth.getUser()
        
        if (!authUserData?.user) {
          console.error('Usuário não encontrado na autenticação')
          await clearAuthData()
          throw new Error('Usuário não encontrado. Por favor, verifique suas credenciais.')
        }
        
        // Verificar se há dados de usuário nos metadados
        const userMetadata = authUserData.user.user_metadata || {}
        console.log('Metadados do usuário:', userMetadata)
        
        // Mesmo com metadados incompletos, vamos tentar criar uma conta básica
        const userName = userMetadata.name || email.split('@')[0]
        const clinicName = userMetadata.clinic || `Clínica ${userName}`
        
        console.log('Usando dados derivados:', { userName, clinicName })
        
        // Tentar criar uma clínica para o usuário
        console.log('Criando clínica para o usuário...')
        const { data: clinicData, error: clinicError } = await supabase
          .from('clinics')
          .insert({
            name: clinicName,
            email: email,
            owner_id: authUserData.user.id
          })
          .select()
          .single()
          
        if (clinicError) {
          console.error('Erro ao criar clínica:', clinicError)
          await clearAuthData()
          throw new Error('Erro ao configurar sua conta. Por favor, registre-se novamente.')
        }
        
        console.log('Clínica criada com sucesso:', clinicData)
        
        // Criar o usuário na tabela users
        console.log('Criando usuário na tabela users...')
        const { data: newUserData, error: newUserError } = await supabase
          .from('users')
          .insert({
            id: authUserData.user.id,
            email: email,
            name: userName,
            clinic_id: clinicData.id,
            role: 'admin'
          })
          .select()
          .single()
          
        if (newUserError) {
          console.error('Erro ao criar usuário na tabela users:', newUserError)
          // Limpar a clínica criada
          await supabase.from('clinics').delete().eq('id', clinicData.id)
          await clearAuthData()
          throw new Error('Erro ao configurar sua conta. Por favor, registre-se novamente.')
        }
        
        console.log('Usuário criado com sucesso na tabela users:', newUserData)
        
        // Atualizar a clínica com o owner_id
        const { error: updateClinicError } = await supabase
          .from('clinics')
          .update({ owner_id: authUserData.user.id })
          .eq('id', clinicData.id)
          
        if (updateClinicError) {
          console.error('Erro ao atualizar clínica:', updateClinicError)
        }
        
        // Atualizar os metadados do usuário
        const { error: updateUserError } = await supabase.auth.updateUser({
          data: {
            name: userName,
            clinic: clinicName
          }
        })
        
        if (updateUserError) {
          console.error('Erro ao atualizar metadados do usuário:', updateUserError)
        }
        
        // Armazenar dados do usuário
        localStorage.setItem('user', JSON.stringify({
          id: authUserData.user.id,
          email: email,
          clinic_id: clinicData.id,
          role: 'admin',
          name: userName
        }))
        
        // Setar cookies de autenticação
        document.cookie = `sb-access-token=${authData.session.access_token}; path=/; max-age=3600; SameSite=Lax`
        document.cookie = `sb-refresh-token=${authData.session.refresh_token}; path=/; max-age=7200; SameSite=Lax`
        
        // Redirecionar para o dashboard
        console.log('Redirecionando para dashboard...')
        window.location.href = '/dashboard'
        return
      }

      if (!userData.clinic_id) {
        console.error('Usuário sem clínica associada')
        await clearAuthData()
        throw new Error('Usuário sem clínica associada. Por favor, entre em contato com o suporte.')
      }

      // 4. Armazenar dados importantes
      console.log('Armazenando dados do usuário...')
      localStorage.setItem('user', JSON.stringify({
        id: authData.user.id,
        email: authData.user.email,
        clinic_id: userData.clinic_id,
        role: userData.role,
        name: userData.name
      }))

      // 5. Setar cookies de autenticação
      document.cookie = `sb-access-token=${authData.session.access_token}; path=/; max-age=3600; SameSite=Lax`
      document.cookie = `sb-refresh-token=${authData.session.refresh_token}; path=/; max-age=7200; SameSite=Lax`

      // 6. Forçar redirecionamento
      console.log('Redirecionando para dashboard...')
      window.location.href = '/dashboard'
      
      // 7. Fallback (caso o redirecionamento não funcione imediatamente)
      setTimeout(() => {
        window.location.replace('/dashboard')
      }, 100)
      */

    } catch (error: any) {
      console.error('Erro no login:', error)
      await clearAuthData()
      throw new Error(error.message || 'Erro ao fazer login. Por favor, tente novamente.')
    }
  }

  const signUp = async (
    email: string,
    password: string,
    name: string,
    clinicName: string
  ) => {
    try {
      console.log('Iniciando processo de registro...')

      // Limpar qualquer estado anterior
      await clearAuthData()

      // Verificar se os campos obrigatórios estão preenchidos
      if (!email || !password || !name || !clinicName) {
        throw new Error('Todos os campos são obrigatórios')
      }

      // 1. Criar o usuário na auth
      console.log('Criando usuário na autenticação...')
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            clinic: clinicName,
          },
          // Em desenvolvimento, não redirecionar para confirmação de email
          emailRedirectTo: process.env.NODE_ENV === 'development' 
            ? undefined 
            : `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        console.error('Erro ao criar usuário na auth:', signUpError)
        await clearAuthData()
        throw new Error(
          signUpError.message === 'User already registered'
            ? 'Este email já está registrado'
            : 'Erro ao criar usuário. Por favor, tente novamente.'
        )
      }

      if (!data.user) {
        await clearAuthData()
        throw new Error('Erro ao criar usuário: dados do usuário não retornados')
      }

      console.log('Usuário criado com sucesso na auth:', data.user.id)
      console.log('Metadados do usuário:', data.user.user_metadata)

      // Verificar se os metadados foram armazenados corretamente
      if (!data.user.user_metadata || !data.user.user_metadata.name) {
        console.log('Metadados incompletos, atualizando...')
        
        // Atualizar os metadados do usuário
        const { error: updateUserError } = await supabase.auth.updateUser({
          data: {
            name,
            clinic: clinicName
          }
        })
        
        if (updateUserError) {
          console.error('Erro ao atualizar metadados do usuário:', updateUserError)
        } else {
          console.log('Metadados atualizados com sucesso')
        }
      }

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
        await clearAuthData()
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
        await clearAuthData()
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
        await clearAuthData()
        throw new Error('Erro ao finalizar cadastro. Por favor, tente novamente.')
      }

      console.log('Registro concluído com sucesso!')

      // 5. Armazenar dados do usuário no localStorage
      localStorage.setItem('user', JSON.stringify({
        id: data.user.id,
        email: email,
        clinic_id: clinicData.id,
        role: 'admin',
        name: name
      }))

      // 6. Setar cookies de autenticação (se houver sessão)
      if (data.session) {
        document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=3600; SameSite=Lax`
        document.cookie = `sb-refresh-token=${data.session.refresh_token}; path=/; max-age=7200; SameSite=Lax`
      }

      // Forçar navegação para o dashboard usando window.location
      if (process.env.NODE_ENV === 'development') {
        window.location.href = '/dashboard'
        return
      }

      // Em produção, redirecionar para a página de confirmação
      window.location.href = '/auth/verify-email'
    } catch (error: any) {
      console.error('Erro ao criar conta:', error)
      await clearAuthData()
      throw new Error(error.message || 'Ocorreu um erro ao criar sua conta')
    }
  }

  const signOut = async () => {
    try {
      console.log('Realizando logout...')
      
      // Limpar todos os dados de autenticação
      await clearAuthData()
      
      // Forçar redirecionamento
      console.log('Redirecionando para página de login...')
      window.location.href = '/login'
      
      // Fallback
      setTimeout(() => {
        window.location.replace('/login')
      }, 100)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      window.location.href = '/login'
    }
  }

  return {
    signIn,
    signUp,
    signOut,
  }
} 
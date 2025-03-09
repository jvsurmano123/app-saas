import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Função para testar a conexão e estrutura das tabelas
export async function testSupabaseConnection() {
  try {
    console.log('Testando conexão com Supabase...');
    
    // Testa a conexão verificando a tabela owners
    const { data: owners, error: ownersError } = await supabase
      .from('owners')
      .select('*')
      .limit(1);

    if (ownersError) {
      console.error('Erro ao acessar tabela owners:', ownersError);
      throw ownersError;
    }

    // Testa a conexão verificando a tabela patients
    const { data: patients, error: patientsError } = await supabase
      .from('patients')
      .select('*')
      .limit(1);

    if (patientsError) {
      console.error('Erro ao acessar tabela patients:', patientsError);
      throw patientsError;
    }

    console.log('Conexão com Supabase estabelecida com sucesso!');
    console.log('Estrutura das tabelas:', {
      owners: owners ? 'OK' : 'Sem dados',
      patients: patients ? 'OK' : 'Sem dados'
    });

    return true;
  } catch (error) {
    console.error('Erro ao testar conexão com Supabase:', error);
    return false;
  }
} 
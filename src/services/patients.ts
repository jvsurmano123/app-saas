import { supabase } from '@/lib/supabase';
import { NewPatientData, Patient, Owner } from '@/types/patient';

export async function createPatient(data: NewPatientData) {
  try {
    console.log('Iniciando criação do paciente:', { data });

    // Primeiro, criar ou atualizar o tutor
    const { data: owner, error: ownerError } = await supabase
      .from('owners')
      .upsert(
        {
          name: data.owner.name,
          phone: data.owner.phone,
          email: data.owner.email,
          document: data.owner.document,
          address: data.owner.address,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'document',
          ignoreDuplicates: false,
        }
      )
      .select()
      .single();

    if (ownerError) {
      console.error('Erro ao criar/atualizar tutor:', ownerError);
      throw new Error(`Erro ao criar/atualizar tutor: ${ownerError.message}`);
    }

    console.log('Tutor criado/atualizado com sucesso:', owner);

    // Depois, criar o paciente
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .insert({
        name: data.name,
        species: data.species,
        breed: data.breed,
        gender: data.gender,
        birth_date: data.birthDate,
        weight: data.weight,
        status: 'active',
        owner_id: owner.id,
      })
      .select()
      .single();

    if (patientError) {
      console.error('Erro ao criar paciente:', patientError);
      throw new Error(`Erro ao criar paciente: ${patientError.message}`);
    }

    console.log('Paciente criado com sucesso:', patient);

    return { patient, owner };
  } catch (error) {
    console.error('Erro inesperado ao criar paciente:', error);
    throw error;
  }
}

export async function getPatients(search?: string) {
  let query = supabase
    .from('patients')
    .select(`
      *,
      owner:owners (
        name,
        phone,
        email
      )
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,owner.name.ilike.%${search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Erro ao buscar pacientes');
  }

  return data;
}

export async function getPatientById(id: string) {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      owner:owners (
        *
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Erro ao buscar paciente');
  }

  return data;
}

export async function updatePatient(
  id: string,
  data: Partial<Patient>
) {
  const { data: patient, error } = await supabase
    .from('patients')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error('Erro ao atualizar paciente');
  }

  return patient;
}

export async function deletePatient(id: string) {
  // Soft delete - apenas marca como inativo
  const { error } = await supabase
    .from('patients')
    .update({
      status: 'inactive',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    throw new Error('Erro ao excluir paciente');
  }
} 
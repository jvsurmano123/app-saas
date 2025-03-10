-- Primeiro, vamos remover as tabelas existentes (se houver)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS clinics CASCADE;

-- Criar extensão para gerar UUIDs (caso não exista)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar a tabela de clínicas
CREATE TABLE IF NOT EXISTS clinics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  owner_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar a tabela de usuários sem a restrição de chave estrangeira para auth.users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'vet', 'assistant', 'receptionist')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar a restrição de chave estrangeira para owner_id após a criação da tabela users
ALTER TABLE clinics 
ADD CONSTRAINT fk_owner 
FOREIGN KEY (owner_id) 
REFERENCES users(id) 
ON DELETE SET NULL;

-- Habilitar RLS nas tabelas
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Criar políticas simplificadas para evitar recursão

-- Políticas para clínicas - Permitir todas as operações durante o desenvolvimento
CREATE POLICY "Permitir todas as operações em clínicas" 
ON clinics FOR ALL 
USING (true) 
WITH CHECK (true);

-- Políticas para usuários - Permitir todas as operações durante o desenvolvimento
CREATE POLICY "Permitir todas as operações em usuários" 
ON users FOR ALL 
USING (true) 
WITH CHECK (true); 
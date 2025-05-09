import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
export default async function handler(req, res) {
  // Exemplo de fetch de dados
  const { data, error } = await supabase.from('users').select('*');
  res.status(200).json({ data, error });
}

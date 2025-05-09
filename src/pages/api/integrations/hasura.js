import fetch from 'node-fetch';
export default async function handler(req, res) {
  // Exemplo de query GraphQL no Hasura
  const query = `{ users { id name } }`;
  const result = await fetch(process.env.HASURA_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  }).then(r => r.json());
  res.status(200).json(result);
}

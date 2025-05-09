import Mailchimp from '@mailchimp/mailchimp_marketing';
Mailchimp.setConfig({ apiKey: process.env.MAILCHIMP_API_KEY, server: process.env.MAILCHIMP_SERVER_PREFIX });
export default async function handler(req, res) {
  // Exemplo de lista de contatos
  const response = await Mailchimp.lists.getListMembersInfo(process.env.MAILCHIMP_LIST_ID);
  res.status(200).json(response);
}

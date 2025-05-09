import Layout from '../components/Layout';

export default function {PageName}() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-20">
        <h1 className="text-3xl font-bold text-primary mb-6">{PageTitle}</h1>
        <p>Bem-vindo à página {PageName} criada automaticamente pelo VUNOCode.</p>
      </div>
    </Layout>
  );
}

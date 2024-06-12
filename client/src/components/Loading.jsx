import Layout from "../layouts/Layout";

const LoadingSpinner = () => {
  return (
    <Layout>
      <div className="animate-spin rounded-full h-32 w-32 mb-12 border-t-2 border-b-2 border-[var(--secondary-color)]"></div>
      <div className="text-xl ">Loading...</div>
    </Layout>
  );
};

export default LoadingSpinner;

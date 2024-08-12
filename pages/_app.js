import Layout from "../components/Layout";
import "@/styles/dashboard.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

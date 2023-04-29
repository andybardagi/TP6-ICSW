import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={inter.style} >
      <Navbar/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

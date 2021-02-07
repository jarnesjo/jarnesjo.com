import { AppProps } from "next/dist/next-server/lib/router/router";
import "@/css/tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

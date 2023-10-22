import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Prism from '../plugins/prism';
import { Noto_Sans_JP } from 'next/font/google';
import '@/styles/globals.css'

const notojp = Noto_Sans_JP({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-notojp",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${notojp.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}

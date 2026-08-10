import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CompareProvider } from '@/context/CompareContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CompareModal from '@/components/CompareModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import MainContentContainer from '@/components/MainContentContainer';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Mahi Sports Hub | Premium Sports Gear in Lucknow',
  description: 'Premium sports gear and equipment in Indira Nagar, Lucknow. Trusted by 100+ athletes. 4.8★ Rated.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased text-gray-900 flex flex-col min-h-screen" suppressHydrationWarning>
        <CartProvider>
          <CompareProvider>
            <Navbar />
            <MainContentContainer>
              {children}
            </MainContentContainer>
            <Footer />
            <CartDrawer />
            <CompareModal />
            <WhatsAppButton />
            <Toaster position="bottom-center" />
          </CompareProvider>
        </CartProvider>
      </body>
    </html>
  );
}


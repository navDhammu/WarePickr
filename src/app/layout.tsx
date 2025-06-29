import { PrimeReactProvider } from 'primereact/api';
import './globals.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='en'>
         <body>
            <PrimeReactProvider>{children}</PrimeReactProvider>
         </body>
      </html>
   );
}

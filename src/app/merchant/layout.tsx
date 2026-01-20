// app/merchant/layout.tsx
import { ReactNode } from 'react';

export default function MerchantLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>
        <h1>Merchant Layout Header</h1>
      </header>
      <main>{children}</main>
      <footer>Merchant Layout Footer</footer>
    </div>
  );
}

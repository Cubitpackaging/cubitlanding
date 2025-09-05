import './globals.css'
import Script from 'next/script'


export const metadata = {
  title: 'Cubit Packaging - Eco-Smart Custom Packaging Solutions',
  description: 'Beautiful, sustainable boxes, mailers & pouches. Fast U.S. production, low minimums, free design support.',
  keywords: 'custom packaging, eco-friendly packaging, smart packaging, QR codes, NFC, sustainable packaging',
  authors: [{ name: 'Cubit Packaging' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/icon.svg', sizes: '16x16', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">

        {children}
        

        {/* LiveChat Script */}
        <Script
          id="livechat-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.__lc = window.__lc || {};
              window.__lc.license = 19290214;
              window.__lc.integration_name = "manual_onboarding";
              window.__lc.product_name = "livechat";
              ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
            `
          }}
        />
        
        <noscript>
          <a href="https://www.livechat.com/chat-with/19290214/" rel="nofollow">
            Chat with us
          </a>
          , powered by{' '}
          <a
            href="https://www.livechat.com/?welcome"
            rel="noopener nofollow"
            target="_blank"
          >
            LiveChat
          </a>
        </noscript>
      </body>
    </html>
  )
}
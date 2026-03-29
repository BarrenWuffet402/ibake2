import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'iBake · Sourdough Community',
  description: 'Share starters, discover recipes, connect with bakers nearby',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex h-full overflow-hidden bg-[#F2E8D9]">
        {/* Sidebar — desktop */}
        <aside className="hidden md:flex flex-col w-56 shrink-0 bg-[#FBF6EE] border-r border-[#DDD0BE]">
          <div className="px-5 pt-6 pb-4 border-b border-[#DDD0BE]">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍞</span>
              <div>
                <div className="font-serif font-bold text-[#7B3F2B] text-lg leading-none">iBake</div>
                <div className="text-[10px] text-[#9B7B6A] tracking-widest uppercase mt-0.5">Sourdough Community</div>
              </div>
            </div>
          </div>
          <Nav />
        </aside>

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Mobile topbar */}
          <div className="md:hidden flex items-center gap-2 px-4 py-3 bg-[#FBF6EE] border-b border-[#DDD0BE] shrink-0">
            <span className="text-xl">🍞</span>
            <span className="font-serif font-bold text-[#7B3F2B] text-lg">iBake</span>
            <span className="text-[10px] text-[#9B7B6A] tracking-widest uppercase ml-1">Sourdough Community</span>
          </div>

          <main className="flex-1 overflow-y-auto">{children}</main>

          {/* Bottom nav — mobile */}
          <div className="md:hidden shrink-0 border-t border-[#DDD0BE] bg-[#FBF6EE]">
            <Nav mobile />
          </div>
        </div>
      </body>
    </html>
  )
}

import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Events } from '@/components/events'
import { GridBg } from '@/components/grid-bg'
import { Hero } from '@/components/hero'
import { Roster } from '@/components/roster'
import { ScrollUI } from '@/components/scroll-ui'
import { Services } from '@/components/services'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'

export default function Page() {
  return (
    <main className="relative overflow-x-hidden">
      <GridBg />
      <div className="relative z-10">
        <ScrollUI />
        <SiteNav />
        <Hero />
        <About />
        <Services />
        <Events />
        <Roster />
        <Contact />
        <SiteFooter />
      </div>
    </main>
  )
}

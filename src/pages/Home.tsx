import Hero from '../sections/Hero'
import Demo from '../sections/Demo'
import Closing from '../sections/Closing'
import AmbientAudio from '../components/AmbientAudio'

export default function Home() {
  return (
    <main>
      <AmbientAudio />
      <div className="snap-start">
        <Hero />
      </div>
      <div className="snap-start">
        <Demo />
      </div>
      <div className="snap-start">
        <Closing />
      </div>
    </main>
  )
}

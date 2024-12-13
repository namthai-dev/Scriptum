import Heading from './components/heading';
import { Separator } from '@/components/ui/separator';
import Heroes from './components/heroes';
import Footer from './components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Heading />
      <Separator />
      <Heroes />
      <Footer />
    </div>
  );
}

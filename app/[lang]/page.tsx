import { Separator } from '@/components/ui/separator';
import Heading from './_components/heading';
import Heroes from './_components/heroes';
import Footer from './_components/footer';

export default function Home() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Heading />
      <Separator />
      <Heroes />
      <Footer />
    </div>
  );
}

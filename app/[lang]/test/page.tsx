import { getDictionary } from '@/features/internationalization/get-dictionaries';
import { Locale } from '@/features/internationalization/i18n-config';

import Header from './components/header';
import { Counter } from './components/counter';

export default async function IndexPage(
    props: {
        params: Promise<{ lang: Locale }>;
    }
) {
    const params = await props.params;

    const {
        lang
    } = params;

    const dictionary = await getDictionary(lang);

    return (
        <div className='w-full h-full'>
            <Header />
            <p>This text is rendered on the server: {dictionary.landing.welcome}</p>
            <Counter dictionary={dictionary.counter} />
        </div>
    );
}
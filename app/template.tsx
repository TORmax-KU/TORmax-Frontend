
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import Script from 'next/script'

export default async function Template({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
                <Header />
                <main>
                    {children} {/* Now has access to mock data */}
                    <Script src='https://static.matterport.com/showcase-sdk/latest.js' />
                </main>
                <Footer />
        </div>
    );
}
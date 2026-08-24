
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import { Navbar } from '@/component/Navbar';
import Script from 'next/script'

export default async function Template({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
                <Header />
                <Navbar/>
                <div className="animate-fadeIn transition-opacity duration-300">
                    {children} {/* Now has access to mock data */}
                    <Script src='https://static.matterport.com/showcase-sdk/latest.js' />
                </div>
                <Footer />
        </div>
    );
}
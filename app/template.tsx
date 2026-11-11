
import Footer from '@/component/Footer';
import { Navbar } from '@/component/Navbar';
import Script from 'next/script'

export default async function Template({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="min-h-screen bg-canvas">
                <Navbar/>
                <div className="ui-enter">
                    {children}
                    <Script src='https://static.matterport.com/showcase-sdk/latest.js' />
                </div>
                <Footer />
        </div>
    );
}

import { Footer } from "@components/footer/footer";
import { Navbar } from "@components/navbar/navbar";

export function DefaultLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="bg-black min-h-screen text-white">{children}</main>
            <Footer />
        </>
    );
}

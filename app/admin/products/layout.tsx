import { Navbar } from "@/components/navbar";


export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="">
            {children}
        </main>
    )
}
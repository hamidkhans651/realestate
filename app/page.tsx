import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/logout-button";
import Link from "next/link";
import { title, subtitle } from "@/components/primitives";
import { SearchIcon } from "@/components/icons";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import Midsections from "../components/Midsections";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import NavbarMenuToggle from "@/components/textnav"
import DropdownButton from "./admin/components/DropdownButton";




export default async function Home() {
  // const session = await auth();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}></Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  // if (!session) {
  //   redirect("/login");
  // }


  return (
    <main>
      <main className="w-full min-h-screen">
        <Navbar />

        {/* Section with background image and text */}
        <section
          className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/images/prop3.webp)' }}
        >
          <div className="inline-block max-w-xl text-center pt-16 text-white">
            <span className={title()}>Make&nbsp;</span>
            <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
            <br />
            <span className={title()}>
              websites regardless of your design experience.
            </span>
            <div className={subtitle({ class: "mt-4 text-white" })} >
              Beautiful, fast, and modern React UI library.

            </div>
          </div>

          {/* /* Your search input */}
          <DropdownButton/>
          <div className="mt-8 rounded-xl">{searchInput}</div>
        </section>

        {/* /* Midsections or additional content below the hero */}
        <Midsections />
        <Footer />

      </main>
    </main>
  );
}

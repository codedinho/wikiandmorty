import fetchGraphQL from "@/lib/graphql/client";
import { GET_CHARACTERS } from "@/lib/graphql/queries";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import TopCharacters from "@/components/TopCharacters";
import TopEpisodes from "@/components/TopEpisodes";
import About from "@/components/About";

export default async function Home() {
  const data = await fetchGraphQL(GET_CHARACTERS);

  return (
    <>
      {/* Full Page Width Banner with Overlay */}
      <div className="-mx-5 -mt-5 relative">
        {/* Desktop Image */}
        <div className="w-full hidden md:block">
          <AspectRatio ratio={1920 / 400}>
            <Image
              src="/imgs/RickMorty9.png"
              alt="Rick and Morty"
              fill
              className="object-cover"
              quality={100}
            />
          </AspectRatio>
        </div>

        {/* Mobile Image */}
        <div className="w-full md:hidden">
          <AspectRatio ratio={414 / 214}>
            <Image
              src="/imgs/RickMortyMobile2.png"
              alt="Rick and Morty Mobile"
              fill
              className="object-cover"
              quality={100}
            />
          </AspectRatio>
        </div>

        {/* Text overlay in the middle of the banner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">

        </div>

        <div
          className="absolute top-0 left-0 w-full h-20 pointer-events-none z-10"
        ></div>
      </div>

      <TopCharacters />

      <TopEpisodes />

      <About />
    </>
  );
}
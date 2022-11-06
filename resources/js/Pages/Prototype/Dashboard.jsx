import Authenticated from "@/Layouts/Authenticated/Index";
import React from "react";
import Flickity from "react-flickity-component";

import { Head } from "@inertiajs/inertia-react";
import FeatureMovie from "@/Components/FeatureMovie";
import MovieCard from "@/Components/MovieCard";

export default function Dashboard() {
    const FlickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
    };
    return (
        <Authenticated>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
                <title>Dashboard</title>
            </Head>
            <div>
                <div className="font-semibold text-[22px] text-black mb-4">
                    Featured Movies
                </div>
                <Flickity className="gap-[30px] " options={FlickityOptions}>
                    {[1, 2, 3, 4].map((i) => (
                        <FeatureMovie
                            key={i}
                            name={`Batman in Love ${i}`}
                            thumbnail="/assets/images/featured-1.png"
                            slug="batman"
                            category="Horor"
                            rating={2 + i}
                        />
                    ))}
                </Flickity>
            </div>

            {/* <!-- Browse --> */}
            <div className="mt-10">
                <div className="font-semibold text-[22px] text-black mb-4">
                    Browse
                </div>
                <Flickity className="gap-[30px] " options={FlickityOptions}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <MovieCard
                            key={i}
                            name="Mikie Mouse"
                            slug="mikie-mouse"
                            category="Action • Cartoon"
                            thumbnail={`/assets/images/browse-${i}.png`}
                        />
                    ))}
                </Flickity>
            </div>
            {/* <!-- /Continue Watching --> */}
        </Authenticated>
    );
}

import Authenticated from "@/Layouts/Authenticated/Index";
import React from "react";
import Flickity from "react-flickity-component";

import { Head } from "@inertiajs/inertia-react";
import FeatureMovie from "@/Components/FeatureMovie";
import MovieCard from "@/Components/MovieCard";

export default function Dashboard(props) {
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
        <Authenticated auth={props.auth} errors={props.errors}>
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
                    {props.featureMovies.map((featureMovie,index) => (
                        <FeatureMovie
                            key={featureMovie.id}
                            name={featureMovie.name}
                            thumbnail={featureMovie.thumbnail}
                            slug={featureMovie.slug}
                            category={featureMovie.category}
                            rating={featureMovie.rating}
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
                    {props.movies.map((movie,i) => (
                        <MovieCard
                            key={movie.id}
                            name={movie.name}
                            thumbnail={movie.thumbnail}
                            slug={movie.slug}
                            category={movie.category}
                        />
                    ))}
                </Flickity>
            </div>
            {/* <!-- /Continue Watching --> */}
        </Authenticated>
    );
}

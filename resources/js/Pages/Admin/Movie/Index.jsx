import React from "react";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Link, useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import FlashMessage from "@/Components/FlashMessage";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ auth, flashMessage, movies }) {
    const { delete: destroy } = useForm();

    return (
        <Authenticated auth={auth}>
            <Link href={route("admin.dashboard.movie.create")}>
                <Button type="button" className="w-40 mb-8">
                    Insert New Movie
                </Button>
            </Link>
            {flashMessage?.message && (
                <FlashMessage message={flashMessage.message} />
            )}

            <table className="table-fixed text-center w-full">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Thumbnail</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th>Video</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, index) => (
                        // console.log("/storage/"+movie.thumbnail)
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <img
                                    src={`/storage/${movie.thumbnail}`}
                                    alt=""
                                />
                            </td>
                            <td>{movie.name}</td>
                            <td>{movie.category}</td>
                            <td>{movie.rating}</td>
                            <td>
                                <a
                                    href={movie.video_url}
                                    className="text-blue-400"
                                    target="_blank"
                                >
                                    View Movie
                                </a>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        if (movie.deleted_at) {
                                            Inertia.put(
                                                route(
                                                    "admin.dashboard.movie.restore",
                                                    movie.id
                                                )
                                            );
                                        } else {
                                            Inertia.delete(
                                                route(
                                                    "admin.dashboard.movie.destroy",
                                                    movie.id
                                                )
                                            );
                                        }
                                    }}
                                    href=""
                                    className="p-2 rounded hover:bg-red-500 text-white bg-red-400"
                                >
                                    {movie.deleted_at ? "Restore" : "Delete"}
                                </button>

                                <br />
                                <br />
                                <a
                                    href={route(
                                        "admin.dashboard.movie.edit",
                                        movie.id
                                    )}
                                    className="p-2 rounded hover:bg-yellow-500 text-white bg-yellow-400"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Authenticated>
    );
}

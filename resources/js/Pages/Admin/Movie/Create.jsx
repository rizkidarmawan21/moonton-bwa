import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, useForm } from "@inertiajs/inertia-react";
import React from "react";

export default function Create({ auth }) {
    const { setData, post, processing, errors } = useForm({
        name: "",
        category: "",
        video_url: "",
        thumbnail: "",
        rating: "",
        is_featured: false,
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type == "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.dashboard.movie.store"));
    };
    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Create New Movie" />
            <h1 className="text-xl">Insert a new Movie</h1>
            <hr className="mb-4" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="name" value="Name Movie" />
                    <TextInput
                        type="text"
                        name="name"
                        placeholder="Enter the name of the movie"
                        variant="primary-outline"
                        isFocused={true}
                        isError={errors.name}
                        handleChange={onHandleChange}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel forInput="category" value="Category Movie" />
                    <TextInput
                        type="text"
                        name="category"
                        placeholder="Enter the category of the movie"
                        variant="primary-outline"
                        isFocused={true}
                        isError={errors.category}
                        handleChange={onHandleChange}
                    />
                    <InputError message={errors.category} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel forInput="video_url" value="Video URL" />
                    <TextInput
                        type="url"
                        name="video_url"
                        placeholder="Enter the video url of the movie"
                        variant="primary-outline"
                        isFocused={true}
                        isError={errors.video_url}
                        handleChange={onHandleChange}
                    />
                    <InputError message={errors.video_url} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel forInput="thumbnail" value="Thumbnail" />
                    <TextInput
                        type="file"
                        name="thumbnail"
                        placeholder="Insert the thumbnail of the movie"
                        variant="primary-outline"
                        isFocused={true}
                        isError={errors.thumbnail}
                        defaultValue={movie.thumbnail}
                        handleChange={onHandleChange}
                    />
                    <InputError message={errors.thumbnail} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel forInput="rating" value="Rating" />
                    <TextInput
                        type="number"
                        name="rating"
                        placeholder="Enter the rating of the movie"
                        variant="primary-outline"
                        isFocused={true}
                        isError={errors.rating}
                        handleChange={onHandleChange}
                    />
                    <InputError message={errors.rating} className="mt-2" />
                </div>
                <div className="flex flex-row mt-4 items-center">
                    <InputLabel
                        forInput="is_featured"
                        value="Is Featured"
                        className="mr-3 mt-1"
                    />
                    <Checkbox
                        name="is_featured"
                        handleChange={(e) =>
                            setData("is_featured", e.target.checked)
                        }
                    />
                </div>
                <Button type="submit" className="mt-4" processing={processing}>
                    Save
                </Button>
            </form>
        </Authenticated>
    );
}

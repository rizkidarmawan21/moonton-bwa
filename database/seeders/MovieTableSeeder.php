<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $movies = [
           [
            'name' => 'Ms Marvel',
            'slug' => 'ms-marvel',
            'category' => 'Action',
            'video_url' => 'https://youtu.be/lgZwz3kGJ5U',
            'thumbnail' => 'https://images.bisnis-cdn.com/thumb/posts/2022/06/08/1541323/serial-ms-marvel-1.jpg?w=744&h=465',
            'rating' => 4.0,
            'is_featured' => 1
           ],
           [
            'name' => 'Black Panther 2022',
            'slug' => 'black-panther-2022',
            'category' => 'Action',
            'video_url' => 'https://youtu.be/lgZwz3kGJ5U',
            'thumbnail' => 'https://mmc.tirto.id/image/otf/1024x535/2018/02/18/black-panther----facebook_ratio-16x9.jpg',
            'rating' => 4.0,
            'is_featured' => 0
           ],
           [
            'name' => 'Iron Heart',
            'slug' => 'iron-heart',
            'category' => 'Cartoon',
            'video_url' => 'https://youtu.be/lgZwz3kGJ5U',
            'thumbnail' => 'https://img.okezone.com/okz/500/library/images/2019/09/09/t7j4xc0zht4boouovklm_13467.jpeg',
            'rating' => 4.0,
            'is_featured' => 0
           ]
        ];

        Movie::insert($movies);
    }
}

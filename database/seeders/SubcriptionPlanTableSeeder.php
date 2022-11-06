<?php

namespace Database\Seeders;

use App\Models\SubcriptionPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubcriptionPlanTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subcriptionPlans = [
           [
            'name'  => 'Basic',
            'price' => 150000,
            'active_period_in_months' => 3,
            'features' => json_encode(['Feature 1','Feature 2'])
           ],
           [
            'name'  => 'Premium',
            'price' => 250000,
            'active_period_in_months' => 6,
            'features' => json_encode(['Feature 1','Feature 2','Feature 3','Feature 4'])
           ]
        ];

        SubcriptionPlan::insert($subcriptionPlans);
    }
}

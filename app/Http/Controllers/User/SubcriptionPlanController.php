<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubcriptionPlan;
use App\Models\UserSubcription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubcriptionPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $subcriptionPlans = SubcriptionPlan::all();
        return inertia('User/SubcriptionPlan/Index',compact('subcriptionPlans'));

        // dd($subcriptionPlans);
    }
    

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, SubcriptionPlan $subcriptionPlan)
    {
        $data = [
            'user_id' => Auth::user()->id,
            'subcription_plan_id' => $subcriptionPlan->id,
            'price' => $subcriptionPlan->price,
            'expired_date' => Carbon::now()->addMonths($subcriptionPlan->active_period_in_months),
            'payment_status' => 'paid'  
        ];

        UserSubcription::create($data);

        return redirect()->route('user.dashboard.index');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SubcriptionPlan  $subcriptionPlan
     * @return \Illuminate\Http\Response
     */
    public function show(SubcriptionPlan $subcriptionPlan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SubcriptionPlan  $subcriptionPlan
     * @return \Illuminate\Http\Response
     */
    public function edit(SubcriptionPlan $subcriptionPlan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SubcriptionPlan  $subcriptionPlan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SubcriptionPlan $subcriptionPlan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SubcriptionPlan  $subcriptionPlan
     * @return \Illuminate\Http\Response
     */
    public function destroy(SubcriptionPlan $subcriptionPlan)
    {
        //
    }
}

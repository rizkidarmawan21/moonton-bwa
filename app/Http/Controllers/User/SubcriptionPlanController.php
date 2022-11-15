<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubcriptionPlan;
use App\Models\UserSubcription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Midtrans\Config;
use Illuminate\Support\Str;
use Midtrans\Notification;
use Midtrans\Snap;
use Midtrans\Transaction;

class SubcriptionPlanController extends Controller
{

    public function __construct()
    {
        Config::$serverKey = env('MIDTRANS_SERVERKEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION');
        Config::$isSanitized = env('MIDTRANS_IS_SANITIZED');
        Config::$is3ds = env('MIDTRANS_IS_3DS');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $subcriptionPlans = SubcriptionPlan::all();
        $userSubcription = null;
        return inertia('User/SubcriptionPlan/Index', compact('subcriptionPlans', 'userSubcription'));

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
            // 'expired_date' => Carbon::now()->addMonths($subcriptionPlan->active_period_in_months),
            'payment_status' => 'pending'
        ];

        $userSubcription = UserSubcription::create($data);

        $params = [
            'transaction_details' => [
                'order_id'     => $userSubcription->id . '-' . Str::random(5),
                'gross_amount' => $userSubcription->price
            ]
        ];

        $snapToken = Snap::getSnapToken($params);

        $userSubcription->update([
            'snap_token' => $snapToken
        ]);

        return inertia('User/SubcriptionPlan/Index', compact('userSubcription'));
    }

    public function midtransCallback(Request $request)
    {
        $notif = new Notification();

        $transaction_status = $notif->transaction_status;
        $fraud = $notif->fraud_status;

        $transaction_id = explode('-', $notif->order_id)[0];
        $userSubscription = UserSubcription::find($transaction_id);

        if ($transaction_status == 'capture') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'challenge'
                $userSubscription->payment_status = 'pending';
            }
            else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'success'
                $userSubscription->payment_status = 'paid';
                $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
            }
        }
        else if ($transaction_status == 'cancel') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            }
            else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            }
        }
        else if ($transaction_status == 'deny') {
            // TODO Set payment status in merchant's database to 'failure'
            $userSubscription->payment_status = 'failed';
        }
        else if ($transaction_status == 'settlement') {
            // TODO set payment status in merchant's database to 'Settlement'
            $userSubscription->payment_status = 'paid';
            $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
        }
        else if ($transaction_status == 'pending') {
            // TODO set payment status in merchant's database to 'Pending'
            $userSubscription->payment_status = 'pending';
        }
        else if ($transaction_status == 'expire') {
            // TODO set payment status in merchant's database to 'expire'
            $userSubscription->payment_status = 'failed';
        }

        $userSubscription->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Payment success'
        ]);
    }
}

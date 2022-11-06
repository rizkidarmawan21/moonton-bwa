import SubcriptionCard from "@/Components/SubcriptionCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

export default function SubcriptionPlan(props) {
    const selectSubcription = id => {
        Inertia.post(route('user.dashboard.subcriptionPlan.store',{
            subcriptionPlan: id
        }))
    }



    return (
        <Authenticated auth={props.auth}>
            <Head>
                <title>Subcription</title>
            </Head>
            <div className="py-20 flex flex-col items-center">
                <div className="text-black font-semibold text-[26px] mb-3">
                    Pricing for Everyone
                </div>
                <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                    Invest your little money to get a whole new experiences from
                    movies.
                </p>

                {/* <!-- Pricing Card --> */}
                <div className="flex justify-center gap-10 mt-[70px]">
                    {props.subcriptionPlans.map((subcription) => (
                        <SubcriptionCard
                        key={subcription.id}
                        name={subcription.name}
                        price={subcription.price}
                        durationInMount={subcription.active_period_in_months}
                        features={JSON.parse(subcription.features)}
                        isPremium={subcription.name === 'Premium'}
                        onSelectSubcription={() => selectSubcription(subcription.id)}
                        />
                    ))
                    
                    }
                </div>
                {/* <!-- /Pricing Card --> */}
            </div>
        </Authenticated>
    );
}

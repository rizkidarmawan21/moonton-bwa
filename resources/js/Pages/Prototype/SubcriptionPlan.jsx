import SubcriptionCard from "@/Components/SubcriptionCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

export default function SubcriptionPlan() {
    return (
        <Authenticated>
            <Head>
                <title>Subcription </title>
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
                    <SubcriptionCard
                        name="Basic"
                        price={100000}
                        durationInMount={3}
                        features={["Feature 1", "Feature 2"]}
                    />

                    <SubcriptionCard isPremium />
                </div>
                {/* <!-- /Pricing Card --> */}
            </div>
        </Authenticated>
    );
}

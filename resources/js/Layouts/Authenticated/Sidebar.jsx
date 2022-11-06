import React from "react";
import MenuItem from "./MenuItem";
import { UserMenu, UserOthers } from "./MenuList";
import SubcriptionDetail from "./SubcriptionDetail";

export default function Sidebar({ auth }) {
    return (
        <aside className="fixed z-50 w-[300px] h-full">
            <div className="flex flex-col p-[30px] pr-0 border-r border-gray-[#F1F1F1] overflow-y-auto h-full">
                <a href="/">
                    <img src="/assets/images/moonton.svg" alt="" />
                </a>
                <div className="links flex flex-col mt-[60px] h-full gap-[50px]">
                    {/* <!-- Menu --> */}
                    <div>
                        <div className="text-gray-1 text-sm mb-4">Menu</div>
                        {UserMenu.map((menu, i) => (
                            <MenuItem
                                key={i}
                                link={menu.link}
                                icon={menu.icon}
                                text={menu.text}
                                isActive={
                                    menu.link && route().current(menu.link)
                                }
                            />
                        ))}
                    </div>
                    {/* <!-- ./Menu --> */}

                    {/* <!-- Others --> */}
                    <div>
                        <div className="text-gray-1 side-link mb-4">Others</div>
                        {UserOthers.map((menuOther, i) => (
                            <MenuItem
                                key={i}
                                link={menuOther.link}
                                icon={menuOther.icon}
                                text={menuOther.text}
                                isActive={
                                    menuOther.link && route().current(menuOther.link)
                                }

                                method={menuOther.method}
                            />
                        ))}
                    </div>
                    {/* <!-- ./Others --> */}

                    {auth.activePlan && (
                        <SubcriptionDetail
                            name={auth.activePlan.name}
                            remainingActiveDays={
                                auth.activePlan.remainingActiveDays
                            }
                            activeDays={auth.activePlan.activeDays}
                            isPremium={auth.activePlan.name === "Premium"}
                        />
                    )}
                </div>
            </div>
        </aside>
    );
}

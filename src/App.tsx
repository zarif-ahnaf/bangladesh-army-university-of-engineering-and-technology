import { Circle } from "./icons/Circle";
import React, { createElement, lazy, useState } from "react";
import { cn } from "./functions/tailwind-merge";
type formData = { [key: string]: string };

export default function App() {
    const steps = {
        1: {
            label: "Personal Information",
        },
        2: {
            label: "Select Subject",
        },
        3: {
            label: "Customize",
        },
    };

    const [reachedStep, setReachedStep] = useState<number>(() => {
        return Math.min(...Object.keys(steps).map(Number));
    });

    const [formData, setFormData] = useState<formData>();

    const handle_previous_button_click = () => {
            if (reachedStep === Math.min(...Object.keys(steps).map(Number))) {
                console.error("Trying to be smart eh?");
            } else {
                setReachedStep((val) => {
                    return val - 1;
                });
            }
        },
        handle_next_button_click = () => {
            if (reachedStep === Math.max(...Object.keys(steps).map(Number))) {
                console.error("Trying to be smart eh?");
            } else {
                setReachedStep((val) => {
                    return val + 1;
                });
            }
        };
    const partial_mapping = { 1: lazy(() => import("./partials/1.tsx")) };
    const set_form_data = ({ name, value }: { name: string; value: string }) => {
        let new_data: typeof formData = {};
        new_data[name] = value;

        setFormData({ ...formData, ...new_data });
    };

    return (
        <>
            <div className="h-screen text-white">
                <div className="grid place-items-center h-full gap-0">
                    <div className="grid place-items-center">
                        <div className="w-32 rounded-box">
                            <img src="/bauet_logo.png" />
                        </div>
                        <ul className="timeline transition-all">
                            {Object.entries(steps).map(([number, value]) => {
                                const _number = parseInt(number);

                                const color_before_part = _number <= reachedStep;
                                const color_after_part = _number < reachedStep;
                                const show_circle_with_ticks = _number === reachedStep;

                                return (
                                    <li key={number}>
                                        <hr className={cn(color_before_part && "bg-primary", _number === Math.min(...Object.keys(steps).map(Number)) && "hidden")} />
                                        <div className="timeline-start timeline-box">{value.label}</div>
                                        <div className="timeline-middle">
                                            <Circle type={show_circle_with_ticks ? "with_tick" : "without_tick"} />
                                        </div>
                                        <hr className={cn(color_after_part && "bg-primary", _number === Math.max(...Object.keys(steps).map(Number)) && "hidden")} />
                                    </li>
                                );
                            })}
                        </ul>
                        {Object.entries(partial_mapping).map(([index, LazyComponent]) => {
                            return (
                                <div key={index}>
                                    {parseInt(index) === reachedStep ? (
                                        <>
                                            <React.Suspense fallback={<span className="loading loading-ring loading-xs"></span>}>
                                                <LazyComponent set_value={set_form_data} />
                                            </React.Suspense>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            );
                        })}
                        <div className="flex justify-between w-full">
                            <button className={cn("btn", reachedStep === Math.min(...Object.keys(steps).map(Number)) && "btn-disabled")} onClick={handle_previous_button_click}>
                                Previous
                            </button>
                            <button className={cn("btn", reachedStep === Math.max(...Object.keys(steps).map(Number)) && "btn-disabled")} onClick={handle_next_button_click}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

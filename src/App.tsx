import { Circle } from "./icons/Circle";
import { useState } from "react";
import { cn } from "./functions/tailwind-merge";
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
    return (
        <>
            <div className="bg-black h-screen">
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

                        <div className="flex justify-between w-full">
                            <button
                                className={cn("btn", reachedStep === Math.min(...Object.keys(steps).map(Number)) && "btn-disabled")}
                                onClick={() => {
                                    if (reachedStep === Math.min(...Object.keys(steps).map(Number))) {
                                        console.error("Trying to be smart eh?");
                                    } else {
                                        setReachedStep((val) => {
                                            return val - 1;
                                        });
                                    }
                                }}
                            >
                                Previous
                            </button>
                            <button
                                className={cn("btn", reachedStep === Math.max(...Object.keys(steps).map(Number)) && "btn-disabled")}
                                onClick={() => {
                                    if (reachedStep === Math.max(...Object.keys(steps).map(Number))) {
                                        console.error("Trying to be smart eh?");
                                    } else {
                                        setReachedStep((val) => {
                                            return val + 1;
                                        });
                                    }
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

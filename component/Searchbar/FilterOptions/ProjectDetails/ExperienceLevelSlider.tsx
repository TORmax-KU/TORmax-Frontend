import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface LevelSliderProps {
    value: string[];
    onChange: (value: string[]) => void;
}

export function ExperienceLevelSlider({ value, onChange }: LevelSliderProps) {
    const levels = ["Entry", "Mid", "Senior", "Expert"];
    const [range, setRange] = useState<[number, number]>([
        value.length > 0 ? levels.indexOf(value[0]) : 0,
        value.length > 1 ? levels.indexOf(value[1]) : levels.length - 1
    ]);

    const handleSliderChange = (val: [number, number]) => {
        setRange(val);
        const minLevel = levels[val[0]];
        const maxLevel = levels[val[1]];
        if (minLevel === maxLevel) {
            onChange([minLevel]);
        } else {
            onChange([minLevel, maxLevel]);
        }
    };

    return (
        <div className="form-control">
            <label className="label label-text text-xs opacity-70">Experience Level</label>
            <div className="bg-base-200/50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-xs">
                    <span className="text-base-content/60">{levels[range[0]]}</span>
                    <span className="text-base-content/60">{levels[range[1]]}</span>
                </div>
                <RangeSlider
                    min={0}
                    max={levels.length - 1}
                    step={1}
                    value={range}
                    onInput={handleSliderChange}
                    className="level-slider"
                />
                <div className="flex justify-between text-xs text-base-content/40">
                    {levels.map((level, index) => (
                        <span key={level} className={index >= range[0] && index <= range[1] ? 'text-primary font-medium' : ''}>
                            {level}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
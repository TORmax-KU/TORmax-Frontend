import { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface TeamSizeSliderProps {
    value: string;
    onChange: (value: string) => void;
}

export function TeamSizeSlider({ value, onChange }: TeamSizeSliderProps) {
    const sizes = ["1-3", "4-6", "7-10", "10+", "20+", "50+"];
    const currentIndex = value ? sizes.indexOf(value) : -1;
    
    // For single thumb slider, use value as [0, selectedIndex]
    const [sliderValue, setSliderValue] = useState<[number, number]>([
        0, // Lower thumb fixed at 0
        currentIndex >= 0 ? currentIndex : 0
    ]);

    // Update when value prop changes
    useEffect(() => {
        const idx = value ? sizes.indexOf(value) : -1;
        setSliderValue([0, idx >= 0 ? idx : 0]);
    }, [value]);

    const handleSliderChange = (val: [number, number]) => {
        // Only the upper thumb moves (val[1])
        const index = Math.round(val[1]);
        if (index >= 0 && index < sizes.length) {
            setSliderValue([0, index]);
            onChange(sizes[index]);
        }
    };

    return (
        <div className="form-control">
            <label className="label label-text text-xs opacity-70">Team Size</label>
            <div className="bg-base-200/50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-base-content/70">
                        {currentIndex >= 0 ? sizes[currentIndex] : 'Any Size'}
                    </span>
                    <span className="text-xs text-base-content/40">
                        {currentIndex >= 0 ? `${currentIndex + 1}/${sizes.length}` : 'Select'}
                    </span>
                </div>
                
                {/* Single thumb slider configuration */}
                <RangeSlider
                    min={0}
                    max={sizes.length - 1}
                    step={1}
                    value={sliderValue}
                    onInput={handleSliderChange}
                    className="team-slider"
                    // Key fix: Disable lower thumb and range sliding
                    thumbsDisabled={[true, false]}  // Lower thumb disabled, upper thumb active
                    rangeSlideDisabled={true}       // Disable range sliding
                />
                
                <div className="flex justify-between text-xs text-base-content/40">
                    {sizes.map((size, index) => (
                        <span 
                            key={size} 
                            className={`
                                transition-all duration-200
                                ${index === currentIndex ? 'text-primary font-bold scale-110' : 'hover:text-base-content/70'}
                            `}
                        >
                            {size}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-base-content/30">Small</span>
                    <span className="text-[10px] text-base-content/30">Large</span>
                </div>
                {currentIndex >= 0 && (
                    <button
                        type="button"
                        onClick={() => {
                            setSliderValue([0, 0]);
                            onChange("");
                        }}
                        className="text-xs text-base-content/40 hover:text-error transition-colors"
                    >
                        Clear selection
                    </button>
                )}
            </div>
        </div>
    );
}
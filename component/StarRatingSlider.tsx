'use client';

import ReactStars from "react-rating-stars-component";

interface StarRatingSliderProps {
    value: string;
    onChange: (value: string) => void;
}

export default function StarRatingSlider({ value, onChange }: StarRatingSliderProps) {
    const ratings = ["3.0+", "3.5+", "4.0+", "4.5+"];
    const currentIndex = value ? ratings.indexOf(value) : -1;
    const currentStars = currentIndex >= 0 ? parseFloat(ratings[currentIndex].replace('+', '')) : 0;

    const ratingChanged = (newValue: number) => {
        let rating = "";
        if (newValue >= 4.5) rating = "4.5+";
        else if (newValue >= 4.0) rating = "4.0+";
        else if (newValue >= 3.5) rating = "3.5+";
        else if (newValue >= 3.0) rating = "3.0+";
        else rating = "";
        onChange(rating);
    };

    const starConfig = {
        size: 30,
        count: 5,
        color: "#d1d5db", // Changed from transparent to visible gray
        activeColor: "#f59e0b", // Warning color
        value: currentStars,
        isHalf: true,
        edit: true,
        onChange: ratingChanged,
        emptyIcon: <i className="far fa-star" style={{ color: '#6b7280' }} />, // Visible gray
        halfIcon: <i className="fa fa-star-half-alt" style={{ color: '#f59e0b' }} />,
        filledIcon: <i className="fa fa-star" style={{ color: '#f59e0b' }} />,
    };

    return (
        <div className="form-control">
            <label className="label label-text text-xs opacity-70">Minimum Rating</label>

            <div className="bg-base-200/50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <ReactStars {...starConfig} />
                        {currentStars > 0 && (
                            <span className="text-sm font-medium text-warning">
                                {currentStars.toFixed(1)}+ ★
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {currentStars > 0 && (
                            <button
                                type="button"
                                onClick={() => {
                                    onChange("");
                                }}
                                className="text-xs text-base-content/40 hover:text-error transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
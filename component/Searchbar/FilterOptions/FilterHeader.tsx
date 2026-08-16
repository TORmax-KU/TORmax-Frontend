import { RiFilter2Fill, RiCloseFill } from "@remixicon/react";

interface FilterHeaderProps {
    activeCount: number;
    onClear: () => void;
}

export default function FilterHeader({ activeCount, onClear }: FilterHeaderProps) {
    return (
        <div className="flex items-center justify-between border-b border-base-300 pb-4 sticky top-0 bg-base-100/95 backdrop-blur-sm z-10 -mx-2 px-4 pt-2 rounded-t-xl">
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl shadow-lg shadow-primary/10">
                    <RiFilter2Fill className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Advanced Filters
                    </h2>
                    <p className="text-xs opacity-60 flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />
                        {activeCount} active filter{activeCount !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>
            <button
                onClick={onClear}
                className="btn btn-ghost btn-sm gap-1.5 text-xs hover:bg-error/10 hover:text-error transition-all duration-300"
            >
                <RiCloseFill className="h-4 w-4" />
                Clear all
            </button>
        </div>
    );
}
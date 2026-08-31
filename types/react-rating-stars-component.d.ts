declare module 'react-rating-stars-component' {
    import { Component } from 'react';

    interface ReactStarsProps {
        /** Number of stars to display (default: 5) */
        count?: number;
        /** Current rating value */
        value?: number;
        /** Callback when rating changes */
        onChange?: (newValue: number) => void;
        /** Size of each star in pixels (default: 30) */
        size?: number;
        /** Color of empty stars (default: "gray") */
        color?: string;
        /** Color of filled stars (default: "#ffd700") */
        activeColor?: string;
        /** Enable half-star selection (default: false) */
        isHalf?: boolean;
        /** Enable editing (default: true) */
        edit?: boolean;
        /** Enable accessibility (default: false) */
        a11y?: boolean;
        /** Custom empty star icon */
        emptyIcon?: React.ReactNode;
        /** Custom half star icon */
        halfIcon?: React.ReactNode;
        /** Custom filled star icon */
        filledIcon?: React.ReactNode;
        /** Additional props */
        [key: string]: any;
    }

    export default class ReactStars extends Component<ReactStarsProps> { }
}
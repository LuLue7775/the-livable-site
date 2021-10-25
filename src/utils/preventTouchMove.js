import { useEffect, useState } from 'react';

export default function preventTouchMove() {

    const [firstClientX, setFirstClientX] = useState();
    const [firstClientY, setFirstClientY] = useState();
    const [clientX, setClientX] = useState();

    useEffect(() => {
        const touchStart = e => {
            setFirstClientX(e.touches[0].clientX);
            setFirstClientY(e.touches[0].clientY);
        };

        const preventTouch = e => {
            const minValue = 5; // threshold

            setClientX(e.touches[0].clientX - firstClientX);

            // Vertical scrolling does not work when you start swiping horizontally.
            if (Math.abs(clientX) > minValue) {
                e.preventDefault();
                e.returnValue = false;
                return false;
            }
        };

        window.addEventListener('touchstart', touchStart);
        window.addEventListener('touchmove', preventTouch, { passive: false });
        return () => {
            window.removeEventListener('touchstart', touchStart);
            window.removeEventListener('touchmove', preventTouch, {
            passive: false,
        });
        };
    }, [clientX, firstClientX, firstClientY]);

}
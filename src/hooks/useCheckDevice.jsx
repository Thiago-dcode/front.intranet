import React, { useState, useEffect } from 'react'

export default function useCheckDevice() {


    const [isPhone, setIsPhone] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1023) {
                setIsDesktop(true);
                setIsTablet(false);
                setIsPhone(false);
            } else if (window.innerWidth <= 1023 && window.innerWidth > 767) {
                setIsDesktop(false);
                setIsTablet(true);
                setIsPhone(false);
            } else {
                setIsDesktop(false);
                setIsTablet(false);
                setIsPhone(true);
            }
        };

        // Add the event listener
        window.addEventListener('resize', handleResize);

        // Call handleResize once to set the initial state
        handleResize();

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return { isDesktop, isTablet, isPhone };

}

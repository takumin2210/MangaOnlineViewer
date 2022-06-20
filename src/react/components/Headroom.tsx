import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Header = styled.div`
    transition: transform 0.3s ease-in, background-color 0.3s linear;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    z-index: 900;

    &.scroll-hide {
        transform: translateY(-100%);
    }

    &.scroll-show {
        transform: translateY(-1%);
    }
`;
const useScrollDirection = (showEnd = 0) => {
    const [scrollDirection, setScrollDirection] = useState('');
    const [prevOffset, setPrevOffset] = useState(0);

    const toggleScrollDirection = () => {
        const { scrollY } = window;
        if (showEnd && scrollY + window.innerHeight + showEnd > document.body.offsetHeight) {
            setScrollDirection('show');
        } else if (scrollY > prevOffset && scrollY > 50) {
            setScrollDirection('hide');
        } else if (scrollY < prevOffset && scrollY > 50) {
            setScrollDirection('show');
        } else {
            setScrollDirection('');
        }
        setPrevOffset(scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleScrollDirection);
        return () => {
            window.removeEventListener('scroll', toggleScrollDirection);
        };
    });
    return scrollDirection;
};

interface HeadroomProps {
    children: JSX.Element;
}

const Headroom: React.FC<HeadroomProps> = ({ children, ...props }) => {
    const scrollDirection = useScrollDirection(100);
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Header className={`scroll-${scrollDirection}`} {...props}>
            {children}
        </Header>
    );
};

export default Headroom;

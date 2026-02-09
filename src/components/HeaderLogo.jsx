import React from 'react';
import { Link } from 'react-router-dom';
import Logo3D from './Logo3D';

const HeaderLogo = () => {
    return (
        <div className="fixed -top-2 md:-top-4 left-4 z-50">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="group-hover:scale-110 transition-transform duration-300">
                    <Logo3D className="w-16 h-16 md:w-24 md:h-24" />
                </div>
            </Link>
        </div>
    );
};

export default HeaderLogo;

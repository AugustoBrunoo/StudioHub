import { forwardRef } from 'react';

// forwardRef recebe (props, ref)
export const ContainerHero = forwardRef(({ children }, ref) => {
    return (
        <div ref={ref} className="w-full flex flex-col items-center">
            {children}
        </div>
    );
});

// É uma boa prática dar um displayName quando usamos forwardRef
ContainerHero.displayName = 'ContainerHero';
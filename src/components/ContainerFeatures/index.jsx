import { forwardRef } from "react";

export const ContainerFeatures = forwardRef(({ children }, ref) => {
    return (
        <section ref={ref} id="funcionalidades" className="py-24 px-8 max-w-7xl mx-auto">
            {children}
        </section>
    );
}); 

// Boa prática para evitar avisos no console do React:
ContainerFeatures.displayName = 'ContainerFeatures';
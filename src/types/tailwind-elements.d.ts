import React from 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'el-popover': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                anchor?: string;
                popover?: string;
                className?: string;
                id?: string;
            };
        }
    }
}

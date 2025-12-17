declare namespace JSX {
    interface IntrinsicElements {
        'el-popover': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            anchor?: string;
            popover?: string;
        };
    }
}

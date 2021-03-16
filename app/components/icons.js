import { Icon } from "cx/widgets";
import { VDOM, CSS } from "cx/ui";

Icon.register("undo", ({ key, className, style } = {}) => (
    <svg
        key={key}
        className={className}
        style={style}
        viewBox="0 0 485.183 485.183"
    >
        <g>
            <path
                fill="currentColor"
                stroke="none"
                d="M257.751,113.708c-74.419,0-140.281,35.892-181.773,91.155L0,128.868v242.606h242.606l-82.538-82.532   c21.931-66.52,84.474-114.584,158.326-114.584c92.161,0,166.788,74.689,166.788,166.795   C485.183,215.524,383.365,113.708,257.751,113.708z"
            />
        </g>
    </svg>
));

Icon.register("close", ({ key, className, style } = {}) => (
    <svg
        key={key}
        className={className}
        style={style}
        viewBox="0 0 50 50"
    >
        <g>
            <path
                fill="none"
                stroke="currentColor"
                d="M37.304 11.282l1.414 1.414-26.022 26.02-1.414-1.413z"
            />
            <path
                fill="none"
                stroke="currentColor"
                d="M12.696 11.282l26.022 26.02-1.414 1.415-26.022-26.02z"
            />
        </g>
    </svg>
));

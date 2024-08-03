import type { ExtendedIconProps } from '@/types/icon';

export const ChevronRight = ({
  width = 24,
  height = 24,
  opacity = 1,
}: ExtendedIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    <mask
      id="mask0_160_28"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="25"
      height="24"
    >
      <line
        y1="-0.355837"
        x2="32.3274"
        y2="-0.355837"
        transform="matrix(-0.730931 0.682451 0.682451 0.730931 24.4761 1.51706)"
        stroke="#E6E6E6"
        strokeWidth="0.711674"
      />
      <line
        x1="1.08977"
        y1="1.25697"
        x2="24.7189"
        y2="23.3189"
        stroke="#E6E6E6"
        strokeWidth="0.711674"
      />
    </mask>
    <g mask="url(#mask0_160_28)">
      <rect
        width="20.6753"
        height="88.5005"
        transform="matrix(-1 0 0 1 12.6615 -18.6403)"
        fill="#D9D9D9"
      />
    </g>
  </svg>
);

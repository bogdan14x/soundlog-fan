import type { ExtendedIconProps } from '@/types/icon';

export const ModalClose = ({
  width = 16,
  height = 16,
  opacity = 1,
}: ExtendedIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 36 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    <line
      x1="1.76354"
      y1="0.634534"
      x2="34.9657"
      y2="31.6345"
      stroke="#E6E6E6"
    />
    <line
      y1="-0.5"
      x2="45.4245"
      y2="-0.5"
      transform="matrix(-0.730931 0.682451 0.682451 0.730931 34.6245 1)"
      stroke="#E6E6E6"
    />
  </svg>
);

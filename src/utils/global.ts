import cls from './cls';

export const buttonBorder =
  'bg-clickableBackground border border-clickableStroke hover:border-borderHover';
export const tileBorder = 'border border-globalStroke rounded-xl';
export const tileGradient = 'bg-gradient-to-b from-black to-offBlack/40';
export const accentGradient =
  'bg-gradient-to-b from-white to-accent bg-clip-text text-transparent';
export const buttonBaseStyles = cls(
  'font-roboto font-normal text-base',
  'flex items-center',
  'px-6 rounded-lg py-1',
  'transition-border duration-200',
  'disabled:bg-zinc-800 disabled:opacity-90 disabled:border-0 disabled:cursor-not-allowed',
);
export const ANON_USER_KEY = 'anon_user_id';
export const buttonLight = 'bg-offWhite text-offBlack';
export const buttonInline = 'flex self-start';
export const buttonAccent = 'bg-accent border border-accent hover:border-white';
export const buttonCTAStyles =
  'font-roboto text-base rounded-lg px-6 py-3 transition-border duration-200';
export const buttonActive = 'active:translate-x-px active:translate-y-px';

export const tileSubtitle = 'text-subtitle text-xs md:text-base text-offWhite';

export const activeStyling =
  'underline-offset-3 underline decoration-accent decoration-4';

export const hoverStyling =
  'hover:underline-offset-3 hover:underline hover:decoration-accent decoration-4';

export const h1Styling =
  'font-grotesk font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl';

export const h2Styling =
  'font-grotesk text-2xl md:text-4xl font-bold tracking-tight self-start';
export const h3Styling = 'font-grotesk text-xl md:text-2xl self-start font-semibold';

export const contentStyle = 'py-10 w-full text-left md:py-12';

export const inputStyling =
  'bg-transparent placeholder:text-placeholder border border-inputStroke rounded-lg px-4 py-2 text-sm my-2 w-full';

import {
	SiFacebook,
	SiInstagram,
	SiSoundcloud,
	SiThreads,
	SiTiktok,
	SiX,
	SiYoutube,
} from "@icons-pack/react-simple-icons";
import {
	ArtistData,
	SocialLinks,
	SoundlogResult,
} from "./types/SoundlogResult";
import cls from "./utils/cls";
import { tileBorder } from "./utils/global";
import { ReactNode } from "react";

const iconSize = 16;
const iconsMap: Record<string, ReactNode> = {
	instagram: <SiInstagram size={iconSize} className="shrink-0" />,
	tiktok: <SiTiktok size={iconSize} className="shrink-0" />,
	youtube: <SiYoutube size={iconSize} className="shrink-0" />,
	x: <SiX size={iconSize} className="shrink-0" />,
	soundcloud: <SiSoundcloud size={iconSize} className="shrink-0" />,
	threads: <SiThreads size={iconSize} className="shrink-0" />,
	facebook: <SiFacebook size={iconSize} className="shrink-0" />,
};
const labelsMap: Record<string, string> = {
	instagram: "Instagram",
	tiktok: "TikTok",
	youtube: "YouTube",
	x: "Twitter",
	soundcloud: "SoundCloud",
	threads: "Threads",
	facebook: "Facebook",
};

export const getSocialURL = (
	artist: ArtistData,
	name: string
): string | null => {
	return (
		artist.socials.items.find(
			(s) => s.name.toLowerCase() === name.toLowerCase()
		)?.url ?? null
	);
};

export const getSocialItems = ({
	soundlog,
	artist,
}: SoundlogResult): SocialLinks => {
	const socials: SocialLinks = {
		facebook: "",
		instagram: "",
		tiktok: "",
		youtube: "",
		soundcloud: "",
		x: "",
		threads: "",
	};
	socials.facebook =
		getSocialURL(artist, "facebook") ?? soundlog.socials.facebook;
	socials.instagram =
		getSocialURL(artist, "instagram") ?? soundlog.socials.instagram;
	socials.tiktok = getSocialURL(artist, "tiktok") ?? soundlog.socials.tiktok;
	socials.youtube =
		getSocialURL(artist, "youtube") ?? soundlog.socials.youtube;
	socials.threads =
		getSocialURL(artist, "soundcloud") ?? soundlog.socials.threads;
	socials.x = getSocialURL(artist, "twitter") ?? soundlog.socials.x;
	socials.soundcloud =
		getSocialURL(artist, "soundcloud") ?? soundlog.socials.soundcloud;

	return socials;
};

export const getWidth = (socials: SocialLinks): [string, string] => {
	const len = Object.values(socials).filter((v) => v !== "").length;
	if (len % 5 === 0) {
		return ["w-[calc(33%-1rem)] five_items", "w-full"];
	}
	if (len % 3 === 0) {
		return ["w-[calc(33%-1rem)]", "w-full"];
	}
	if (len % 2 === 0) {
		return ["w-[calc(40%-1rem)]", "w-[80%] mx-auto"];
	}
	return ["w-[calc(33%-1rem)]", "w-full"];
};

export const atLeastOneSocial = ({
	soundlog,
	artist,
}: SoundlogResult): boolean => {
	return (
		soundlog.socials.facebook !== "" ||
		soundlog.socials.instagram !== "" ||
		soundlog.socials.tiktok !== "" ||
		soundlog.socials.soundcloud !== "" ||
		soundlog.socials.youtube !== "" ||
		soundlog.socials.x !== "" ||
		artist.socials.items.length > 0
	);
};

export interface SocialBarProps {
	data: SoundlogResult;
}

export const SocialBar = ({ data }: SocialBarProps) => {
	const socials = getSocialItems(data);
	const [iconWidth, containerWidth] = getWidth(socials);
	const socialIconsItemStyle = cls(
		"flex gap-2 items-center social_icon",
		iconWidth,
		"transition-all duration-200ms hover:text-offWhite",
		"active:text-offWhite select-none"
	);

	return (
		<div
			className={cls(
				"font-roboto text-xs text-socialIconLabel",
				tileBorder,
				"bg-black/90",
				"my-1 rounded-xl px-4 py-4"
			)}
		>
			<div
				className={cls(
					containerWidth,
					"flex flex-wrap justify-between gap-4"
				)}
			>
				{Object.keys(socials).map(
					(social: string) =>
						(socials as any)[social] !== "" &&(
							<a
								href={(socials as any)[social]}
								target="_blank"
								rel="noreferrer"
								className={socialIconsItemStyle}
								key={social}
							>
								{iconsMap[social]}
								{labelsMap[social]}
							</a>
						)
				)}
			</div>
		</div>
	);
};

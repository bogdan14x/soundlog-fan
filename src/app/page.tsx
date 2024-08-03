import ArtistPage from "@/ArtistPage";
import getSoundlog from "@/server/getSoundlog";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	const { soundlog, artist } = await getSoundlog();

	return {
		title: `${soundlog.artist_name} on Soundlog`,
		description: artist.bio,
		twitter: {
			title: `${soundlog.artist_name} on Soundlog`,
			description: artist.bio,
			images: [soundlog.cover_image],
		},
		openGraph: {
			images: [soundlog.cover_image],
		},
	};
}

export default async function Home() {
	const data = await getSoundlog();
	return <ArtistPage {...data} />;
}

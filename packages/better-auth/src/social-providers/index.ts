import { apple } from "./apple";
import { discord } from "./discord";
import { facebook } from "./facebook";
import { github } from "./github";
import { google } from "./google";
import { spotify } from "./spotify";
import { twitch } from "./twitch";
import { twitter } from "./twitter";

export const oAuthProviders = {
	apple,
	discord,
	facebook,
	github,
	google,
	spotify,
	twitch,
	twitter,
};

export const oAuthProviderList = Object.keys(oAuthProviders) as [
	"github",
	...(keyof typeof oAuthProviders)[],
];

export * from "./github";
export * from "./google";
export * from "./apple";
export * from "./discord";
export * from "./spotify";
export * from "./twitch";
export * from "./facebook";
export * from "./twitter";
export * from "../types/provider";

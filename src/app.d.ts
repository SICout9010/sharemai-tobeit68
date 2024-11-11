// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import Pocketbase from 'pocketbase';
import type { AuthModel } from "pocketbase";
import 'unplugin-icons/types/svelte';
/// <reference types="google.accounts" />
/// <reference types="google.picker" />
/// <reference types="gapi" />

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: Pocketbase;
			user: AuthModel | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

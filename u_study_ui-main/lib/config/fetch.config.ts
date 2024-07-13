"use client";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export const fetchConfig: RequestInit = {
	headers: {
		Accept: "*/*",
		"User-Agent": "Thunder Client (https://www.thunderclient.com)",
		"Content-Type": "application/json",
		Authorization: `Bearer ${localStorage.getItem("access_token")}`,
	},
	credentials: "omit",
};

/* eslint-disable import/no-extraneous-dependencies */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(...inputs));

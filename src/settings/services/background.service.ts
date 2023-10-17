import {BackgroundType} from "../../shared/models/backgroundType.enum.ts";

export const getBackgroundClasses = (background: BackgroundType): string => {
  switch (background) {
    case BackgroundType.LIGHT: return "bg-gradient-to-r from-gray-100 to-gray-300";
    case BackgroundType.DARK: return "bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900";
    case BackgroundType.PINK_GUY: return "bg-gradient-to-r from-fuchsia-600 to-pink-600";
    case BackgroundType.OCEANIC: return "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600";
    case BackgroundType.COTTON_CANDY: return "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400";
    case BackgroundType.HYPER: return "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500";
    case BackgroundType.FLAMINGO: return "bg-gradient-to-r from-pink-400 to-pink-600";
    case BackgroundType.SUBLIME: return "bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500";
    case BackgroundType.POWER_PUFF: return "bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400";
    case BackgroundType.PURPLE_HAZE: return "bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800";
    case BackgroundType.SLATE: return "bg-gradient-to-r from-gray-700 via-gray-900 to-black";
    case BackgroundType.CLEAR_NIGHT: return "bg-gradient-to-r from-blue-800 to-indigo-900";
    default: return "bg-gradient-to-r from-blue-800 to-indigo-900";
  }
}
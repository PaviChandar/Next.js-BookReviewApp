import { clsx, type ClassValue } from "clsx"
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function jsonResponse(data: any, status = 200) {
  return NextResponse.json(
    typeof data === 'string' ? { message: data } : data,
    { status }
  );
}
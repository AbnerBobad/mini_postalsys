// one_dayh.ts

import { PackageDetails } from "./package_detailh";

export interface OneDayPackage extends PackageDetails {
    calculateCost(): number;
    printLabel(): void;
}

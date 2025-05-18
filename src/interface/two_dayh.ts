// two_day.h

import { PackageDetails } from "./package_detailh";

export interface TwoDayPAckage extends PackageDetails {
    calculateCost(): number;
    printLabel(): void;
}

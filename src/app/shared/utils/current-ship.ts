import { GlobalConfig } from "@shared/configs/global-config";
import { EncryptedStorage } from "./encrypted-storage";

export const currentShip = () => {
    return JSON.parse(
        new EncryptedStorage().getItem(new GlobalConfig().shipDetails)!
    );
};
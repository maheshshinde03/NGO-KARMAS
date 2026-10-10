import { GlobalConfig } from "@shared/configs/global-config";
import { EncryptedStorage } from "./encrypted-storage";

export const currentMenu = () => {
    return JSON.parse(
        new EncryptedStorage().getItem(new GlobalConfig().menu)!
    );
};

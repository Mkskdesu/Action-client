import { v4 as uuidv4 } from "uuid";
import UAParser from "ua-parser-js";

let parser = new UAParser();

export default {
    uuid: uuidv4(),
    userid: "",
    device: {
        id: uuidv4(),
        name: `${parser.getOS().name} 上の ${parser.getBrowser().name}`
    },
    name: "USER",
    icon: null,
    createdAt: 0,
    sid: "",
}
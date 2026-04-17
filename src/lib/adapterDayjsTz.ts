import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { dayjsTz } from "./dayjsTz";

export class AdapterDayjsTz extends AdapterDayjs {
  constructor({ locale }: { locale?: string } = {}) {
    super({ locale });
    this.dayjs = dayjsTz;
  }
}

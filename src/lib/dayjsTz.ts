import dayjs from "dayjs";
import localePtBr from "dayjs/locale/pt-br";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(localePtBr);
dayjs.tz.setDefault("America/Sao_Paulo");

export const dayjsTz = dayjs;

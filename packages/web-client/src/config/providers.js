import { LocaleProvider } from "antd";

const providers = [
  { element: LocaleProvider, props: { locale: navigator.language } }
];

export default providers;

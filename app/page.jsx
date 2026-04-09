import HomePage from "./components/HomePage";
import { createPageMetadata, SEO_HOME_TITLE_SEGMENT } from "../lib/seo";

export const metadata = createPageMetadata({
  title: SEO_HOME_TITLE_SEGMENT,
  description:
    "Evaluare EEG și ședințe neurofeedback la Cluj-Napoca: protocoale pentru somn, anxietate, ADHD și performanță mentală. Brainmapping clar, plan personalizat, echipă Synaptica Cluj.",
  path: "/",
});

export default function Home() {
  return <HomePage />;
}

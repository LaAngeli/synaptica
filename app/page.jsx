import HomePage from "./components/HomePage";
import { createPageMetadata, SEO_HOME_TITLE_SEGMENT } from "../lib/seo";

export const metadata = createPageMetadata({
  title: SEO_HOME_TITLE_SEGMENT,
  description:
    "Neurofeedback și brainmapping EEG în Cluj-Napoca: evaluare EEG, antrenament cerebral non-invaziv și protocoale personalizate pentru somn, stres, concentrare și echilibru mental.",
  path: "/",
});

export default function Home() {
  return <HomePage />;
}

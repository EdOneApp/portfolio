import ProjectPage, {
  generateMetadata as projectMetadata,
} from "../[slug]/page";
export async function generateMetadata() {
  return projectMetadata({ params: Promise.resolve({ slug: "cacaosat" }) });
}
export default function LegacyProject() {
  return ProjectPage({ params: Promise.resolve({ slug: "cacaosat" }) });
}

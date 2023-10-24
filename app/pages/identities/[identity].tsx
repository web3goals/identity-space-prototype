import { useRouter } from "next/router";
import { FullWidthSkeleton } from "@/components/styled";
import Layout from "@/components/layout";

/**
 * Page with an identity.
 */
export default function Identity() {
  const router = useRouter();
  const { identity } = router.query;

  return (
    <Layout maxWidth="sm">{identity ? <>...</> : <FullWidthSkeleton />}</Layout>
  );
}

import { lazy } from "react";

const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));

export const component = () => {
  return (
    <Suspense fallback={<Loading />}>
      <h2>Preview</h2>
      <MarkdownPreview />
    </Suspense>
  );
};

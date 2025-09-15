import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'

import ChangelogPostHeader from "./components/ChangelogPostHeader/ChangelogPostHeader";
import { VideoButtonWithModal } from "./components/VideoButtonWithModal";

const docsComponents = getDocsMDXComponents()
 
export function useMDXComponents(components) {
  return {
    ...docsComponents,
    ...components,
    ChangelogPostHeader,
    VideoButtonWithModal,
  }
}

export {};

import * as TableauExtensions from '@tableau/extensions-api-types/ExternalContract/Extensions/Namespaces/Tableau';
import * as TableauShared from '@tableau/extensions-api-types/ExternalContract/Shared/Namespaces/Tableau';

type Tableau = typeof TableauExtensions & typeof TableauShared;


declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tableau: Tableau;
  }
}
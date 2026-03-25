/**
 * Bold Mark Extension
 */

import { createMarkExtension } from '../create';
import { toggleMarkWithStoredMarks } from './markUtils';
import type { ExtensionContext, ExtensionRuntime } from '../types';

export const BoldExtension = createMarkExtension({
  name: 'bold',
  schemaMarkName: 'bold',
  markSpec: {
    parseDOM: [
      { tag: 'strong' },
      { tag: 'b' },
      {
        style: 'font-weight',
        getAttrs: (value) => (/^(bold(er)?|[5-9]\d{2})$/.test(value as string) ? null : false),
      },
    ],
    toDOM() {
      return ['strong', 0];
    },
  },
  onSchemaReady(ctx: ExtensionContext): ExtensionRuntime {
    return {
      commands: {
        toggleBold: () => toggleMarkWithStoredMarks(ctx.schema.marks.bold),
      },
      keyboardShortcuts: {
        'Mod-b': toggleMarkWithStoredMarks(ctx.schema.marks.bold),
      },
    };
  },
});

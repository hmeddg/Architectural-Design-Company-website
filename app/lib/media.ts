/**
 * Media slots
 * -----------------------------------------------------------------------------
 * The Figma file's MCP quota was exhausted before `download_assets` could run,
 * so the comp's photography could not be exported. Rather than ship broken
 * <Image> tags, every picture in the design is modelled as a `MediaSlot` that
 * carries its Figma layer name and its exact intrinsic box from the comp.
 *
 *   • `src` set   → rendered with next/image at the comp's aspect ratio
 *   • `src` unset → rendered as a labelled placeholder of the same box, so the
 *                   layout is already pixel-correct before the art arrives
 *
 * To finish the build: export each layer from Figma to the `expectedPath`
 * below, then set `src` to that path. Nothing else has to change.
 * See ASSETS.md for the full checklist.
 */
export type MediaSlot = {
  /** Layer name in "HOME — 1440 Desktop" — keeps the mapping auditable. */
  figmaLayer: string;
  /** Public path once the export is dropped in. Leave unset to placeholder. */
  src?: string;
  /** Where the export belongs. Shown in the placeholder while `src` is unset. */
  expectedPath: string;
  alt: string;
  /** Intrinsic box measured in the comp; drives aspect-ratio + `sizes`. */
  width: number;
  height: number;
};

/** Aspect ratio as a CSS `aspect-ratio` value. */
export function ratioOf(slot: MediaSlot): string {
  return `${slot.width} / ${slot.height}`;
}

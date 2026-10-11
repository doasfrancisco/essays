import type { Block } from "@/content/essays";
import RichText from "./RichText";

export default function EssayBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) =>
        block.type === "quote" ? (
          <blockquote key={index} className="pullquote">
            <RichText text={block.text} />
          </blockquote>
        ) : block.type === "lead" ? (
          <p key={index}>
            <strong>{block.lead}</strong> <RichText text={block.text} />
          </p>
        ) : block.type === "thanks" ? (
          <p key={index} className="thanks">
            <strong>{block.lead ?? "Thanks"}</strong> <RichText text={block.text} />
          </p>
        ) : (
          <p key={index}>
            <RichText text={block.text} />
          </p>
        )
      )}
    </>
  );
}

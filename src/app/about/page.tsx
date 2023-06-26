import { CONTENT_PAGE_ABOUT } from "../../../utils/content";
import { createHash } from "node:crypto";

function processMarkup(content: string[][]) {
  const result = [];
  for (let i = 0; i < content.length; i++) {
    const [tag, text] = content[i];
    var hash = createHash("md5").update(text).digest("hex");
    let element;
    if (tag === "h2") {
      element = (
        <h2 className="globalH1" key={hash}>
          {text}
        </h2>
      );
    }
    if (tag === "p") {
      element = (
        <p key={hash}>
          {text}
        </p>
      );
    }
    result.push(element);
  }
  return result;
}

export default function About() {
  const content = processMarkup(CONTENT_PAGE_ABOUT);
  return (
    <section>
      <div className="globalCard">{content}</div>
    </section>
  );
}

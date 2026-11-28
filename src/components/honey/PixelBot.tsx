const head = [
  ".......GG.......",
  ".......DD.......",
  "...DDDDDDDDDD...",
  "..DLLLWWWWWWWD..",
  ".DLLWWWWWWWWWWD.",
  ".DLWSSSSSSSSWWD.",
  "DDWWSSSSSSSSWWDD",
  "DGWWSSSSSSSSWWGD",
  "DDWWSSSSSSSSWWDD",
  ".DWWSSSSSSSSWWD.",
  ".DWWWWWWWWWWWWD.",
  "..DDDDDDDDDDDD..",
];
const body = [
  "....DDDDDDDD....",
  "...DWWWWWWWWD...",
  "...DWWGGGGWWD...",
  "...DWWGWWGWWD...",
  "...DWWGGGGWWD...",
  "...DWWWWWWWWD...",
  "....DDDDDDDD....",
  ".....DD..DD.....",
  ".....GG..GG.....",
];
const fill: Record<string, string> = {
  D: "#2a0810",
  W: "#8a1a30",
  L: "#c03a55",
  S: "#160407",
  G: "#d9b27a",
};

function cells(rows: string[], y0: number) {
  return rows.flatMap((row, y) =>
    [...row].map((c, x) =>
      c === "." ? null : (
        <rect key={`${x}-${y + y0}`} x={x} y={y + y0} width="1.02" height="1.02" fill={fill[c]} />
      ),
    ),
  );
}

export default function PixelBot({ mood = "idle" }: { mood?: "idle" | "talk" | "happy" }) {
  return (
    <svg
      className={`pbot is-${mood}`}
      viewBox="-1 -1 18 23"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <g className="pbot-body">{cells(body, 12)}</g>
      <g className="pbot-arm is-left">
        <rect x="1" y="13" width="2" height="1" fill="#2a0810" />
        <rect x="1" y="14" width="2" height="2" fill="#8a1a30" />
        <rect x="1" y="16" width="2" height="1" fill="#d9b27a" />
      </g>
      <g className="pbot-arm is-right">
        <rect x="13" y="13" width="2" height="1" fill="#2a0810" />
        <rect x="13" y="14" width="2" height="2" fill="#8a1a30" />
        <rect x="13" y="16" width="2" height="1" fill="#d9b27a" />
      </g>
      <g className="pbot-head">
        {cells(head, 0)}
        <rect className="pbot-glow" x="7" y="0" width="2" height="1" fill="#f0d4a6" />
        <g className="pbot-eyes">
          <rect x="5" y="6" width="2" height="2" fill="#f0d4a6" />
          <rect x="9" y="6" width="2" height="2" fill="#f0d4a6" />
        </g>
        <g className="pbot-mouth">
          <rect x="6" y="8" width="1" height="1" fill="#d9b27a" />
          <rect x="9" y="8" width="1" height="1" fill="#d9b27a" />
          <rect x="7" y="9" width="2" height="1" fill="#d9b27a" />
        </g>
      </g>
    </svg>
  );
}

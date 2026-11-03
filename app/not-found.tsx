import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-inner">
        <p className="notfound-code">
          4<span>0</span>4
        </p>
        <h1 className="notfound-title">Node unreachable</h1>
        <p>
          No route at this address. The packet was dropped, not queued.
        </p>
        <Link className="btn btn--primary" href="/">
          Return to base
        </Link>
      </div>
    </div>
  );
}
